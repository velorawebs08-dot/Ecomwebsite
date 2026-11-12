/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HomePage.tsx - Complete luxury home page with 11 sections in specified order
 */

import React from 'react';
import { HeroSlider } from '../components/HeroSlider.tsx';
import { ShopByCategory } from '../components/ShopByCategory.tsx';
import { FeaturedCollections } from '../components/FeaturedCollections.tsx';
import { BestSellersCarousel } from '../components/BestSellersCarousel.tsx';
import { SpecialOfferBanner } from '../components/SpecialOfferBanner.tsx';
import { NewArrivalsGrid } from '../components/NewArrivalsGrid.tsx';
import { TestimonialsSection } from '../components/TestimonialsSection.tsx';
import { TrustStrip } from '../components/TrustStrip.tsx';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* 3. Hero Slider: Full-bleed 4 slides with left overlay */}
      <HeroSlider />

      {/* 4. Shop by Category: Round thumbnails */}
      <ShopByCategory />

      {/* 5. Featured Collection Banners */}
      <FeaturedCollections />

      {/* 6. Best Sellers ("Loved by Many") */}
      <BestSellersCarousel />

      {/* 7. Special Offer Banner (Plum, WELCOME10) */}
      <SpecialOfferBanner />

      {/* 8. New Arrivals: 4-column grid */}
      <NewArrivalsGrid />

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. Trust Strip: 4 icons */}
      <TrustStrip />
    </div>
  );
};
