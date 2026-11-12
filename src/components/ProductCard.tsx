/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ProductCard.tsx - Premium E-commerce product card
 * - Aspect ratio: 3 / 4, full card width, overflow: hidden
 * - Image fills box fully: object-fit: cover, object-position: center 25%, no empty space
 * - No hover effects (no second image, no zoom, no lift, no shadow change)
 * - Single image per product (uses product.image or product.images[0])
 * - Plain blush #F3E6EA box on image load error
 * - Color text line "Available in [Colours]" (no color circles or "2 shades")
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ImageWithFallback } from './ImageWithFallback.tsx';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart, t, language } = useStore();
  const [justAdded, setJustAdded] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleQuickAdd = (size: string = 'Unstitched blouse piece') => {
    addToCart(product, size, product.colors[0]?.name || 'Standard', 1, true);
    setJustAdded(true);
    setShowSizePicker(false);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const productImage = product.image || product.images[0];
  const productName = t(product.name);

  // Available in [Colours] text line
  const colorDisplay =
    language === 'mr'
      ? (product.colorNames?.mr || product.colors.map((c) => c.name).join(' आणि '))
      : (product.colorNames?.en || product.colors.map((c) => c.name).join(' & '));

  return (
    <div
      className="relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#B8935A]/15 shadow-2xs"
      onMouseLeave={() => setShowSizePicker(false)}
    >
      {/* Card Image Box: aspect-ratio: 3 / 4, full width, overflow: hidden */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF6F0]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <ImageWithFallback
            src={productImage}
            alt={productName}
            loading="lazy"
            style={{ objectPosition: 'center 25%' }}
            className="w-full h-full object-cover"
            fallbackText={productName}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-[#4A1D4F] text-[#FAF6F0] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && !product.badge?.includes('%') && (
            <span className="bg-[#B8935A] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            isFavorited
              ? 'bg-red-50 text-red-600 shadow-sm'
              : 'bg-white/85 text-gray-600 hover:text-red-500 hover:bg-white shadow-2xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Size Selection Overlay (Appears on Quick Add click) */}
        {showSizePicker && (
          <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-3 border-t border-[#B8935A]/30 z-20 animate-fade-in">
            <div className="text-[11px] font-semibold text-[#4A1D4F] uppercase tracking-wider mb-2 text-center">
              {language === 'mr' ? 'ब्लाउज प्रकार निवडा' : 'Select Blouse Size'}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => handleQuickAdd('Unstitched blouse piece')}
                className="col-span-2 py-1.5 px-2 bg-[#FAF6F0] hover:bg-[#4A1D4F] hover:text-white text-[11px] font-medium rounded border border-[#B8935A]/30 transition-colors text-center truncate"
              >
                {language === 'mr' ? 'अनस्टिच्ड ब्लाउज पीस' : 'Unstitched Piece'}
              </button>
              {['S (34)', 'M (36)', 'L (38)', 'XL (40)'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleQuickAdd(size)}
                  className="py-1 px-2 bg-white hover:bg-[#4A1D4F] hover:text-white text-[11px] font-medium rounded border border-gray-200 transition-colors text-center"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Fabric tag */}
          <div className="text-[11px] uppercase tracking-wider text-gray-500 font-medium line-clamp-1 mb-1">
            <span>{t(product.fabric)}</span>
            <span className="mx-1.5 text-gray-300">·</span>
            <span className="capitalize">{product.category}</span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="font-serif text-base font-semibold text-[#1E1A24] hover:text-[#4A1D4F] line-clamp-1 leading-snug transition-colors"
          >
            {productName}
          </Link>

          {/* Available in [Colours] text line (no colour circles, no "2 shades") */}
          <div className="text-[11px] sm:text-xs text-gray-500 mt-1.5 font-sans line-clamp-1">
            {language === 'mr' ? `उपलब्ध रंग: ${colorDisplay}` : `Available in ${colorDisplay}`}
          </div>
        </div>

        {/* Price & Rating Row */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-base sm:text-lg font-bold text-[#4A1D4F] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-gray-400 line-through tabular-nums">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-700">{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => {
              setShowSizePicker(!showSizePicker);
            }}
            className={`p-2 sm:px-3 sm:py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 shadow-2xs ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FAF6F0] text-[#4A1D4F] hover:bg-[#4A1D4F] hover:text-white border border-[#B8935A]/30'
            }`}
            aria-label={`Add ${productName} to shopping bag`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'mr' ? 'जोडले!' : 'Added'}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'mr' ? 'खरेदी करा' : 'Add to Bag'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
