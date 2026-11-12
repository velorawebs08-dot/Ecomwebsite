/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FeaturedCollections.tsx - Full-bleed featured collection banners.
 * - Aspect ratio 2:1 on desktop, 4:3 on mobile
 * - Only cards with non-empty image URLs are shown (hides Party Wear until URL added)
 * - 2 cards visible at a time on desktop, wraps around on the last card [4, 0]
 * - Arrow navigation buttons, touch swipe, no autoplay
 * - Soft gradient on text side for crystal-clear readability
 */

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const FeaturedCollections: React.FC = () => {
  const { t } = useStore();
  const [pageIndex, setPageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Show only cards with an image URL (hides cards like Party Wear until an image is provided)
  const activeCards = (siteData.featuredCollections || siteData.collectionBanners).filter(
    (b) => b.image && b.image.trim() !== ''
  );

  if (activeCards.length === 0) {
    return null;
  }

  // Calculate 2-card desktop pairs (with wrap-around when the last page has 1 card left)
  const totalPages = Math.ceil(activeCards.length / 2);
  const firstIndex = (pageIndex * 2) % activeCards.length;
  const secondIndex = (firstIndex + 1) % activeCards.length;
  const visibleCards = [activeCards[firstIndex], activeCards[secondIndex]];

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Touch swipe support (min 50px drag)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation Arrows */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold block mb-1.5">
              {t({ en: "Curated Edits", mr: "खास संग्रह" })}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1A24]">
              {t({ en: "Featured Collections", mr: "वैशिष्ट्यपूर्ण संग्रह" })}
            </h2>
          </div>

          {/* Navigation Arrow Buttons */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-black/15 bg-white text-[#1E1A24] hover:bg-[#4A1D4F] hover:text-white hover:border-[#4A1D4F] transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#4A1D4F]"
                aria-label="Previous collections"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-black/15 bg-white text-[#1E1A24] hover:bg-[#4A1D4F] hover:text-white hover:border-[#4A1D4F] transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#4A1D4F]"
                aria-label="Next collections"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          )}
        </div>

        {/* 2-Card Grid (Full Bleed Background Images, 2:1 desktop, 4:3 mobile) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {visibleCards.map((card, idx) => (
            <div
              key={`${card.id}-${pageIndex}-${idx}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[2/1] border border-[#B8935A]/25 shadow-md bg-[#190C14] flex flex-col justify-end p-6 sm:p-8 lg:p-10 transition-all duration-500 animate-fade-in select-none"
            >
              {/* Full-bleed Background Image with graceful fallback */}
              <img
                src={card.image}
                alt={card.alt || t(card.title)}
                loading="lazy"
                style={{ objectPosition: card.objectPosition || 'center' }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.opacity = '0';
                }}
              />

              {/* Gradient fallback behind image in case of loading error */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4A1D4F] via-[#2A102D] to-[#190C14]" />

              {/* Soft dark gradient on the text side for readability */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    card.textSide === 'right'
                      ? 'linear-gradient(270deg, rgba(20,10,15,0.78) 0%, rgba(20,10,15,0.50) 45%, rgba(20,10,15,0.15) 75%, rgba(20,10,15,0) 100%)'
                      : 'linear-gradient(90deg, rgba(20,10,15,0.78) 0%, rgba(20,10,15,0.50) 45%, rgba(20,10,15,0.15) 75%, rgba(20,10,15,0) 100%)',
                }}
              />

              {/* Mobile bottom vignette for extra readability */}
              <div className="md:hidden absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              {/* Text & Action Button Content */}
              <div
                className={`relative z-10 max-w-sm ${
                  card.textSide === 'right' ? 'ml-auto text-left' : 'mr-auto text-left'
                }`}
              >
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#E6D3AE] font-semibold block mb-1">
                  {t({ en: "Featured Heritage", mr: "विशिष्ट वारसा" })}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FAF6F0] mb-2 leading-tight">
                  {t(card.title)}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF6F0]/85 font-light mb-5 line-clamp-2">
                  {t(card.subtitle)}
                </p>

                <Link
                  to={card.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#FAF6F0] text-[#FAF6F0] hover:bg-[#FAF6F0] hover:text-[#4A1D4F] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{t(card.ctaLabel)}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Page Indicator Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPageIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  pageIndex === idx ? 'w-6 bg-[#4A1D4F]' : 'w-2 bg-black/20 hover:bg-black/40'
                }`}
                aria-label={`Go to collection page ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
