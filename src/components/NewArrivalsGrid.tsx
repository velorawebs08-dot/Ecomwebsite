/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NewArrivalsGrid.tsx - 4-column grid for newly curated sarees
 */

import React from 'react';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from './ProductCard.tsx';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const NewArrivalsGrid: React.FC = () => {
  const { language } = useStore();

  // Pick new arrivals from products list
  const newArrivals = siteData.products
    .filter((p) => p.badge === 'New' || p.category === 'georgette' || p.category === 'party-wear')
    .slice(0, 8);

  return (
    <section className="py-14 sm:py-20 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold">
              {language === 'mr' ? 'नवीन भर' : 'Fresh Off The Looms'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1E1A24] mt-1">
              {language === 'mr' ? 'नवीन आगमन संग्रह' : 'New Arrivals Collection'}
            </h2>
          </div>

          <Link
            to="/shop?sort=new"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A1D4F] hover:text-[#B8935A] transition-colors group"
          >
            <span>{language === 'mr' ? 'सर्व १८ साड्या एक्सप्लोर करा' : 'Explore All 18 Sarees'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-column grid (2 cols on mobile, 3 cols tablet, 4 cols desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
