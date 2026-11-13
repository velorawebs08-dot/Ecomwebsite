/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CategoryPage.tsx - Dedicated category landing page with banner, description, and filtered products
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from '../components/ProductCard.tsx';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useStore();

  const category = siteData.categories.find((c) => c.slug === slug);
  const products = siteData.products.filter((p) => p.category === slug);

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-[#FAF6F0]">
        <h2 className="font-serif text-2xl font-bold text-[#1E1A24] mb-2">Category Not Found</h2>
        <p className="text-xs text-gray-500 mb-6">The category you requested could not be located.</p>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-full bg-[#4A1D4F] text-white text-xs font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#4A1D4F]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#4A1D4F]">Shop</Link>
          <span>/</span>
          <span className="text-[#4A1D4F] font-semibold">{t(category.name)}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-12 bg-[#1E1A24] text-white shadow-lg border border-[#B8935A]/30">
          <div className="absolute inset-0 opacity-40">
            <ImageWithFallback
              src={category.image}
              alt={t(category.name)}
              className="w-full h-full object-cover"
              fallbackText={t(category.name)}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          
          <div className="relative z-10 p-8 sm:p-12 max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'विशेष संग्रह' : 'Curated Edit'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-3">
              {t(category.name)}
            </h1>
            <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed mb-6">
              {t(category.tagline)}. Handcrafted in certified weaver clusters with pure zari accents and natural luster.
            </p>
            <div className="text-xs text-[#B8935A] font-medium">
              Showing {products.length} mastercrafted sarees in this edit
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mb-6 flex justify-between items-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A1D4F] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'mr' ? 'सर्व साड्या पहा' : 'View All 18 Sarees'}</span>
          </Link>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-4">No sarees found in this category.</p>
            <Link
              to="/shop"
              className="px-6 py-2 rounded-full bg-[#4A1D4F] text-white text-xs font-medium"
            >
              Browse All Sarees
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 4} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
