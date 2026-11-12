/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Footer.tsx - Dark charcoal footer with brand blurb, "Authentic Handcrafted Indian Drapes" tagline,
 * payment badges (UPI, Visa, Mastercard, RuPay, COD), and EN / मराठी language toggle in bottom bar.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import {
  ArrowUp,
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Check,
  Send,
  Globe,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language, setLanguage } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#1E1A24] text-[#FAF6F0] pt-16 pb-10 border-t border-[#B8935A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Blurb (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-semibold tracking-wider text-[#FAF6F0]">
                {siteData.brand.name}
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-[#B8935A] font-medium mt-0.5">
                {t(siteData.brand.tagline)}
              </span>
            </Link>

            {/* Moved Subtagline: "Authentic Handcrafted Indian Drapes" */}
            <div className="text-xs text-[#E6D3AE] font-medium tracking-wide">
              {t(siteData.brand.subTagline)}
            </div>

            <p className="text-xs text-[#FAF6F0]/70 font-light leading-relaxed max-w-sm">
              {language === 'mr'
                ? 'आरुण्या हेरिटेज भारताच्या समृद्ध विणकाम परंपरेचे प्रतिनिधित्व करते. वाराणसी, कांचीपुरम आणि येवला येथील कुशल कारागिरांनी विणलेल्या शुद्ध रेशीम व हातमाग साड्यांचा संग्रह.'
                : 'Aarunya Heritage honors India’s timeless textile traditions. Curating pure silk, Kanjivaram, and handloom treasures woven with uncompromised integrity by generational master artisans.'}
            </p>

            {/* Direct Contact info */}
            <div className="space-y-2 text-xs text-[#FAF6F0]/80 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8935A] shrink-0 mt-0.5" />
                <span>{t(siteData.brand.address)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B8935A] shrink-0" />
                <span>{siteData.brand.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B8935A] shrink-0" />
                <span>{siteData.brand.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#B8935A] tracking-wider uppercase">
              {language === 'mr' ? 'महत्वाचे दुवे' : 'Heritage Collections'}
            </h4>
            <ul className="space-y-2 text-xs">
              {siteData.footerLinks.quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.link}
                    className="text-[#FAF6F0]/70 hover:text-[#B8935A] transition-colors"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#B8935A] tracking-wider uppercase">
              {language === 'mr' ? 'ग्राहक सेवा' : 'Customer Care'}
            </h4>
            <ul className="space-y-2 text-xs">
              {siteData.footerLinks.customerCare.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.link}
                    className="text-[#FAF6F0]/70 hover:text-[#B8935A] transition-colors"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Input (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#B8935A] tracking-wider uppercase">
              {language === 'mr' ? 'नव्या आवडीची पत्रपत्रिका' : 'Private Salon Newsletter'}
            </h4>
            <p className="text-xs text-[#FAF6F0]/70 font-light leading-relaxed">
              {language === 'mr'
                ? 'नवीन विणकाम आणि खाजगी प्रदर्शनांची आमंत्रणे सर्वप्रथम मिळवा.'
                : 'Receive exclusive invitations to private loom previews, seasonal drops, and bridal trunk shows.'}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={language === 'mr' ? 'आपला ईमेल टाका' : 'Enter your email address'}
                  required
                  className="w-full bg-white/5 border border-[#B8935A]/30 rounded-full px-4 py-2.5 text-xs text-[#FAF6F0] placeholder-gray-400 outline-none focus:border-[#B8935A] transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#B8935A] hover:bg-[#a68249] text-white flex items-center justify-center transition-transform hover:scale-105"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'धन्यवाद! आपण जोडले गेलात.' : 'Thank you for joining our private salon!'}</span>
                </div>
              )}
            </form>

            {/* Social Icons */}
            <div className="pt-3">
              <span className="text-[11px] text-[#FAF6F0]/50 block mb-2">Connect With Our Weavers:</span>
              <div className="flex items-center gap-3">
                <a
                  href={siteData.brand.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#4A1D4F] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteData.brand.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#4A1D4F] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={siteData.brand.socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#4A1D4F] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
                  aria-label="WhatsApp"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Strip */}
        <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6F0]/70">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400">
              {language === 'mr' ? 'सुरक्षित पेमेंट पद्धती:' : '100% Secure Payment Options:'}
            </span>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] font-semibold">
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[#E6D3AE]">UPI</span>
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-white">VISA</span>
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-white">Mastercard</span>
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[#E6D3AE]">RuPay</span>
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-emerald-400">COD</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-400">
            {language === 'mr'
              ? 'UPI, नेटबँकिंग, कार्ड आणि कॅश ऑन डिलिव्हरीसह १००% सुरक्षित पेमेंट'
              : '100% secure with UPI, NetBanking, Cards and Cash on Delivery'}
          </div>
        </div>

        {/* Bottom Bar with Language Switcher & Back to Top */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#FAF6F0]/50 gap-4">
          <div>
            © {new Date().getFullYear()} {siteData.brand.name}. All Rights Reserved. Crafted for Indian Textiles.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about#terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>

            {/* Language Switcher in Footer (Right side) */}
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/15 text-[#FAF6F0]">
              <Globe className="w-3.5 h-3.5 text-[#E6D3AE]" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  language === 'en' ? 'text-white bg-[#4A1D4F]' : 'text-white/50 hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  language === 'mr' ? 'text-white bg-[#4A1D4F]' : 'text-white/50 hover:text-white'
                }`}
              >
                मराठी
              </button>
            </div>
            
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-[#B8935A] hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>{language === 'mr' ? 'वर जा' : 'Back to Top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
