import React, { createContext, useContext, useState, useCallback } from 'react';

export interface BasketItem {
  id: string;
  packageName: string;
  price: number;
  quantity: number;
}

interface BasketContextType {
  items: BasketItem[];
  addItem: (packageName: string, price: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
  promoCode: string | null;
  promoDiscount: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  subtotal: number;
  couplesDiscount: number;
  totalDiscount: number;
  total: number;
  itemCount: number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

// Valid promo codes (in production, validate server-side)
const PROMO_CODES: Record<string, number> = {
  'WELCOME10': 0.15,
  'STUDY20': 0.15,
  'EARLY15': 0.15,
};

const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace('£', '').replace(',', ''));
};

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  const addItem = useCallback((packageName: string, price: number) => {
    setItems(prev => {
      // Check if user already has a different package
      const existingPackageTypes = new Set(prev.map(item => item.packageName));
      
      if (existingPackageTypes.size > 0 && !existingPackageTypes.has(packageName)) {
        // Can't add different package type - user must stick to one
        return prev;
      }

      const existingItem = prev.find(item => item.packageName === packageName);
      if (existingItem) {
        return prev.map(item =>
          item.packageName === packageName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: `${packageName}-${Date.now()}`,
        packageName,
        price,
        quantity: 1,
      }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  }, [removeItem]);

  const clearBasket = useCallback(() => {
    setItems([]);
    setPromoCode(null);
    setPromoDiscount(0);
  }, []);

  const applyPromoCode = useCallback((code: string): boolean => {
    const upperCode = code.toUpperCase();
    if (PROMO_CODES[upperCode]) {
      setPromoCode(upperCode);
      setPromoDiscount(PROMO_CODES[upperCode]);
      return true;
    }
    return false;
  }, []);

  const removePromoCode = useCallback(() => {
    setPromoCode(null);
    setPromoDiscount(0);
  }, []);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Couples discount: only the 2nd item gets discount (10% for Enhanced, 15% for Premium)
  const enhancedItems = items.filter(item => item.packageName === 'Enhanced');
  const premiumItems = items.filter(item => item.packageName === 'Premium');
  
  const enhancedQty = enhancedItems.reduce((sum, item) => sum + item.quantity, 0);
  const premiumQty = premiumItems.reduce((sum, item) => sum + item.quantity, 0);
  
  let couplesDiscount = 0;
  
  // Enhanced: 10% off on 2nd item only
  if (enhancedQty >= 2) {
    const enhancedPrice = enhancedItems[0]?.price || 0;
    couplesDiscount += enhancedPrice * 0.10;
  }
  
  // Premium: 15% off on 2nd item only
  if (premiumQty >= 2) {
    const premiumPrice = premiumItems[0]?.price || 0;
    couplesDiscount += premiumPrice * 0.15;
  }

  const afterCouplesDiscount = subtotal - couplesDiscount;
  const promoAmount = afterCouplesDiscount * promoDiscount;
  const totalDiscount = couplesDiscount + promoAmount;
  const total = subtotal - totalDiscount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BasketContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearBasket,
      promoCode,
      promoDiscount,
      applyPromoCode,
      removePromoCode,
      subtotal,
      couplesDiscount,
      totalDiscount,
      total,
      itemCount,
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};
