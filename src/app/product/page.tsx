'use client';

import { facebookEvents } from '@/utils/facebookEvents';
import { useEffect } from 'react';

export default function ProductPage() {
  useEffect(() => {
    // تتبع مشاهدة منتج معين
    facebookEvents.viewContent('BioHerb - منتج الجهاز الهضمي');
  }, []);

  const handleAddToCart = () => {
    // تتبع إضافة للسلة
    facebookEvents.addToCart(199, 'EGP');
  };

  const handlePurchase = () => {
    // تتبع شراء
    facebookEvents.purchase(199, 'EGP');
  };

  return (
    <div>
      <button onClick={handleAddToCart}>أضف للسلة</button>
      <button onClick={handlePurchase}>اشتري الآن</button>
    </div>
  );
}