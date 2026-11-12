/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HeroSlider.tsx - 520px desktop / 460px mobile hero directly below solid navbar.
 * Left-side text and button restored on all slides:
 * 1. Eyebrow: small gold uppercase text with thin gold line before it, Inter 13px, tracking 0.25em, color #C9A15B
 * 2. Heading: white, Cormorant Garamond, weight 500, 60px desktop / 38px mobile, leading 1.1, max 2 lines
 * 3. Subtitle: white at 88% opacity, Inter 17px, max-width 480px, max 2 lines
 * 4. Button: plum #4A1D4F pill with white text and arrow ("Shop Now →"), Inter 15px weight 500, padding 14px 30px, links to /shop
 * Spacing: eyebrow, 16px gap, heading, 20px gap, subtitle, 32px gap, button.
 * Controls: Exactly TWO small 40px circular buttons at bottom-right corner (32px from right, 28px from bottom).
 * Autoplay 5s, touch swipe, loop navigation, object-position: right 25%.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { t } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const slides = siteData.heroSlides;

  // Preload next and previous images for instant transitions
  useEffect(() => {
    const nextIdx = (currentSlide + 1) % slides.length;
    const prevIdx = (currentSlide - 1 + slides.length) % slides.length;
    if (slides[nextIdx]?.image) {
      const img1 = new Image();
      img1.src = slides[nextIdx].image;
    }
    if (slides[prevIdx]?.image) {
      const img2 = new Image();
      img2.src = slides[prevIdx].image;
    }
  }, [currentSlide, slides]);

  const changeSlide = useCallback(
    (newIndex: number) => {
      setCurrentSlide(newIndex);
      setTimerResetKey((prev) => prev + 1);
    },
    []
  );

  const handleNext = useCallback(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    changeSlide(nextIndex);
  }, [changeSlide, currentSlide, slides.length]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(prevIndex);
  }, [changeSlide, currentSlide, slides.length]);

  // Autoplay every 5 seconds, paused while hovering hero or buttons. Resets after click.
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, timerResetKey]);

  // Mobile swipe handlers (min 50px drag)
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

  // Keyboard navigation when hero is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="group relative w-full h-[460px] lg:h-[520px] overflow-hidden bg-[#190C14] outline-none focus-visible:ring-2 focus-visible:ring-[#B8935A]/50 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Sarees Carousel"
    >
      {/* Slides Container */}
      {slides.map((item, index) => {
        const isCurrent = index === currentSlide;

        return (
          <div
            key={item.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isCurrent}
          >
            {/* Background Image: absolute inset-0 so it doesn't push text down in document flow */}
            {item.image && item.image.trim() !== '' ? (
              <img
                src={item.image}
                alt={t(item.title)}
                referrerPolicy="no-referrer"
                style={{ objectPosition: item.objectPosition || 'right 25%' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#4A1D4F] via-[#2A102D] to-[#190C14]" />
            )}

            {/* Dark left-to-right gradient overlay: behind the text, not on top */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(25,12,20,0.78) 0%, rgba(25,12,20,0.45) 40%, rgba(25,12,20,0) 70%)',
              }}
            />

            {/* Slide Text Content: absolute inset-0 z-20 vertically centered, aligned with logo left edge */}
            <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  key={`text-${item.id}-${isCurrent}`}
                  className={`max-w-[580px] text-left pointer-events-auto ${
                    isCurrent ? 'animate-hero-fade' : 'opacity-0'
                  }`}
                >
                  {/* 1. Eyebrow: short thin gold line, then uppercase text */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-[1.5px] bg-[#C9A15B] rounded-full inline-block flex-shrink-0" />
                    <span className="text-[13px] font-sans font-medium uppercase tracking-[0.25em] text-[#C9A15B]">
                      {t(item.eyebrow)}
                    </span>
                  </div>

                  {/* 16px gap */}
                  <div className="h-[16px]" />

                  {/* 2. Heading: white, Cormorant Garamond, weight 500, 60px desktop / 38px mobile, 2 lines */}
                  <h1
                    className="font-serif font-medium text-[38px] sm:text-[48px] lg:text-[60px] leading-[1.1] text-white max-w-[560px]"
                    style={{ textShadow: '0 2px 14px rgba(0,0,0,0.35)' }}
                  >
                    {t(item.title)}
                  </h1>

                  {/* 20px gap */}
                  <div className="h-[20px]" />

                  {/* 3. Subtitle: white at 88% opacity, Inter 17px, max-width 480px, 2 lines */}
                  <p className="font-sans text-[16px] sm:text-[17px] text-white/88 leading-relaxed max-w-[480px] font-normal">
                    {t(item.subtitle)}
                  </p>

                  {/* 32px gap */}
                  <div className="h-[32px]" />

                  {/* 4. One category button: plum #4A1D4F pill, white text with arrow, padding 14px 30px */}
                  <div>
                    <Link
                      to={item.ctaLink || '/shop'}
                      className="group/btn inline-flex items-center gap-2.5 py-[14px] px-[30px] rounded-full bg-[#4A1D4F] hover:bg-[#5E2564] text-white font-sans text-[15px] font-medium transition-all shadow-md hover:shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
                    >
                      <span>{t(item.ctaLabel)}</span>
                      <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1 font-sans">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Fade-up keyframe for smooth 0.5s text entrance */}
      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-hero-fade {
          animation: heroFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* TWO SWIPE BUTTONS: Side by side at bottom-right corner (32px from right, 28px from bottom) */}
      {/* 40px circles, rgba(25,12,20,0.35) bg, 1px white border at 60%, white chevrons, hover to white with plum chevron */}
      <div className="absolute bottom-5 right-4 sm:bottom-[28px] sm:right-[32px] z-30 flex items-center gap-2.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="w-[40px] h-[40px] rounded-full border border-white/60 bg-[rgba(25,12,20,0.35)] backdrop-blur-xs text-white hover:bg-white hover:text-[#4A1D4F] active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="w-[40px] h-[40px] rounded-full border border-white/60 bg-[rgba(25,12,20,0.35)] backdrop-blur-xs text-white hover:bg-white hover:text-[#4A1D4F] active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </section>
  );
};
