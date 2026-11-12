/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AboutPage.tsx - Brand story, weaver guild craftsmanship, Silk Mark certification & policies
 */

import React from 'react';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Award, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t, language } = useStore();

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'आमचा वारसा' : 'Our Living Heritage'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1E1A24] mb-4">
            {siteData.brand.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            {t(siteData.brand.tagline)}. Founded with an unwavering commitment to reviving and celebrating generational Indian handloom textiles.
          </p>
        </div>

        {/* Story Section with Visual Banner */}
        <div className="rounded-3xl overflow-hidden border border-[#B8935A]/30 shadow-md bg-white grid grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[320px] md:min-h-full">
            <ImageWithFallback
              src="/src/assets/images/banner_handloom_1794416792885.jpg"
              alt="Artisan loom showcase"
              className="w-full h-full object-cover"
              fallbackText="Aarunya Looms"
            />
          </div>
          <div className="p-8 sm:p-12 flex flex-col justify-center space-y-4 text-xs sm:text-sm text-[#1E1A24]/85 leading-relaxed">
            <h2 className="font-serif text-2xl font-semibold text-[#4A1D4F]">
              Direct from Master Weaver Guilds
            </h2>
            <p>
              Every saree in the Aarunya collection originates in historic weaving centers—from Varanasi’s banks to Kanchipuram’s temple sanctums and Yeola’s royal looms in Maharashtra.
            </p>
            <p>
              We bypass synthetic mass factories and middlemen, partnering directly with multigenerational weaving families to ensure fair wages and unadulterated pure silk yarns.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4A1D4F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3B153F] transition-all shadow-sm"
              >
                Explore The Weaves
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Authenticity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#B8935A]/20 shadow-2xs space-y-2">
            <Award className="w-6 h-6 text-[#4A1D4F]" />
            <h3 className="font-serif text-base font-semibold text-[#1E1A24]">
              Silk Mark Certified
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every silk saree comes stamped with the official Silk Mark tag guaranteeing 100% natural, unadulterated mulberry or tussar silk.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#B8935A]/20 shadow-2xs space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#4A1D4F]" />
            <h3 className="font-serif text-base font-semibold text-[#1E1A24]">
              Genuine Zari Testing
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We certify the composition of pure silver-gilt and antique gold zari threads woven into our ceremonial Banarasi and Kanjivaram heirlooms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#B8935A]/20 shadow-2xs space-y-2">
            <Heart className="w-6 h-6 text-[#4A1D4F]" />
            <h3 className="font-serif text-base font-semibold text-[#1E1A24]">
              Generational Artisan Care
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              A portion of every purchase directly funds handloom weaver cluster welfare programs and loom equipment modernization.
            </p>
          </div>
        </div>

        {/* Customer Care Policies (Anchor Targets for Footer Links) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#B8935A]/25 space-y-8 text-xs text-gray-700 leading-relaxed">
          <div id="shipping" className="space-y-2">
            <h3 className="font-serif text-lg font-semibold text-[#4A1D4F] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#B8935A]" />
              <span>Complimentary Shipping & Doorstep Delivery</span>
            </h3>
            <p>
              We provide complimentary express shipping on all orders exceeding ₹3,000 across all serviceable postal pincodes in India. Standard delivery takes 3 to 5 business days with insured express transit.
            </p>
          </div>

          <div id="returns" className="space-y-2 pt-4 border-t border-gray-100">
            <h3 className="font-serif text-lg font-semibold text-[#4A1D4F] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#B8935A]" />
              <span>7-Day Hassle-Free Returns</span>
            </h3>
            <p>
              If a saree does not completely captivate you, request a return within 7 days of doorstep receipt. We schedule a complimentary reverse pickup from your residence.
            </p>
          </div>

          <div id="care" className="space-y-2 pt-4 border-t border-gray-100">
            <h3 className="font-serif text-lg font-semibold text-[#4A1D4F] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#B8935A]" />
              <span>Heirloom Silk Care Recommendations</span>
            </h3>
            <p>
              Always store your pure zari silk sarees wrapped in a soft white muslin cloth. Avoid plastic bags or direct exposure to perfume sprays. Refold along alternate folds twice a year to maintain fabric longevity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
