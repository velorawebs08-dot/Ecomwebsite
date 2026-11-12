/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ProductDetailPage.tsx - High-end PDP with 4 thumbnail gallery, size pills, size chart modal,
 * pincode check, WhatsApp order, reviews, accordions & related recommendations.
 */

import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { siteData, BLOUSE_SIZES, ProductItem } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { SizeChartModal } from '../components/SizeChartModal.tsx';
import { ProductCard } from '../components/ProductCard.tsx';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  Check,
  Phone,
  Ruler,
  Plus,
  Minus,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, setBuyNowItem, t, language } = useStore();

  const product = useMemo(() => {
    return siteData.products.find((p) => p.id === id || p.slug === id);
  }, [id]);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // Pincode checker state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid: boolean;
    deliveryDate: string;
  } | null>(null);

  // Accordions open/close
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    care: false,
    shipping: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#FAF6F0]">
        <h2 className="font-serif text-2xl font-bold text-[#1E1A24] mb-2">Saree Not Found</h2>
        <p className="text-xs text-gray-500 mb-6">The requested saree could not be found in our collection.</p>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-full bg-[#4A1D4F] text-white text-xs font-semibold"
        >
          Browse All 18 Sarees
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const viewLabels = [
    '1. Full Drape',
    '2. Pallu & Zari',
    '3. Fabric Macro',
    '4. Styled Look',
  ];

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, selectedColor, quantity, true);
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    const buyItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    setBuyNowItem(buyItem);
    navigate('/checkout?buyNow=true');
  };

  // Pincode validation
  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      const date = new Date();
      date.setDate(date.getDate() + 4);
      const formattedDate = date.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setPincodeStatus({
        checked: true,
        valid: true,
        deliveryDate: formattedDate,
      });
    } else {
      setPincodeStatus({
        checked: true,
        valid: false,
        deliveryDate: '',
      });
    }
  };

  // WhatsApp order link
  const whatsappMessage = encodeURIComponent(
    `Hello Aarunya Heritage! I want to order the "${t(product.name)}" (₹${product.price.toLocaleString('en-IN')}) in size: ${selectedSize || 'Unstitched'}. Please guide me with delivery.`
  );
  const whatsappUrl = `https://wa.me/${siteData.brand.whatsappNumber}?text=${whatsappMessage}`;

  // Related products from same category or silk
  const relatedProducts = siteData.products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.fabric.en.includes('Silk')))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#4A1D4F]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#4A1D4F]">Shop</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-[#4A1D4F] capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#4A1D4F] font-semibold truncate max-w-xs">{t(product.name)}</span>
        </nav>

        {/* Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* LEFT SIDE: Main Image (and thumbnails only if multiple images exist) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Main Big Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-md border border-[#B8935A]/25">
              <ImageWithFallback
                src={product.image || product.images[activeImageIndex] || product.images[0]}
                alt={t(product.name)}
                style={{ objectPosition: 'center 25%' }}
                className="w-full h-full object-cover"
                fallbackText={t(product.name)}
              />

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.badge && (
                  <span className="bg-[#4A1D4F] text-[#FAF6F0] text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded shadow-md">
                    {product.badge}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-[#B8935A] text-white text-xs font-semibold px-2.5 py-1 rounded shadow-md">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all z-10 ${
                  isFavorited
                    ? 'bg-red-50 text-red-600 shadow-md'
                    : 'bg-white/80 text-gray-600 hover:text-red-500 hover:bg-white shadow-sm'
                }`}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>

              {/* Current view indicator pill (only shown if multiple images exist) */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-xs font-medium">
                  {viewLabels[activeImageIndex] || `View ${activeImageIndex + 1}`}
                </div>
              )}
            </div>

            {/* Thumbnails (Only rendered if more than 1 image exists, otherwise hidden) */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {product.images.map((imgUrl, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden bg-white transition-all text-left ${
                        isActive
                          ? 'border-2 border-[#4A1D4F] ring-2 ring-[#4A1D4F]/30 shadow-md'
                          : 'border border-[#B8935A]/30 opacity-75 hover:opacity-100 hover:border-[#4A1D4F]/50'
                      }`}
                    >
                      <ImageWithFallback
                        src={imgUrl}
                        alt={`${t(product.name)} thumbnail ${idx + 1}`}
                        style={{ objectPosition: 'center 25%' }}
                        className="w-full h-full object-cover"
                        fallbackText={viewLabels[idx]}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/70 py-0.5 px-1 text-center">
                        <span className="text-[9px] text-[#FAF6F0] font-medium truncate block">
                          {viewLabels[idx]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            
            {/* Category & Title */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B8935A] font-semibold mb-1">
                <span>{product.category}</span>
                <span>·</span>
                <span>{t(product.fabric)}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1A24] leading-tight">
                {t(product.name)}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-2.5">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-xs font-semibold text-amber-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-gray-500">
                  Based on {product.reviewCount} verified heritage reviews
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-white border border-[#B8935A]/25 shadow-2xs">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#4A1D4F] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.price && (
                  <span className="text-sm text-gray-400 line-through tabular-nums">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({discountPercent}%)
                  </span>
                )}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                Inclusive of all taxes · Silk Mark & Handloom Guild Authenticity Certified
              </div>
            </div>

            {/* Description (2-3 paragraphs, premium tone) */}
            <div className="text-xs sm:text-sm text-[#1E1A24]/85 leading-relaxed space-y-2">
              {product.description.en.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Selected Shade: <span className="text-[#4A1D4F] font-bold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        selectedColor === color.name
                          ? 'border-[#4A1D4F] bg-[#4A1D4F]/5 ring-1 ring-[#4A1D4F]'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Blouse Size Selector (Pill Buttons) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Blouse Size <span className="text-red-500">*</span>
                </div>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="flex items-center gap-1 text-xs text-[#4A1D4F] hover:text-[#B8935A] font-semibold underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {BLOUSE_SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all shadow-2xs ${
                        isSelected
                          ? 'bg-[#4A1D4F] text-white shadow-sm ring-2 ring-[#4A1D4F]/30'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-[#4A1D4F] hover:bg-[#F3E6EA]/30'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Inline size error if user tries to click Add to Cart or Buy Now without size */}
              {sizeError && (
                <p className="text-xs text-red-600 font-medium mt-1.5 animate-shake">
                  ⚠ Please select a blouse size or "Unstitched blouse piece" before adding to bag.
                </p>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-200 rounded-full bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 text-xs transition-colors rounded-l-full"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-[#1E1A24] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 text-xs transition-colors rounded-r-full"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart (Outlined) & Buy Now (Solid Dark) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="py-3 px-6 rounded-full border-2 border-[#4A1D4F] text-[#4A1D4F] hover:bg-[#F3E6EA] text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 px-6 rounded-full bg-[#4A1D4F] hover:bg-[#3B153F] text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:translate-y-[-1px]"
              >
                <Zap className="w-4 h-4 text-[#B8935A]" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Order on WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-[#1E1A24] hover:bg-black text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Order on WhatsApp with Personal Concierge</span>
            </a>

            {/* Pincode Delivery Check */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 text-xs">
              <div className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-[#4A1D4F]" />
                <span>Check Delivery & Pincode Availability</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 411001)"
                  className="flex-1 bg-[#FAF6F0] border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#4A1D4F]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#4A1D4F] text-white rounded-lg font-medium hover:bg-[#3B153F] text-xs"
                >
                  Check
                </button>
              </form>

              {pincodeStatus?.checked && (
                <div className="mt-2.5">
                  {pincodeStatus.valid ? (
                    <div className="text-emerald-700 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>
                        Delivery guaranteed by <strong>{pincodeStatus.deliveryDate}</strong>. Complimentary express shipping available.
                      </span>
                    </div>
                  ) : (
                    <div className="text-red-600">
                      Please enter a valid 6-digit Indian postal pincode.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Small Trust Row */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#B8935A]/20 text-center text-[11px] text-gray-600">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#4A1D4F]" />
                <span>Free Insured Transit</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#4A1D4F]" />
                <span>7-Day Easy Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#4A1D4F]" />
                <span>100% Genuine Silk</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200 text-xs">
              
              {/* Product Details Accordion */}
              <div>
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-3.5 flex justify-between items-center text-left font-semibold text-[#1E1A24] hover:text-[#4A1D4F]"
                >
                  <span>Product Specifications & Weave Details</span>
                  {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.details && (
                  <div className="pb-4 space-y-2 text-gray-600 animate-fade-in">
                    {product.details.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-gray-100">
                        <span className="font-medium text-gray-500">{t(item.label)}</span>
                        <span className="font-semibold text-gray-800 text-right">{t(item.value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Care Instructions Accordion */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-3.5 flex justify-between items-center text-left font-semibold text-[#1E1A24] hover:text-[#4A1D4F]"
                >
                  <span>Wash Care & Zari Preservation</span>
                  {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.care && (
                  <div className="pb-4 text-gray-600 leading-relaxed animate-fade-in">
                    <p>{t(product.careInstructions)}</p>
                    <p className="mt-2 text-gray-500">
                      Always store your pure zari silk sarees wrapped in a soft white muslin cloth. Avoid plastic bags or hanging for long durations.
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping and Returns Accordion */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-3.5 flex justify-between items-center text-left font-semibold text-[#1E1A24] hover:text-[#4A1D4F]"
                >
                  <span>Shipping, Insurance & 7-Day Returns</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.shipping && (
                  <div className="pb-4 text-gray-600 leading-relaxed animate-fade-in space-y-2">
                    <p>
                      <strong>Complimentary Express Shipping:</strong> Orders above ₹3,000 qualify for free insured express delivery across all serviceable pincodes in India.
                    </p>
                    <p>
                      <strong>Hassle-Free Returns:</strong> We offer a 7-day doorstep return and exchange policy from the date of delivery. Saree must be unworn with original tags intact.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION BELOW */}
        <section className="mt-16 sm:mt-24 pt-12 border-t border-[#B8935A]/25 bg-white p-6 sm:p-10 rounded-2xl shadow-2xs">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1A24] text-center mb-8">
              Customer Reviews & Ratings
            </h3>

            {/* Scorecard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-[#FAF6F0] mb-8 items-center border border-[#B8935A]/20">
              <div className="text-center md:border-r border-gray-200 pr-4">
                <div className="font-serif text-5xl font-bold text-[#4A1D4F]">
                  {product.rating}
                </div>
                <div className="flex justify-center gap-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-gray-500">Based on {product.reviewCount} customer reviews</div>
              </div>

              <div className="col-span-2 space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-12">5 Star</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4A1D4F] h-full w-[88%]" />
                  </div>
                  <span className="w-8 text-right font-medium">88%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12">4 Star</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4A1D4F] h-full w-[10%]" />
                  </div>
                  <span className="w-8 text-right font-medium">10%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12">3 Star</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4A1D4F] h-full w-[2%]" />
                  </div>
                  <span className="w-8 text-right font-medium">2%</span>
                </div>
              </div>
            </div>

            {/* 3 Sample Customer Reviews */}
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-gray-100 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs text-[#1E1A24]">Shalini V. — Verified Buyer</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  "The drape and weight are truly royal. The gold zari doesn't itch or snag, and the color matches the pictures accurately. Beautiful packaging as well!"
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs text-[#1E1A24]">Dr. Kavita Joshi — Verified Buyer</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  "Wore this for Diwali puja and received countless compliments. The handloom weave has an authentic character that synthetic replicas simply cannot match."
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs text-[#1E1A24]">Pooja M. — Verified Buyer</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  "Prompt delivery to Pune within 3 days. The unstitched blouse piece had ample length for a designer blouse pattern. Very satisfied!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* "YOU MAY ALSO LIKE" CAROUSEL */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
                  Complementary Drapes
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1A24]">
                  You May Also Like
                </h3>
              </div>
              <Link
                to={`/category/${product.category}`}
                className="text-xs font-semibold text-[#4A1D4F] hover:underline"
              >
                More in {product.category} →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Blouse Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />
    </div>
  );
};
