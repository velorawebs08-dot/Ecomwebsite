/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SpecialOfferBanner.tsx - Wide, left-aligned promotional banner
 * - Background: Magenta silk saree with gold zari on the right, dark plum on the left
 * - Subtle left-to-right gradient overlay (rgba(42,18,51,0.85) to transparent)
 * - Aspect ratio ~6.5:1 on desktop (height ~220-260px, rounded corners 8px)
 * - Headline: "Get 10% Off" / "on your first order" in Cormorant Garamond serif
 * - Outlined code pill: "Use Code: WELCOME10" (copies to clipboard, applies to cart, says "Code Copied ✓" for 2s)
 * - Footnote: "*Automatically applies 10% discount on orders above ₹2,000 at checkout. Shop Now →"
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';

export const SpecialOfferBanner: React.FC = () => {
  const { t, language, applyCoupon } = useStore();
  const [copied, setCopied] = useState(false);

  const offer = siteData.specialOffer;
  const bannerImage = (offer as any).image || '/src/assets/images/promo_festive_banner_1794452814574.jpg';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offer.code);
    applyCoupon(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner container with 8px rounded corners, 220-260px height, right-aligned saree bg */}
        <div
          className="relative w-full rounded-[8px] overflow-hidden min-h-[220px] md:min-h-[230px] lg:h-[240px] xl:h-[250px] shadow-sm border border-[#B8935A]/20 flex items-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#2A1233',
          }}
        >
          {/* Desktop left-to-right gradient overlay: rgba(42,18,51,0.85) -> transparent to preserve right ~45% saree */}
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(42,18,51,0.90) 0%, rgba(42,18,51,0.85) 45%, rgba(42,18,51,0.40) 65%, rgba(42,18,51,0.05) 85%, transparent 100%)',
            }}
          />

          {/* Mobile/tablet gradient overlay for crisp legibility over background */}
          <div
            className="absolute inset-0 pointer-events-none md:hidden"
            style={{
              background:
                'linear-gradient(100deg, rgba(42,18,51,0.94) 0%, rgba(42,18,51,0.86) 60%, rgba(42,18,51,0.60) 100%)',
            }}
          />

          {/* Left-aligned content container, vertically centered, left padding ~8% */}
          <div className="relative z-10 w-full md:max-w-[58%] lg:max-w-[55%] pl-[6%] sm:pl-[7%] lg:pl-[8%] pr-6 py-7 md:py-0 flex flex-col justify-center">
            
            {/* Small uppercase label: "SPECIAL OFFER" */}
            <span
              className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#B98BD0] block mb-1.5 sm:mb-2 select-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {language === 'mr' ? 'खास ऑफर' : 'SPECIAL OFFER'}
            </span>

            {/* Headline and Code Pill Row (Headline on left, Pill to the right vertically centered on desktop) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-6 lg:gap-7">
              <div className="leading-tight">
                {/* Headline line 1: "Get 10% Off" (Cormorant Garamond 500) */}
                <h2
                  className="text-white font-medium text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] leading-[1.05] tracking-normal"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
                >
                  {language === 'mr' ? '१०% सूट मिळवा' : 'Get 10% Off'}
                </h2>

                {/* Headline line 2: "on your first order" (smaller, directly under line 1) */}
                <p
                  className="text-white/95 font-normal text-xl sm:text-2xl lg:text-[25px] xl:text-[27px] leading-tight mt-0.5"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
                >
                  {language === 'mr' ? 'आपल्या पहिल्या ऑर्डरवर' : 'on your first order'}
                </p>
              </div>

              {/* Code pill: 1px border rgba(255,255,255,0.6), transparent bg, 12-13px Inter text, padding 8px 18px */}
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center justify-center self-start sm:self-center px-[18px] py-[8px] rounded-full border border-white/60 bg-transparent hover:bg-white/10 active:bg-white/20 text-white text-xs sm:text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
                style={{ fontFamily: "'Inter', sans-serif" }}
                aria-label={`Copy coupon code ${offer.code}`}
              >
                {copied
                  ? (language === 'mr' ? 'कोड कॉपी झाला ✓' : 'Code Copied ✓')
                  : (language === 'mr' ? `कोड: ${offer.code}` : `Use Code: ${offer.code}`)}
              </button>
            </div>

            {/* Footnote with gold Shop Now link (hidden on mobile, visible on sm+) */}
            <div
              className="mt-3 sm:mt-3.5 text-[11px] sm:text-xs text-white/75 hidden sm:block"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>
                {language === 'mr'
                  ? '*चेकआउट दरम्यान ₹२,००० वरील खरेदीवर आपोआप १०% सूट मिळेल.'
                  : '*Automatically applies 10% discount on orders above ₹2,000 at checkout.'}
              </span>
              <Link
                to="/shop"
                className="text-[#B8975A] hover:text-[#d4af72] hover:underline font-medium ml-1.5 transition-colors"
              >
                {language === 'mr' ? 'आताच खरेदी करा →' : 'Shop Now →'}
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
