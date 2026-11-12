/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * StoreContext.tsx - Global state for Cart, Wishlist, Orders, Drawer, and Language
 * Synced with localStorage for persistent sessions.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductItem, siteData, t as translateHelper, LocalizedString } from '../data/siteData.ts';

export interface CartItem {
  id: string; // unique cart item id: `${productId}-${size}-${color}`
  productId: string;
  product: ProductItem;
  size: string;
  color: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
  estimatedDelivery: string;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  discountAmount: number;
  appliedCoupon: string | null;
  cartTotal: number;
  addToCart: (product: ProductItem, size: string, color?: string, quantity?: number, openDrawer?: boolean) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Drawer
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;

  // Buy Now (Direct single purchase)
  buyNowItem: CartItem | null;
  setBuyNowItem: (item: CartItem | null) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: OrderRecord[];
  placeOrder: (
    address: ShippingAddress,
    paymentMethod: 'UPI' | 'Card' | 'COD',
    directItem?: CartItem | null
  ) => OrderRecord;
  getOrderById: (orderId: string) => OrderRecord | undefined;

  // Search & Global state
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Language
  language: 'en' | 'mr';
  setLanguage: (lang: 'en' | 'mr') => void;
  t: (str: LocalizedString | string | undefined) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'aarunya_cart_v1';
const WISHLIST_STORAGE_KEY = 'aarunya_wishlist_v1';
const ORDERS_STORAGE_KEY = 'aarunya_orders_v1';
const LANG_STORAGE_KEY = 'aarunya_lang_v1';
const COUPON_STORAGE_KEY = 'aarunya_coupon_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [language, setLanguageState] = useState<'en' | 'mr'>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      return (saved === 'mr' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch (e) {
      console.error('Failed to save language', e);
    }
  }, [language]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save coupon', e);
    }
  }, [appliedCoupon]);

  const setLanguage = (lang: 'en' | 'mr') => {
    setLanguageState(lang);
  };

  const t = (str: LocalizedString | string | undefined) => {
    return translateHelper(str, language);
  };

  // Cart operations
  const addToCart = (
    product: ProductItem,
    size: string,
    color?: string,
    quantity: number = 1,
    openDrawer: boolean = true
  ) => {
    const selectedColor = color || (product.colors[0]?.name ?? 'Standard');
    const cartItemId = `${product.id}-${size}-${selectedColor}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            size,
            color: selectedColor,
            quantity,
          },
        ];
      }
    });

    if (openDrawer) {
      setIsDrawerOpen(true);
    }
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupon
  const applyCoupon = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === siteData.specialOffer.code) {
      setAppliedCoupon(cleaned);
      return {
        success: true,
        message: language === 'mr' ? 'कूपन यशस्वीरीत्या लागू केले! १०% सूट' : 'Coupon WELCOME10 applied! 10% discount added.',
      };
    }
    return {
      success: false,
      message: language === 'mr' ? 'अवैध कूपन कोड. कृपया WELCOME10 वापरा' : 'Invalid coupon code. Try using WELCOME10 for 10% off.',
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Free shipping above ₹3,000, otherwise ₹99
  const shippingFee = cartSubtotal >= 3000 || cartSubtotal === 0 ? 0 : 99;

  // Discount
  const discountAmount = appliedCoupon === siteData.specialOffer.code
    ? Math.round(cartSubtotal * (siteData.specialOffer.discountPercent / 100))
    : 0;

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Place Order
  const placeOrder = (
    address: ShippingAddress,
    paymentMethod: 'UPI' | 'Card' | 'COD',
    directItem?: CartItem | null
  ): OrderRecord => {
    const orderItems = directItem ? [directItem] : [...cart];
    const orderSubtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const orderShipping = orderSubtotal >= 3000 ? 0 : 99;
    const orderDiscount = appliedCoupon === siteData.specialOffer.code
      ? Math.round(orderSubtotal * 0.1)
      : 0;
    const finalTotal = Math.max(0, orderSubtotal - orderDiscount + orderShipping);

    // Compute estimated delivery date (3-5 business days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const estimatedDeliveryStr = deliveryDate.toLocaleDateString('en-IN', options);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: OrderRecord = {
      orderId: `AH-${new Date().getFullYear()}-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      items: orderItems,
      shippingAddress: address,
      paymentMethod,
      subtotal: orderSubtotal,
      discount: orderDiscount,
      shipping: orderShipping,
      total: finalTotal,
      couponCode: appliedCoupon || undefined,
      estimatedDelivery: estimatedDeliveryStr,
      status: 'Confirmed',
    };

    setOrders((prev) => [newOrder, ...prev]);

    // If order was from regular cart, clear cart
    if (!directItem) {
      clearCart();
    } else {
      setBuyNowItem(null);
    }

    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.orderId === orderId);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        shippingFee,
        discountAmount,
        appliedCoupon,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        isDrawerOpen,
        setIsDrawerOpen,
        buyNowItem,
        setBuyNowItem,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        getOrderById,
        searchQuery,
        setSearchQuery,
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
