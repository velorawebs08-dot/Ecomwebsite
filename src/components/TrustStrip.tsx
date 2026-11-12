/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TrustStrip.tsx - 4-pillar trust strip (Free Shipping, Certified Authentic, 7-Day Returns, Styling Support)
 */

import React from 'react';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const iconMap = {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
};

export const TrustStrip: React.FC = () => {
  const { t } = useStore();

  return (
    <section className="py-10 bg-[#FAF6F0] border-b border-[#B8935A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {siteData.trustPoints.map((point) => {
            const Icon = iconMap[point.icon];
            return (
              <div key={point.id} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F3E6EA] border border-[#B8935A]/30 flex items-center justify-center shrink-0 text-[#4A1D4F]">
                  <Icon className="w-5 h-5 text-[#4A1D4F]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#1E1A24]">
                    {t(point.title)}
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                    {t(point.description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
