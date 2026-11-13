/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * imageUtils.ts - High-resolution image resolution and optimization utilities
 * Maps thumbnail URLs to high-definition 1600px+ masters and strips downscaling query params.
 */

export const POSTIMG_FULL_MAP: Record<string, string> = {
  // Saree 1: Royal Purple Banarasi Silk Saree
  'https://i.postimg.cc/v4Vwk2WK/Banarasi.webp': 'https://i.postimg.cc/MzwnLwSf/Banarasi.webp',
  // Saree 2: Royal Blue Silk Saree with Zari Pallu
  'https://i.postimg.cc/9rSjxHqL/ZARI-PALLU-IMG-2.webp': 'https://i.postimg.cc/bpkGLJKr/ZARI-PALLU-IMG-2.webp',
  // Saree 3: Emerald Green Tussar Silk Saree
  'https://i.postimg.cc/Mv48sJjs/Tusar-img-3.webp': 'https://i.postimg.cc/0PD6ZQLr/Tusar-img-3.webp',
  // Saree 4: Elegant Blue Cotton Saree
  'https://i.postimg.cc/6ySNHxGL/IMG-4.webp': 'https://i.postimg.cc/hcTJMjHS/IMG-4.webp',
  // Saree 5: Teal Chanderi Cotton-Silk Saree
  'https://i.postimg.cc/gn5PMb64/IMG-5.webp': 'https://i.postimg.cc/TfgyQwZP/IMG-5.webp',
  // Saree 6: Rani Pink Bandhani Cotton Saree
  'https://i.postimg.cc/svMkGH0T/IMG-6.webp': 'https://i.postimg.cc/kq3GVCBG/IMG-6.webp',
  // Saree 7: Soft Peach Georgette Saree
  'https://i.postimg.cc/fJVGSqgS/IMG-7.webp': 'https://i.postimg.cc/5bdyHJjh/IMG-7.webp',
  // Saree 8: Wine Red Banarasi Georgette Saree
  'https://i.postimg.cc/QHF2KYnc/IMG-8.webp': 'https://i.postimg.cc/c0yCKWrW/IMG-8.webp',
  // Saree 9: Pastel Pink Chiffon Georgette Saree
  'https://i.postimg.cc/9rD6wgNR/IMG-9.webp': 'https://i.postimg.cc/3Y5NyhWP/IMG-9.webp',
  // Saree 10: Maroon Kanjivaram Silk Saree
  'https://i.postimg.cc/crvptk5Q/IMG-10.webp': 'https://i.postimg.cc/pRbr9vpx/IMG-10.webp',
  // Saree 11: Mustard Kanjivaram Temple Border Saree
  'https://i.postimg.cc/rR0fs3Fs/IMG-11.webp': 'https://i.postimg.cc/44TG3JwS/IMG-11.webp',
  // Saree 12: Meenakari Green Kanjivaram Silk Saree
  'https://i.postimg.cc/1VnvX2Rd/IMG-12.webp': 'https://i.postimg.cc/kMdC5nwR/IMG-12.webp',
  // Saree 13: Black and Gold Party Wear Saree
  'https://i.postimg.cc/YGyXpM7J/img-13.webp': 'https://i.postimg.cc/pWjxx9Q8/img-13.webp',
  // Saree 14: Lavender Organza Saree
  'https://i.postimg.cc/XGD2V43W/IMG-14.webp': 'https://i.postimg.cc/PXDhhLbQ/IMG-14.webp',
  // Saree 15: Orange Festive Silk Saree
  'https://i.postimg.cc/sGQTxqfb/IMG-15.webp': 'https://i.postimg.cc/7Py4LxXz/IMG-15.webp',
  // Saree 16: Ivory Handloom Cotton Saree with Red Border
  'https://i.postimg.cc/d7snrLVK/IMG-16.webp': 'https://i.postimg.cc/y7rzZhvh/IMG-16.webp',
  // Saree 17: Sea Green Linen Handloom Saree
  'https://i.postimg.cc/d7snrLtb/IMG-17.webp': 'https://i.postimg.cc/s30RhPw7/IMG-17.webp',
  // Saree 18: Peacock Green Paithani Saree
  'https://i.postimg.cc/06kZDbys/IMG-18.webp': 'https://i.postimg.cc/hK3qd8pb/IMG-18.webp',
};

/**
 * Returns the highest resolution version available for any image URL.
 * Strips downscaling parameters or upgrades to 1600px wide 90% quality.
 */
export function getHighResImageUrl(url?: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return '';
  }

  const cleanUrl = url.trim();

  // Check known postimg thumbnail-to-full mapping
  if (POSTIMG_FULL_MAP[cleanUrl]) {
    return POSTIMG_FULL_MAP[cleanUrl];
  }

  // If already a high-res postimg master
  if (cleanUrl.includes('i.postimg.cc')) {
    return cleanUrl;
  }

  // Handle Unsplash images: ensure 1600px width with 90 quality
  if (cleanUrl.includes('images.unsplash.com')) {
    const base = cleanUrl.split('?')[0];
    return `${base}?auto=format&fit=crop&w=1600&q=90`;
  }

  // Handle generic URLs with size or quality parameters (e.g. w=200, width=300, q=30)
  try {
    const parsed = new URL(cleanUrl);
    // Remove downsizing parameters
    const paramsToRemove = ['w', 'width', 'h', 'height', 'q', 'quality', 'thumb', 'small', 'resize', 'lqip', 'blur'];
    let modified = false;
    paramsToRemove.forEach((p) => {
      if (parsed.searchParams.has(p)) {
        parsed.searchParams.delete(p);
        modified = true;
      }
    });

    // If it is a dynamic image service, specify high quality
    if (modified) {
      parsed.searchParams.set('w', '1600');
      parsed.searchParams.set('q', '90');
      return parsed.toString();
    }
  } catch {
    // If not a standard URL, fallback to original
  }

  return cleanUrl;
}
