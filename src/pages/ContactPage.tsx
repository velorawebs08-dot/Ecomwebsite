/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ContactPage.tsx - Styling Concierge, WhatsApp ordering & direct contact page
 */

import React, { useState } from 'react';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, language } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Bridal & Trousseau',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Bridal & Trousseau',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold">
            {language === 'mr' ? 'ग्राहक साहाय्य' : 'Personal Styling Concierge'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1E1A24] mt-1 mb-3">
            {language === 'mr' ? 'आमच्याशी संपर्क साधा' : 'Connect with Aarunya'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
            Whether you require bridal consultation, custom blouse embroidery advice, or a private video call to examine zari sheen, our concierge team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom & Concierge Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#B8935A]/25 shadow-2xs space-y-6">
              <h2 className="font-serif text-xl font-semibold text-[#4A1D4F]">
                Heritage Showroom & Atelier
              </h2>

              <div className="space-y-4 text-xs text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B8935A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E1A24] mb-0.5">Physical Atelier:</strong>
                    <span>{t(siteData.brand.address)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B8935A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E1A24] mb-0.5">Showroom Timings:</strong>
                    <span>Tuesday – Sunday: 10:30 AM to 8:30 PM (IST)</span>
                    <span className="block text-gray-500 text-[11px]">Private bridal appointments available</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B8935A] shrink-0" />
                  <div>
                    <strong className="text-[#1E1A24]">Telephone: </strong>
                    <span>{siteData.brand.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B8935A] shrink-0" />
                  <div>
                    <strong className="text-[#1E1A24]">Concierge Email: </strong>
                    <span>{siteData.brand.email}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/${siteData.brand.whatsappNumber}?text=Hello%20Aarunya%20Heritage,%20I%20would%20like%20to%20consult%20with%20a%20saree%20stylist`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-[#1E1A24] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#B8935A]/25 shadow-2xs">
            <h2 className="font-serif text-xl font-semibold text-[#1E1A24] mb-2">
              Send a Styling Request
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill out the form below and our lead textile specialist will respond within 4 business hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2 animate-fade-in">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-lg font-semibold text-emerald-800">
                  Message Sent with Grace
                </h3>
                <p className="text-xs text-emerald-700">
                  Thank you! Our styling concierge has received your request and will connect via WhatsApp/email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Deshmukh"
                      className="w-full bg-[#FAF6F0] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A1D4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      WhatsApp / Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9822012345"
                      className="w-full bg-[#FAF6F0] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A1D4F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-[#FAF6F0] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A1D4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#FAF6F0] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#4A1D4F]"
                    >
                      <option value="Bridal & Trousseau">Bridal & Trousseau Curation</option>
                      <option value="Kanjivaram Weave Consultation">Kanjivaram Weave Consultation</option>
                      <option value="Custom Blouse Stitching">Custom Blouse Stitching Inquiry</option>
                      <option value="Order Tracking & Transit">Order Tracking & Transit</option>
                      <option value="Other">Other Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Message / Styling Request <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the occasion, color preferences, or specific weave inquiries..."
                    className="w-full bg-[#FAF6F0] border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-[#4A1D4F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#4A1D4F] hover:bg-[#3B153F] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Send className="w-3.5 h-3.5 text-[#B8935A]" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
