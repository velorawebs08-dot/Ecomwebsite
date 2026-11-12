/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TestimonialsSection.tsx - Real customer reviews with verified badges & product tags
 */

import React from 'react';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, language } = useStore();

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#B8935A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold">
            {language === 'mr' ? 'ग्राहकांचे मनोगत' : 'Words of Patronage'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1E1A24] mt-1 text-balance">
            {language === 'mr' ? 'आमच्या मौल्यवान ग्राहकांचे अनुभव' : 'Cherished Across Generations'}
          </h2>
          <div className="w-12 h-0.5 bg-[#B8935A]/60 mx-auto mt-3" />
        </div>

        {/* 4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#B8935A]/20 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[#B8935A]/30 mb-2" />
                
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-[#1E1A24]/90 font-light leading-relaxed italic mb-4">
                  "{t(review.comment)}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#B8935A]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#1E1A24]">
                      {review.name}
                    </h4>
                    <span className="text-[11px] text-gray-500">{review.city}</span>
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <div className="mt-2 text-[10px] text-[#4A1D4F] font-medium truncate">
                  Purchased: {review.productName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
