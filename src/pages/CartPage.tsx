/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CartPage.tsx - Full cart review page with coupon field (WELCOME10 = 10% off), shipping calculator & summary
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.tsx';
import { siteData } from '../data/siteData.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  Check,
  ShieldCheck,
  ArrowLeft,
  Truck,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    t,
    language,
  } = useStore();

  const [couponInput, setCouponInput] = useState(appliedCoupon || '');
  const [couponFeedback, setCouponFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    if (result.success) {
      setCouponFeedback({ type: 'success', message: result.message });
    } else {
      setCouponFeedback({ type: 'error', message: result.message });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponInput('');
    setCouponFeedback(null);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF6F0] py-16 flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-[#F3E6EA] flex items-center justify-center mb-5">
          <ShoppingBag className="w-10 h-10 text-[#4A1D4F]" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1E1A24] mb-2">
          {language === 'mr' ? 'आपली बॅग रिकामी आहे' : 'Your Shopping Bag is Empty'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md text-center mb-8">
          {language === 'mr'
            ? 'आपण अद्याप कोणतीही साडी निवडलेली नाही. आमचे १८ पारंपरिक मास्टरपीस संग्रह पाहा.'
            : 'You haven’t added any royal drapes to your bag yet. Explore our curated edit of 18 heirloom handloom sarees.'}
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 rounded-full bg-[#4A1D4F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3B153F] transition-all shadow-md"
        >
          {language === 'mr' ? 'साड्यांची खरेदी सुरू करा' : 'Explore Saree Collection'}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#4A1D4F]">Home</Link>
          <span>/</span>
          <span className="text-[#4A1D4F] font-semibold">Shopping Bag</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-[#B8935A]/25 gap-2">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1A24]">
              {language === 'mr' ? 'खरेदी बॅग' : 'Your Shopping Bag'}
            </h1>
            <span className="text-xs text-gray-500">
              {cart.length} unique drape{cart.length > 1 ? 's' : ''} selected
            </span>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-gray-500 hover:text-red-600 transition-colors self-start sm:self-auto underline"
          >
            {language === 'mr' ? 'बॅग रिकामी करा' : 'Clear All Items'}
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-[#F3E6EA] p-4 rounded-xl border border-[#B8935A]/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4A1D4F]">
          <div className="flex items-center gap-2 font-medium">
            <Truck className="w-4 h-4 text-[#B8935A]" />
            {cartSubtotal >= 3000 ? (
              <span>🎉 Congratulations! Your order qualifies for <strong>Complimentary Express Shipping</strong>.</span>
            ) : (
              <span>
                Add ₹{(3000 - cartSubtotal).toLocaleString('en-IN')} more to unlock <strong>Free Express Shipping</strong> (Orders above ₹3,000).
              </span>
            )}
          </div>
          <Link to="/shop" className="text-xs font-semibold text-[#4A1D4F] underline hover:text-[#B8935A]">
            Continue Shopping
          </Link>
        </div>

        {/* 2 Columns: Items list Left, Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items Table / List (7 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#B8935A]/20 shadow-2xs space-y-6">
            <div className="hidden sm:grid grid-cols-12 pb-3 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              <span className="col-span-6">Saree Item</span>
              <span className="col-span-2 text-center">Size</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Subtotal</span>
            </div>

            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center gap-4">
                  
                  {/* Saree Info */}
                  <div className="sm:col-span-6 flex items-center gap-3">
                    <Link
                      to={`/product/${item.productId}`}
                      className="w-16 h-20 rounded-lg overflow-hidden bg-[#FAF6F0] shrink-0 border border-gray-100"
                    >
                      <ImageWithFallback
                        src={item.product.image || item.product.images[0]}
                        alt={t(item.product.name)}
                        style={{ objectPosition: 'top center' }}
                        className="w-full h-full object-cover"
                        fallbackText={t(item.product.name)}
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-serif text-sm font-semibold text-[#1E1A24] hover:text-[#4A1D4F] transition-colors"
                      >
                        {t(item.product.name)}
                      </Link>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        <span>{t(item.product.fabric)}</span>
                        {item.color && <span> · {item.color}</span>}
                      </div>
                      <div className="text-xs font-bold text-[#4A1D4F] mt-1 sm:hidden">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Size */}
                  <div className="sm:col-span-2 text-left sm:text-center">
                    <span className="inline-block px-2.5 py-1 bg-[#FAF6F0] text-[#4A1D4F] rounded-full text-[11px] font-medium border border-[#B8935A]/20">
                      {item.size}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="sm:col-span-2 flex items-center justify-start sm:justify-center">
                    <div className="flex items-center border border-gray-200 rounded-full bg-[#FAF6F0]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-200 text-gray-600 rounded-l-full"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold tabular-nums text-[#1E1A24]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-200 text-gray-600 rounded-r-full"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                    <div className="hidden sm:block text-right">
                      <div className="font-serif text-sm font-bold text-[#4A1D4F] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-gray-400 tabular-nums">
                        ₹{item.product.price.toLocaleString('en-IN')} each
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A1D4F] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Browsing Sarees</span>
              </Link>
            </div>
          </div>

          {/* Right Summary Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coupon Application Box */}
            <div className="bg-white rounded-2xl p-6 border border-[#B8935A]/25 shadow-2xs">
              <h3 className="font-serif text-base font-semibold text-[#1E1A24] mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#B8935A]" />
                <span>Have a Promotional Coupon?</span>
              </h3>

              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-mono text-xs font-bold text-emerald-800">
                        {appliedCoupon}
                      </div>
                      <div className="text-[10px] text-emerald-600">10% Welcome Discount applied</div>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. WELCOME10"
                      className="flex-1 bg-[#FAF6F0] border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono uppercase tracking-wider outline-none focus:border-[#4A1D4F]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#4A1D4F] hover:bg-[#3B153F] text-white text-xs font-semibold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Use coupon code <strong className="text-[#4A1D4F]">WELCOME10</strong> for 10% off.
                  </p>
                  {couponFeedback && (
                    <div
                      className={`text-xs p-2 rounded-lg ${
                        couponFeedback.type === 'success'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {couponFeedback.message}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 border border-[#B8935A]/25 shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#1E1A24] pb-3 border-b border-gray-100">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-gray-800 tabular-nums">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promotional Discount (10%)</span>
                    <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping & Insurance</span>
                  <span className="font-semibold tabular-nums text-gray-800">
                    {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-[#1E1A24]">
                  Grand Total
                </span>
                <span className="font-serif text-2xl font-bold text-[#4A1D4F] tabular-nums">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-6 rounded-full bg-[#4A1D4F] hover:bg-[#3B153F] text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:translate-y-[-1px]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#B8935A]" />
              </button>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted 256-bit Checkout & Transit Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
