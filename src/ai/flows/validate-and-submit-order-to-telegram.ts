'use server';
/**
 * @fileOverview Validates order form data and submits it to a Telegram bot via API.
 *
 * - validateAndSubmitOrderToTelegram - A function that validates order data and submits it to Telegram.
 * - OrderInput - The input type for the validateAndSubmitOrderToTelegram function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OrderInputSchema = z.object({
  name: z.string().describe('The name of the customer placing the order.'),
  phone: z
    .string()
    .describe('The phone number of the customer.'),
  address: z.string().describe('The shipping address of the customer.'),
  notes: z.string().optional().describe('Special notes or instructions for the order.'),
  quantity: z.string().describe('The number of packages ordered.'),
  totalPrice: z.number().describe('The total price of the order.'),
  currency: z.string().describe('The currency of the order.'),
  paymentMethod: z.string().describe('The payment method chosen by the customer.'),
  screenshot: z.string().optional().describe('A data URI of the payment screenshot, if provided.'),
  latitude: z.number().optional().describe("Customer's latitude."),
  longitude: z.number().optional().describe("Customer's longitude."),
});

export type OrderInput = z.infer<typeof OrderInputSchema>;

const SubmitOrderResultSchema = z.object({
  success: z.boolean().describe('Indicates whether the order submission was successful.'),
  message: z.string().describe('A message providing feedback on the submission status.'),
});

export type SubmitOrderResult = z.infer<typeof SubmitOrderResultSchema>;

export async function validateAndSubmitOrderToTelegram(
  input: OrderInput
): Promise<SubmitOrderResult> {
  return validateAndSubmitOrderToTelegramFlow(input);
}

const submitOrder = ai.defineTool(
  {
    name: 'submitOrder',
    description: 'Submits the order data to a Telegram bot using the Telegram Bot API.',
    inputSchema: OrderInputSchema,
    outputSchema: SubmitOrderResultSchema,
  },
  async input => {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
      console.error(
        'Telegram bot token or chat ID not found in environment variables.'
      );
      return {
        success: false,
        message: 'Missing Telegram bot token or chat ID.',
      };
    }

    let locationLink = '';
    if (input.latitude && input.longitude) {
        locationLink = `https://www.google.com/maps/search/?api=1&query=${input.latitude},${input.longitude}`;
    }

    const messageText = [
      `📦 *طلب جديد*`,
      `👤 *الاسم:* ${input.name}`,
      `📞 *الهاتف:* ${input.phone}`,
      `📍 *العنوان:* ${input.address}`,
      `📝 *ملاحظات:* ${input.notes || 'لا يوجد'}`,
      `🗺️ *الموقع:* ${locationLink || 'لم يتم تحديده'}`,
      `🛍️ *الكمية:* ${input.quantity}`,
      `💰 *السعر الإجمالي:* ${input.totalPrice.toFixed(2)} ${input.currency}`,
      `💳 *طريقة الدفع:* ${input.paymentMethod}`,
    ].join('\n');

    try {
      // Send the text message first
      const sendMessageUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const textResponse = await fetch(sendMessageUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: messageText, parse_mode: 'Markdown' }),
      });

      if (!textResponse.ok) {
        throw new Error(`Failed to send text message: ${textResponse.statusText}`);
      }
      
      const textData = await textResponse.json();
      if (!textData.ok) {
        throw new Error(`Telegram API error for text: ${JSON.stringify(textData)}`);
      }

      // If a screenshot is provided, send it as a photo
      if (input.screenshot) {
        const sendPhotoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
        // The fetch API in Node.js doesn't support multipart/form-data with data URIs directly.
        // We need to convert the data URI to a Buffer.
        const base64Data = input.screenshot.split(',')[1];
        const mimeType = input.screenshot.match(/data:(.*);base64,/)?.[1] || 'image/jpeg';
        const buffer = Buffer.from(base64Data, 'base64');
        
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);
        formData.append('photo', new Blob([buffer], { type: mimeType }), 'screenshot.jpg');
        formData.append('caption', '📄 *لقطة شاشة تأكيد الدفع*');
        formData.append('parse_mode', 'Markdown');


        const photoResponse = await fetch(sendPhotoUrl, {
          method: 'POST',
          body: formData,
        });

        if (!photoResponse.ok) {
          throw new Error(`Failed to send photo: ${photoResponse.statusText}`);
        }
         const photoData = await photoResponse.json();
        if (!photoData.ok) {
          throw new Error(`Telegram API error for photo: ${JSON.stringify(photoData)}`);
        }
      }

      return {
        success: true,
        message: 'Order successfully submitted to Telegram!',
      };
    } catch (error: any) {
      console.error('Error submitting order to Telegram:', error);
      return {
        success: false,
        message: `Error submitting order to Telegram: ${error.message}.`,
      };
    }
  }
);

const validateAndSubmitOrderToTelegramFlow = ai.defineFlow(
  {
    name: 'validateAndSubmitOrderToTelegramFlow',
    inputSchema: OrderInputSchema,
    outputSchema: SubmitOrderResultSchema,
  },
  async input => {
    return await submitOrder(input);
  }
);
