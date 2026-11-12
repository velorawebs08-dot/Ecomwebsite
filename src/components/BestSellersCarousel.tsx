/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BestSellersCarousel.tsx - Product carousel with arrows for "Loved by Many"
 */

import React, { useRef } from 'react';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from './ProductCard.tsx';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BestSellersCarousel: React.FC = () => {
  const { language } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter bestsellers from 18 products
  const bestSellers = siteData.products.filter(
    (p) => p.badge === 'Bestseller' || p.badge === 'Exclusive' || p.rating >= 4.8
  ).slice(0, 8);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-y border-[#B8935A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left-Right Carousel Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'अत्यंत लोकप्रिय' : 'Loved by Many'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1E1A24]">
              {language === 'mr' ? 'सर्वोत्कृष्ट आणि सर्वाधिक पसंतीचे' : 'Best Selling Masterpieces'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/shop?sort=bestseller"
              className="text-xs font-semibold text-[#4A1D4F] hover:text-[#B8935A] underline underline-offset-4 mr-2"
            >
              {language === 'mr' ? 'सर्व पाहा' : 'View All'}
            </Link>
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-gray-200 hover:border-[#4A1D4F] text-gray-700 hover:text-[#4A1D4F] transition-colors"
              aria-label="Scroll bestsellers left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-gray-200 hover:border-[#4A1D4F] text-gray-700 hover:text-[#4A1D4F] transition-colors"
              aria-label="Scroll bestsellers right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1"
        >
          {bestSellers.map((product) => (
            <div key={product.id} className="w-[260px] sm:w-[290px] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
