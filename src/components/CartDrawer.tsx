/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CartDrawer.tsx - Slide-in cart drawer with quantity stepper, subtotal, and checkout buttons
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.tsx';
import { ImageWithFallback } from './ImageWithFallback.tsx';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    t,
    language,
  } = useStore();

  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const freeShippingThreshold = 3000;
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#B8935A]/25 bg-white/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4A1D4F]" />
              <h2 className="font-serif text-xl font-semibold text-[#1E1A24]">
                {language === 'mr' ? 'आपली खरेदी बॅग' : 'Your Shopping Bag'}
              </h2>
              <span className="text-xs bg-[#4A1D4F] text-white px-2 py-0.5 rounded-full font-medium">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-gray-400 hover:text-[#4A1D4F] hover:bg-[#F3E6EA] rounded-full transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F3E6EA]/60 px-5 py-3 border-b border-[#B8935A]/15 text-xs text-[#1E1A24]">
            <div className="flex items-center justify-between font-medium mb-1.5">
              <span className="flex items-center gap-1.5 text-[#4A1D4F]">
                <Truck className="w-3.5 h-3.5 text-[#B8935A]" />
                {amountNeeded === 0
                  ? (language === 'mr' ? 'अभिनंदन! आपल्याला मोफत एक्सप्रेस डिलिव्हरी मिळाली आहे' : '🎉 You have qualified for Free Express Delivery!')
                  : (language === 'mr'
                      ? `मोफत डिलिव्हरीसाठी आणखी ₹${amountNeeded.toLocaleString('en-IN')} ची खरेदी करा`
                      : `Add ₹${amountNeeded.toLocaleString('en-IN')} more for Free Express Delivery`)}
              </span>
              <span className="font-semibold text-[#4A1D4F]">{shippingProgress}%</span>
            </div>
            <div className="w-full bg-white/80 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4A1D4F] h-full transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F3E6EA] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#4A1D4F]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1E1A24] mb-1">
                  {language === 'mr' ? 'आपली बॅग रिकामी आहे' : 'Your Bag is Empty'}
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  {language === 'mr'
                    ? 'आमचे शुद्ध रेशीम आणि हातमाग संग्रह पाहा आणि आपली आवडती साडी निवडा.'
                    : 'Explore our heirloom handloom and pure silk collections to find your perfect drape.'}
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#4A1D4F] text-white text-xs font-medium hover:bg-[#3B153F] transition-all shadow-sm"
                >
                  {language === 'mr' ? 'साड्यांची खरेदी सुरू करा' : 'Explore Sarees'}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white p-3 rounded-xl border border-[#B8935A]/15 shadow-2xs hover:border-[#B8935A]/40 transition-colors"
                >
                  <Link
                    to={`/product/${item.productId}`}
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-[#FAF6F0]"
                  >
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={t(item.product.name)}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          to={`/product/${item.productId}`}
                          onClick={() => setIsDrawerOpen(false)}
                          className="font-serif text-sm font-semibold text-[#1E1A24] hover:text-[#4A1D4F] line-clamp-1"
                        >
                          {t(item.product.name)}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-gray-500 mt-0.5 space-x-2">
                        <span>{item.size}</span>
                        {item.color && <span>· {item.color}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-[#FAF6F0]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 hover:bg-gray-200 text-gray-600 text-xs transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#1E1A24] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 hover:bg-gray-200 text-gray-600 text-xs transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#4A1D4F] tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        {item.product.mrp > item.product.price && (
                          <div className="text-[10px] text-gray-400 line-through tabular-nums">
                            ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#B8935A]/25 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#1E1A24]">
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'mr' ? 'उपएकूण' : 'Subtotal'}</span>
                  <span className="font-semibold tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'mr' ? 'डिलिव्हरी' : 'Shipping'}</span>
                  <span className="font-semibold text-emerald-700">
                    {shippingFee === 0 ? (language === 'mr' ? 'मोफत' : 'FREE') : `₹${shippingFee}`}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="font-serif text-base font-bold text-[#1E1A24]">
                  {language === 'mr' ? 'एकूण रक्कम' : 'Estimated Total'}
                </span>
                <span className="font-serif text-lg font-bold text-[#4A1D4F] tabular-nums">
                  ₹{(cartSubtotal + shippingFee).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleViewCart}
                  className="py-2.5 px-3 rounded-full border border-[#4A1D4F] text-[#4A1D4F] text-xs font-medium hover:bg-[#F3E6EA] transition-colors text-center"
                >
                  {language === 'mr' ? 'बॅग पाहा' : 'View Bag'}
                </button>
                <button
                  onClick={handleCheckout}
                  className="py-2.5 px-3 rounded-full bg-[#4A1D4F] text-white text-xs font-medium hover:bg-[#3B153F] transition-all flex items-center justify-center gap-1.5 shadow-sm text-center"
                >
                  <span>{language === 'mr' ? 'चेकआउट करा' : 'Checkout'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'mr' ? 'सुरक्षित एनक्रिप्टेड पेमेंट' : '100% Secure & Insured Checkout'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
