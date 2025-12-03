"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useTransition, useState, useEffect, useContext } from "react";
import {
  validateAndSubmitOrderToTelegram,
} from "@/ai/flows/validate-and-submit-order-to-telegram";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, MapPin, User, Send, ShoppingBag, CreditCard, Wallet, Banknote, ShieldCheck, Upload, Camera, LocateIcon, StickyNote } from "lucide-react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};


export function OrderForm() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].orderForm;
  
  const OrderSchema = z.object({
    name: z.string().min(2, { message: t.validation.name }),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, { message: t.validation.phone }),
    address: z.string().min(10, { message: t.validation.address }),
    notes: z.string().optional(),
    quantity: z.enum(["1", "3", "6", "special"], { required_error: t.validation.quantity }),
    paymentMethod: z.enum(["cash", "vodafone", "instapay"], { required_error: t.validation.paymentMethod }),
    screenshot: z.any().optional(),
    latitude: z.number({ required_error: t.validation.location }),
    longitude: z.number({ required_error: t.validation.location }),
  }).refine(data => {
      if (data.paymentMethod !== 'cash' && !data.screenshot) {
        return false;
      }
      return true;
    }, {
      message: t.validation.screenshot,
      path: ["screenshot"],
    });

  type OrderInput = z.infer<typeof OrderSchema>;
  
  const pricing = {
    "1": { price: 480, discount: 0, description: t.quantityOptions.one.label },
    "3": { price: 1440, discount: 0.15, description: t.quantityOptions.three.label },
    "6": { price: 2880, discount: 0.25, description: t.quantityOptions.six.label },
    "special": { price: 960, discount: 0, description: t.quantityOptions.special.label },
  };

  const [isPending, startTransition] = useTransition();
  const [totalPrice, setTotalPrice] = useState(pricing["1"].price);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  const form = useForm<OrderInput>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      notes: "",
      quantity: "1",
      paymentMethod: "cash",
    },
  });

  const quantity = form.watch("quantity");
  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    const selectedTier = pricing[quantity as keyof typeof pricing];
    if (selectedTier) {
      let finalPrice = selectedTier.price * (1 - selectedTier.discount);
      if (paymentMethod === 'vodafone' || paymentMethod === 'instapay') {
        finalPrice *= 0.88; // Apply 12% discount
      }
      setTotalPrice(finalPrice);
    }
  }, [quantity, paymentMethod, pricing]);
  
  const handleLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude);
          form.setValue("longitude", position.coords.longitude);
          setIsGettingLocation(false);
          toast({
            title: t.location.success.title,
            description: t.location.success.description,
            variant: "default",
            className: "bg-blue-100 border-blue-400 text-blue-800",
          });
        },
        (error) => {
          setIsGettingLocation(false);
          toast({
            title: t.location.error.title,
            description: t.location.error.description,
            variant: "destructive",
          });
          console.error("Geolocation error:", error);
        }
      );
    } else {
       toast({
          title: t.location.unsupported.title,
          description: t.location.unsupported.description,
          variant: "destructive",
       });
    }
  };


  const onSubmit = (values: OrderInput) => {
    startTransition(async () => {
      try {
        let screenshotDataUrl: string | undefined = undefined;
        if (values.screenshot && values.screenshot.length > 0) {
            screenshotDataUrl = await readFileAsDataURL(values.screenshot[0]);
        }
      
        const orderDescription = pricing[values.quantity as keyof typeof pricing].description;
        const paymentMethodText = t.payment.methods[values.paymentMethod as keyof typeof t.payment.methods]
        
        const orderDetails = {
          name: values.name,
          phone: values.phone,
          address: values.address,
          notes: values.notes,
          quantity: `${orderDescription}`,
          totalPrice: totalPrice,
          currency: t.currency,
          paymentMethod: paymentMethodText,
          screenshot: screenshotDataUrl,
          latitude: values.latitude,
          longitude: values.longitude,
        };
        
        const result = await validateAndSubmitOrderToTelegram(orderDetails);
        if (result.success) {
          toast({
            title: t.toast.success.title,
            description: `${t.toast.success.description} ${totalPrice.toFixed(2)} ${t.currency}. ${t.toast.success.confirmation}`,
            variant: "default",
            className: "bg-green-100 border-green-400 text-green-800",
          });
          form.reset();
          setScreenshotPreview(null);
        } else {
          toast({
            title: t.toast.error.title,
            description: result.message || t.toast.error.description,
            variant: "destructive",
          });
        }
      } catch(error) {
         toast({
          title: t.toast.technicalError.title,
          description: t.toast.technicalError.description,
          variant: "destructive",
        });
        console.error(error);
      }
    });
  };

  return (
    <section id="order" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
         <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
            {t.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {t.subtitle}
          </p>
        </div>
        <Card className="w-full max-w-lg mx-auto shadow-2xl rounded-2xl border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-center text-primary">{t.formTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-lg"><ShoppingBag className="w-5 h-5"/>{t.labels.quantity}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 text-lg bg-background/50">
                            <SelectValue placeholder={t.placeholders.quantity} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">{t.quantityOptions.one.label} - {t.quantityOptions.one.discount}</SelectItem>
                          <SelectItem value="3">{t.quantityOptions.three.label} - {t.quantityOptions.three.discount}</SelectItem>
                          <SelectItem value="6">{t.quantityOptions.six.label} - {t.quantityOptions.six.discount}</SelectItem>
                          <SelectItem value="special">{t.quantityOptions.special.label}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="text-center text-2xl font-bold text-primary bg-secondary p-3 rounded-lg">
                  <span>{t.totalPrice}: </span>
                  <span>{totalPrice.toFixed(2)}</span>
                  <span> {t.currency}</span>
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-lg"><User className="w-5 h-5"/>{t.labels.name}</FormLabel>
                      <FormControl>
                        <Input className="h-14 text-lg bg-background/50" placeholder={t.placeholders.name} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-lg"><Phone className="w-5 h-5"/>{t.labels.phone}</FormLabel>
                      <FormControl>
                        <Input className="h-14 text-lg bg-background/50" placeholder={t.placeholders.phone} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                       <div className="flex justify-between items-center">
                        <FormLabel className="flex items-center gap-2 text-lg">
                            <MapPin className="w-5 h-5" />
                            {t.labels.address}
                        </FormLabel>
                        </div>
                      <FormControl>
                        <Textarea
                          className="text-lg min-h-[120px] bg-background/50"
                          placeholder={t.placeholders.address}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel className="flex items-center gap-2 text-lg">
                            <StickyNote className="w-5 h-5" />
                            {t.labels.notes}
                        </FormLabel>
                      <FormControl>
                        <Textarea
                          className="text-lg min-h-[100px] bg-background/50"
                          placeholder={t.placeholders.notes}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                        <Button type="button" variant="outline" size="sm" onClick={handleLocation} disabled={isGettingLocation} className="w-full">
                            <LocateIcon className="w-4 h-4 ml-2" />
                            {isGettingLocation ? t.location.loading : t.location.button}
                        </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Card className="bg-secondary/50 p-4">
                  <CardHeader className="p-2">
                    <CardTitle className="text-xl font-headline text-center text-primary">{t.payment.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.setValue("screenshot", null);
                                setScreenshotPreview(null);
                              }}
                              defaultValue={field.value}
                              className="grid grid-cols-1 gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 p-3 bg-background rounded-md">
                                <FormControl>
                                  <RadioGroupItem value="cash" />
                                </FormControl>
                                <FormLabel className="font-normal flex items-center gap-2">
                                  <Banknote className="w-5 h-5 text-primary" />
                                  {t.payment.methods.cash}
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 p-3 bg-background rounded-md">
                                <FormControl>
                                  <RadioGroupItem value="vodafone" />
                                </FormControl>
                                <FormLabel className="font-normal flex items-center gap-2">
                                   <Wallet className="w-5 h-5 text-primary" />
                                   {t.payment.methods.vodafone} <span className="text-red-500 font-bold">{t.payment.discount}</span>
                                </FormLabel>
                              </FormItem>
                               <FormItem className="flex items-center space-x-3 space-y-0 p-3 bg-background rounded-md">
                                <FormControl>
                                  <RadioGroupItem value="instapay" />
                                </FormControl>
                                <FormLabel className="font-normal flex items-center gap-2">
                                   <CreditCard className="w-5 h-5 text-primary" />
                                   {t.payment.methods.instapay} <span className="text-red-500 font-bold">{t.payment.discount}</span>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     {paymentMethod !== "cash" && (
                        <div className="mt-4 space-y-4 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                           {paymentMethod === "vodafone" && (
                             <CardDescription className="text-center font-bold text-lg">
                                {t.payment.instructions.vodafone} <br/><span className="font-mono text-red-600">01040757693</span>
                             </CardDescription>
                           )}
                           {paymentMethod === "instapay" && (
                              <CardDescription className="text-center font-bold text-lg">
                                {t.payment.instructions.instapay} <br/><span className="font-mono text-red-600">@abo202567</span>
                              </CardDescription>
                           )}
                           <CardDescription className="text-center">
                              {t.payment.instructions.screenshot}
                           </CardDescription>

                          <FormField
                            control={form.control}
                            name="screenshot"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2 text-lg"><Camera className="w-5 h-5"/>{t.labels.screenshot}</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="file" 
                                    className="h-12 bg-background file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        field.onChange({ target: { value: [file] } });
                                        const previewUrl = URL.createObjectURL(file);
                                        setScreenshotPreview(previewUrl);
                                      } else {
                                        field.onChange({ target: { value: null } });
                                        setScreenshotPreview(null);
                                      }
                                    }}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    name={field.name}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {screenshotPreview && <img src={screenshotPreview} alt="Screenshot preview" className="mt-2 max-h-48 w-auto mx-auto rounded-md border" />}
                           <p className="text-xs text-muted-foreground p-2 rounded-md">{t.payment.confirmationNote}</p>
                        </div>
                      )}
                    <p className="text-xs text-muted-foreground mt-4 text-center flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      {t.payment.secure}
                    </p>
                  </CardContent>
                </Card>
                <Button type="submit" className="w-full bg-green-700 text-primary-foreground hover:bg-green-800 rounded-full shadow-lg h-16 text-xl font-bold transition-transform duration-300 hover:scale-105" disabled={isPending}>
                  {isPending ? t.submit.pending : t.submit.default}
                  <Send className="mr-2 h-5 w-5"/>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
