/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * OrderSuccessPage.tsx - Celebration screen with animated check, confetti, generated Order ID & receipt summary
 */

import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.tsx';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Truck,
  Calendar,
  MapPin,
  ShoppingBag,
  ArrowRight,
  Printer,
  Sparkles,
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { getOrderById, orders, t, language } = useStore();

  const order = (orderId ? getOrderById(orderId) : orders[0]) || orders[0];

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A1D4F', '#B8935A', '#F3E6EA', '#EAA221'],
      });
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-[70vh] bg-[#FAF6F0] py-16 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#1E1A24] mb-2">No Order Found</h2>
        <p className="text-xs text-gray-500 mb-6">
          You don't have any recent order on record in this session.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-full bg-[#4A1D4F] text-white text-xs font-semibold"
        >
          Explore Sarees
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B8935A]/30 shadow-lg text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B8935A] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Successfully Placed</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1A24] mb-2">
            Thank You, {order.shippingAddress.fullName}!
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 font-light max-w-md mx-auto mb-6">
            We have received your royal order. Our master artisans are carefully preparing your saree with protective muslin packing and Silk Mark certification.
          </p>

          {/* Generated Order ID Banner */}
          <div className="inline-flex items-center gap-3 bg-[#FAF6F0] border border-[#B8935A]/40 px-5 py-2.5 rounded-full text-xs font-mono mb-8">
            <span className="text-gray-500 uppercase font-sans text-[11px]">Order Reference:</span>
            <strong className="text-[#4A1D4F] text-sm tracking-wider">{order.orderId}</strong>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F3E6EA]/40 border border-[#B8935A]/20 text-left text-xs mb-8">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#4A1D4F] shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-semibold">
                  Estimated Delivery
                </span>
                <strong className="text-[#1E1A24]">{order.estimatedDelivery}</strong>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#4A1D4F] shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-semibold">
                  Payment Mode
                </span>
                <strong className="text-[#1E1A24]">
                  {order.paymentMethod === 'COD' ? 'Cash on Delivery' : `${order.paymentMethod} (Verified)`}
                </strong>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#4A1D4F] shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-semibold">
                  Destination
                </span>
                <strong className="text-[#1E1A24] truncate block max-w-[140px]">
                  {order.shippingAddress.city}, {order.shippingAddress.pincode}
                </strong>
              </div>
            </div>
          </div>

          {/* Itemized Order Summary */}
          <div className="text-left border-t border-gray-100 pt-6">
            <h3 className="font-serif text-base font-semibold text-[#1E1A24] mb-3">
              Items in This Shipment ({order.items.length})
            </h3>

            <div className="divide-y divide-gray-100 mb-6">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#FAF6F0] shrink-0 border border-gray-100">
                      <ImageWithFallback
                        src={item.product.image || item.product.images[0]}
                        alt={t(item.product.name)}
                        style={{ objectPosition: 'top center' }}
                        className="w-full h-full object-cover"
                        fallbackText={t(item.product.name)}
                      />
                    </div>
                    <div>
                      <div className="font-serif font-semibold text-sm text-[#1E1A24]">
                        {t(item.product.name)}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Size: {item.size} {item.color ? `· ${item.color}` : ''} · Qty: {item.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="font-serif font-bold text-sm text-[#4A1D4F] tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Breakdown */}
            <div className="bg-[#FAF6F0] p-4 rounded-xl space-y-1.5 text-xs text-gray-600 mb-6 border border-[#B8935A]/15">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-800 tabular-nums">
                  ₹{order.subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount Applied ({order.couponCode || 'Promo'})</span>
                  <span className="tabular-nums">-₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Insurance</span>
                <span className="font-semibold text-gray-800 tabular-nums">
                  {order.shipping === 0 ? <span className="text-emerald-700">FREE</span> : `₹${order.shipping}`}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline font-bold text-sm text-[#1E1A24]">
                <span>Grand Total Paid / Payable</span>
                <span className="font-serif text-lg text-[#4A1D4F] tabular-nums">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Delivery Address Details */}
            <div className="text-xs text-gray-600 mb-8 p-3 border border-gray-100 rounded-xl">
              <span className="font-semibold text-gray-800 block mb-0.5">Shipping to:</span>
              <p>
                {order.shippingAddress.fullName} · {order.shippingAddress.phone}
              </p>
              <p>{order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#4A1D4F] hover:bg-[#3B153F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
