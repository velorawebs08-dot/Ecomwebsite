/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ImageWithFallback.tsx - Resilient image component
 * If an image fails to load, shows a plain blush #F3E6EA box with the product name.
 */

import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Saree Image',
  className = '',
  fallbackText,
  aspectRatioClass,
  style,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(!src || src.trim() === '');

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F3E6EA] p-4 text-center border border-[#B8935A]/15 ${
          aspectRatioClass || 'aspect-[3/4]'
        } ${className}`}
      >
        <span className="font-serif text-sm font-medium text-[#4A1D4F] line-clamp-2 px-2">
          {fallbackText || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden w-full h-full ${aspectRatioClass || ''}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#F3E6EA]/50 animate-pulse flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-[#B8935A]/30 border-t-[#4A1D4F] rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        style={style}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};
