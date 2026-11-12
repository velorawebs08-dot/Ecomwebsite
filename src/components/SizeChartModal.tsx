/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SizeChartModal.tsx - Blouse measurement modal with fit guide & standard sizes
 */

import React from 'react';
import { SIZE_CHART } from '../data/siteData.ts';
import { X, Sparkles, Ruler } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-lg bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#B8935A]/30 overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#B8935A]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#4A1D4F]" />
            <h3 className="font-serif text-xl font-semibold text-[#1E1A24]">
              Blouse Measurement Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-[#4A1D4F] rounded-full transition-colors"
            aria-label="Close size chart modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-[#F3E6EA]/50 p-3.5 rounded-xl text-xs text-[#4A1D4F] flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-[#B8935A] mt-0.5" />
            <p>
              All standard sizes come with <strong>2 inches of margin</strong> on both sides for effortless alteration by your local tailor.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF6F0] text-[#4A1D4F] font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Bust</th>
                  <th className="py-2.5 px-3">Waist</th>
                  <th className="py-2.5 px-3">Armhole</th>
                  <th className="py-2.5 px-3">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="py-2 px-3 font-semibold text-[#4A1D4F]">{row.size}</td>
                    <td className="py-2 px-3">{row.bust}</td>
                    <td className="py-2 px-3">{row.waist}</td>
                    <td className="py-2 px-3">{row.armhole}</td>
                    <td className="py-2 px-3">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-gray-500 space-y-1 pt-2">
            <p className="font-semibold text-gray-700">Need Custom Tailoring?</p>
            <p>
              Choose "Unstitched blouse piece" if you prefer to have the fabric cut and stitched to your exact bespoke measurements.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-full bg-[#4A1D4F] text-white text-xs font-semibold hover:bg-[#3B153F] transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
