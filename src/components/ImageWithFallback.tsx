/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ImageWithFallback.tsx - Ultra-crisp image component
 * - Hardware accelerated: transform: translateZ(0), image-rendering: -webkit-optimize-contrast
 * - Checks cache immediately to prevent opacity flash or blur on loaded images
 * - Smooth 300ms fade-in on fresh load without muddy backdrop-filter
 * - decoding="async", fetchPriority & loading="eager" on priority images
 * - Plain blush #F3E6EA box on load error
 */

import React, { useState, useEffect, useRef } from 'react';
import { getHighResImageUrl } from '../utils/imageUtils.ts';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  aspectRatioClass?: string;
  priority?: boolean;
  highResSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  highResSrc,
  alt = 'Saree Image',
  className = '',
  fallbackText,
  aspectRatioClass,
  style,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  
  // Resolve effective image source: prefer highResSrc if provided, otherwise resolve src
  const effectiveSrc = highResSrc ? getHighResImageUrl(highResSrc) : (src ? getHighResImageUrl(src) : '');
  const [hasError, setHasError] = useState(!effectiveSrc || effectiveSrc.trim() === '');
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if image is already cached or completed by the browser
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [effectiveSrc]);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F3E6EA] p-4 text-center border border-[#B8935A]/15 ${
          aspectRatioClass || 'aspect-[4/5]'
        } ${className}`}
      >
        <span className="font-serif text-sm font-medium text-[#4A1D4F] line-clamp-2 px-2">
          {fallbackText || alt}
        </span>
      </div>
    );
  }

  // Create srcSet if both thumbnail and high-res are distinct
  const srcSetString =
    src && effectiveSrc && src !== effectiveSrc
      ? `${src} 400w, ${effectiveSrc} 1600w`
      : undefined;

  return (
    <div className={`relative overflow-hidden w-full h-full ${aspectRatioClass || ''}`}>
      {/* Light subtle pulse placeholder until image is fully painted */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#FAF6F0] flex items-center justify-center pointer-events-none z-0">
          <div className="w-5 h-5 border-2 border-[#B8935A]/30 border-t-[#4A1D4F] rounded-full animate-spin" />
        </div>
      )}
      <img
        ref={imgRef}
        src={effectiveSrc}
        srcSet={srcSetString}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        style={{
          imageRendering: '-webkit-optimize-contrast',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
          ...style,
        }}
        className={`relative z-1 ${className} transition-opacity duration-300 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
