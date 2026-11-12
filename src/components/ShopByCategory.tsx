/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ShopByCategory.tsx - Round thumbnail category carousel with horizontal scroll on mobile
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ImageWithFallback } from './ImageWithFallback.tsx';

export const ShopByCategory: React.FC = () => {
  const { t, language } = useStore();

  return (
    <section className="py-12 sm:py-16 bg-[#FAF6F0] border-b border-[#B8935A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold">
            {language === 'mr' ? 'वारसा प्रकार' : 'Curated Categories'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1E1A24] mt-1 text-balance">
            {language === 'mr' ? 'प्रकारानुसार साड्यांची खरेदी' : 'Shop by Category'}
          </h2>
          <div className="w-12 h-0.5 bg-[#B8935A]/60 mx-auto mt-3" />
        </div>

        {/* Categories Row (Horizontal scroll on mobile, flex grid on desktop) */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 px-1">
          {siteData.categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group flex flex-col items-center text-center shrink-0 w-32 sm:w-auto"
            >
              {/* Round Image Thumbnail with Gold Ring */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border border-[#B8935A]/40 group-hover:border-[#4A1D4F] transition-all duration-300 group-hover:scale-105 shadow-sm group-hover:shadow-md bg-white">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={t(category.name)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    fallbackText={t(category.name)}
                  />
                </div>
              </div>

              {/* Category Name */}
              <h3 className="font-serif text-base font-semibold text-[#1E1A24] mt-3 group-hover:text-[#4A1D4F] transition-colors">
                {t(category.name)}
              </h3>

              {/* Tagline */}
              <p className="text-[11px] text-gray-500 mt-0.5 max-w-[120px] line-clamp-2 leading-tight">
                {t(category.tagline)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
