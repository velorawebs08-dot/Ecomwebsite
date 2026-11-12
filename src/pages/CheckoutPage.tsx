/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CheckoutPage.tsx - Two-column checkout with phone/pincode validation, payment selector, and order creation
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useStore, ShippingAddress } from '../context/StoreContext.tsx';
import { siteData } from '../data/siteData.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  Lock,
  ArrowRight,
  AlertCircle,
  Truck,
  ArrowLeft,
  Check,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    buyNowItem,
    appliedCoupon,
    placeOrder,
    t,
    language,
  } = useStore();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isDirectBuy = searchParams.get('buyNow') === 'true' && buyNowItem !== null;

  // Checkout Items: Either buyNowItem or cart
  const checkoutItems = isDirectBuy ? (buyNowItem ? [buyNowItem] : []) : cart;

  // Form State with Maharashtra as default state
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If no items in checkout, redirect back to shop
  useEffect(() => {
    if (checkoutItems.length === 0) {
      navigate('/shop');
    }
  }, [checkoutItems.length, navigate]);

  // Calculations
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 3000 ? 0 : 99;
  const discountAmount =
    appliedCoupon === siteData.specialOffer.code
      ? Math.round(subtotal * (siteData.specialOffer.discountPercent / 100))
      : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Form Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    // 10-digit Indian phone number
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.addressLine.trim() || formData.addressLine.length < 5) {
      newErrors.addressLine = 'Street address / House number is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // 6-digit Indian pincode
    const cleanedPincode = formData.pincode.replace(/\D/g, '');
    if (!cleanedPincode || cleanedPincode.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit postal pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate fast order confirmation with full persistence
    setTimeout(() => {
      const order = placeOrder(
        formData,
        paymentMethod,
        isDirectBuy ? buyNowItem : null
      );
      setIsSubmitting(false);
      navigate(`/order-success?orderId=${order.orderId}`);
    }, 800);
  };

  if (checkoutItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/cart" className="hover:text-[#4A1D4F] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </Link>
          <span>/</span>
          <span className="text-[#4A1D4F] font-semibold">Secure Checkout</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1A24] mb-8 pb-4 border-b border-[#B8935A]/25">
          {language === 'mr' ? 'सुरक्षित चेकआउट' : 'Secure Checkout & Delivery'}
        </h1>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Customer Info, Shipping & Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Contact Details */}
              <div className="bg-white rounded-2xl p-6 border border-[#B8935A]/20 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#4A1D4F] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-serif text-lg font-semibold text-[#1E1A24]">
                    Customer & Contact Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Radhika Deshmukh"
                      className={`w-full bg-[#FAF6F0] border rounded-xl px-3.5 py-2.5 text-xs text-[#1E1A24] outline-none focus:border-[#4A1D4F] ${
                        errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-gray-200'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mobile Number (10 digits) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })
                        }
                        placeholder="9822012345"
                        className={`w-full bg-[#FAF6F0] border rounded-xl pl-12 pr-3.5 py-2.5 text-xs text-[#1E1A24] outline-none focus:border-[#4A1D4F] tabular-nums ${
                          errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full bg-[#FAF6F0] border rounded-xl px-3.5 py-2.5 text-xs text-[#1E1A24] outline-none focus:border-[#4A1D4F] ${
                        errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="bg-white rounded-2xl p-6 border border-[#B8935A]/20 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#4A1D4F] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-serif text-lg font-semibold text-[#1E1A24]">
                    Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Flat / House No. / Building / Street <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.addressLine}
                      onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                      placeholder="e.g. Flat 402, Royal Palms, Prabhat Road"
                      className={`w-full bg-[#FAF6F0] border rounded-xl px-3.5 py-2.5 text-xs text-[#1E1A24] outline-none focus:border-[#4A1D4F] ${
                        errors.addressLine ? 'border-red-500 bg-red-50/30' : 'border-gray-200'
                      }`}
                    />
                    {errors.addressLine && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.addressLine}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Pune"
                      className={`w-full bg-[#FAF6F0] border rounded-xl px-3.5 py-2.5 text-xs text-[#1E1A24] outline-none focus:border-[#4A1D4F] ${
                        errors.city ? 'border-red-500 bg-red-50/30' : 'border-gray-200'
                      }`}
                    />
                    {errors.city && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.city}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Pincode (6 digits) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })
                      }
                      placeholder="411001"
                      className={`w-full bg-[#FAF6F0] border rounded-xl px-3.5 py-2.5 text-xs text-[#1E1A24] outline-none focus:border-[#4A1D4F] tabular-nums ${
                        errors.pincode ? 'border-red-500 bg-red-50/30' : 'border-gray-200'
                      }`}
                    />
                    {errors.pincode && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.pincode}</span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      State
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#FAF6F0] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-[#1E1A24] outline-none focus:border-[#4A1D4F]"
                    >
                      <option value="Maharashtra">Maharashtra (Default)</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Delhi">Delhi / NCR</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-white rounded-2xl p-6 border border-[#B8935A]/20 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#4A1D4F] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-serif text-lg font-semibold text-[#1E1A24]">
                    Payment Method
                  </h2>
                </div>

                {/* 3 Selectable payment tabs */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#4A1D4F] bg-[#4A1D4F]/5 text-[#4A1D4F] font-semibold ring-1 ring-[#4A1D4F]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-[#B8935A]" />
                    <span className="text-xs">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#4A1D4F] bg-[#4A1D4F]/5 text-[#4A1D4F] font-semibold ring-1 ring-[#4A1D4F]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#B8935A]" />
                    <span className="text-xs">Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#4A1D4F] bg-[#4A1D4F]/5 text-[#4A1D4F] font-semibold ring-1 ring-[#4A1D4F]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#B8935A]" />
                    <span className="text-xs">Cash on Delivery</span>
                  </button>
                </div>

                {/* Clean Payment Gateway Placeholder details */}
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-gray-200 text-xs">
                  {paymentMethod === 'UPI' && (
                    <div className="space-y-3">
                      <div className="text-xs text-gray-700 font-medium">
                        Select preferred UPI Application:
                      </div>
                      <div className="flex gap-2">
                        {['gpay', 'phonepe', 'paytm'].map((app) => (
                          <button
                            key={app}
                            type="button"
                            onClick={() => setUpiApp(app as any)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-medium uppercase tracking-wider capitalize ${
                              upiApp === app
                                ? 'bg-[#4A1D4F] text-white border-[#4A1D4F]'
                                : 'bg-white text-gray-700 border-gray-200'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] text-gray-500">
                        A seamless payment request will be initiated securely upon confirming the order.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'Card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="•••• •••• •••• ••••"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                            Valid Thru (MM/YY)
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={3}
                            placeholder="•••"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500">
                        Simulated demo payment gateway environment (No charges deducted).
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'COD' && (
                    <div className="flex items-start gap-2 text-xs text-gray-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p>
                        Pay in cash or UPI QR directly to the courier executive upon safe doorstep delivery.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Place Order (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-2xl p-6 border border-[#B8935A]/25 shadow-2xs space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#1E1A24] pb-3 border-b border-gray-100 flex items-center justify-between">
                  <span>Order Items ({checkoutItems.length})</span>
                  {isDirectBuy && (
                    <span className="text-[11px] bg-[#4A1D4F] text-white px-2 py-0.5 rounded-full font-sans font-medium">
                      Direct Buy Now
                    </span>
                  )}
                </h3>

                {/* Items preview list */}
                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto no-scrollbar">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center gap-3">
                      <div className="w-14 h-16 rounded-lg overflow-hidden bg-[#FAF6F0] shrink-0 border border-gray-100">
                        <ImageWithFallback
                          src={item.product.images[0]}
                          alt={t(item.product.name)}
                          className="w-full h-full object-cover"
                          fallbackText={t(item.product.name)}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-serif text-xs font-semibold text-[#1E1A24] truncate">
                          {t(item.product.name)}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Qty: {item.quantity} · {item.size}
                        </div>
                        <div className="text-xs font-bold text-[#4A1D4F] tabular-nums mt-0.5">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800 tabular-nums">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Coupon Applied (10%)</span>
                      <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Express Insured Shipping</span>
                    <span className="font-semibold tabular-nums text-gray-800">
                      {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shippingFee}`}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold text-[#1E1A24]">
                    Total Payable
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#4A1D4F] tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-[#4A1D4F] hover:bg-[#3B153F] text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:translate-y-[-1px] disabled:opacity-60"
                >
                  <Lock className="w-4 h-4 text-[#B8935A]" />
                  <span>{isSubmitting ? 'Securing Your Order...' : `Place Order (₹${grandTotal.toLocaleString('en-IN')})`}</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Silk Mark Authentic Guarantee & Doorstep Verification</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
