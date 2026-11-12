/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ShopPage.tsx - Product catalog with left filter drawer, 4-column grid, sort, search & wishlist view
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from '../components/ProductCard.tsx';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Sparkles,
  Heart,
  ChevronDown,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { t, language, wishlist, searchQuery, setSearchQuery } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [selectedFabric, setSelectedFabric] = useState<string>(
    searchParams.get('fabric') || 'all'
  );
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'popular');
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(
    searchParams.get('wishlist') === 'true'
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync from URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const fab = searchParams.get('fabric');
    if (fab) setSelectedFabric(fab);
    const wish = searchParams.get('wishlist');
    if (wish === 'true') setShowWishlistOnly(true);
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams, setSearchQuery]);

  // Unique fabrics and colors from all 18 products
  const fabrics = useMemo(() => {
    const list = new Set<string>();
    siteData.products.forEach((p) => list.add(t(p.fabric)));
    return Array.from(list);
  }, [t]);

  const colors = useMemo(() => {
    const list = new Map<string, string>();
    siteData.products.forEach((p) => {
      p.colors.forEach((c) => {
        if (!list.has(c.name)) list.set(c.name, c.hex);
      });
    });
    return Array.from(list.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return siteData.products.filter((p) => {
      // Wishlist only
      if (showWishlistOnly && !wishlist.includes(p.id)) return false;

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Fabric
      if (selectedFabric !== 'all' && t(p.fabric) !== selectedFabric) return false;

      // Price
      if (p.price > maxPrice) return false;

      // Color
      if (
        selectedColor !== 'all' &&
        !p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))
      ) {
        return false;
      }

      // Live search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = t(p.name).toLowerCase().includes(query);
        const descMatch = t(p.description).toLowerCase().includes(query);
        const fabricMatch = t(p.fabric).toLowerCase().includes(query);
        const catMatch = p.category.toLowerCase().includes(query);
        if (!nameMatch && !descMatch && !fabricMatch && !catMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'new') {
        if (a.badge === 'New' && b.badge !== 'New') return -1;
        if (b.badge === 'New' && a.badge !== 'New') return 1;
        return 0;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // Default: preserve the exact category order (Silk, Cotton, Georgette, Kanjivaram, Party Wear, Handloom)
      return 0;
    });
  }, [
    selectedCategory,
    selectedFabric,
    maxPrice,
    selectedColor,
    searchQuery,
    sortBy,
    showWishlistOnly,
    wishlist,
    t,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFabric('all');
    setMaxPrice(15000);
    setSelectedColor('all');
    setSortBy('popular');
    setShowWishlistOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedFabric !== 'all' ? 1 : 0) +
    (maxPrice < 15000 ? 1 : 0) +
    (selectedColor !== 'all' ? 1 : 0) +
    (showWishlistOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const currentCategoryData = siteData.categories.find(
    (c) => c.slug === selectedCategory
  );

  const pageTitle = showWishlistOnly
    ? (language === 'mr' ? 'माझी आवडती यादी' : 'My Saved Sarees')
    : currentCategoryData
    ? (language === 'mr' ? `${t(currentCategoryData.name)} साड्या` : `${t(currentCategoryData.name)} Sarees`)
    : (language === 'mr' ? 'शाही साड्यांचे दालन' : 'The Heritage Saree Collection');

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <nav className="text-xs text-gray-500 mb-2">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-[#4A1D4F] font-medium">
              {showWishlistOnly
                ? (language === 'mr' ? 'माझी आवडती यादी' : 'My Wishlist')
                : currentCategoryData
                ? t(currentCategoryData.name)
                : (language === 'mr' ? 'सर्व साड्या' : 'All Sarees')}
            </span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1A24]">
                {pageTitle}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'mr'
                  ? `एकूण १८ पैकी ${filteredProducts.length} साड्या उपलब्ध`
                  : `Showing ${filteredProducts.length} of 18 mastercrafted sarees`}
              </p>
            </div>

            {/* Quick Wishlist Toggle & Mobile Filter Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  showWishlistOnly
                    ? 'bg-red-50 text-red-600 border border-red-200 shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-current' : ''}`} />
                <span>{language === 'mr' ? 'आवडती यादी' : 'Wishlist'} ({wishlist.length})</span>
              </button>

              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A1D4F] text-white text-xs font-medium shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar: Live search input & Sort */}
        <div className="bg-white p-4 rounded-xl border border-[#B8935A]/20 shadow-2xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Live Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'नाव, कापड किंवा प्रकाराने शोधा...' : 'Search by name, fabric, or weave...'}
              className="w-full bg-[#FAF6F0] border border-gray-200 rounded-full pl-9 pr-8 py-2 text-xs text-[#1E1A24] outline-none focus:border-[#4A1D4F]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-gray-500 whitespace-nowrap">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#FAF6F0] border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-xs font-medium text-[#1E1A24] outline-none cursor-pointer focus:border-[#4A1D4F]"
              >
                <option value="popular">Recommended / Rating</option>
                <option value="new">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Grid with Left Sidebar Filters */}
        <div className="flex gap-8 items-start">
          
          {/* Left Desktop Filter Panel */}
          <aside className="hidden lg:block w-64 shrink-0 bg-white p-5 rounded-2xl border border-[#B8935A]/20 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#4A1D4F]" />
                <h3 className="font-serif text-base font-semibold text-[#1E1A24]">Filters</h3>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[11px] text-[#4A1D4F] hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2.5">
                Category
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#4A1D4F] text-white'
                      : 'text-gray-600 hover:bg-[#F3E6EA]/50'
                  }`}
                >
                  All Sarees ({siteData.products.length})
                </button>
                {siteData.categories.map((cat) => {
                  const count = siteData.products.filter((p) => p.category === cat.slug).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-[#4A1D4F] text-white'
                          : 'text-gray-600 hover:bg-[#F3E6EA]/50'
                      }`}
                    >
                      <span>{t(cat.name)}</span>
                      <span className="text-[10px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fabric Filter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2.5">
                Fabric
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                <button
                  onClick={() => setSelectedFabric('all')}
                  className={`w-full text-left px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedFabric === 'all'
                      ? 'bg-[#4A1D4F] text-white'
                      : 'text-gray-600 hover:bg-[#F3E6EA]/50'
                  }`}
                >
                  All Fabrics
                </button>
                {fabrics.map((fab) => (
                  <button
                    key={fab}
                    onClick={() => setSelectedFabric(fab)}
                    className={`w-full text-left px-2.5 py-1 rounded-lg text-xs font-medium transition-colors truncate ${
                      selectedFabric === fab
                        ? 'bg-[#4A1D4F] text-white'
                        : 'text-gray-600 hover:bg-[#F3E6EA]/50'
                    }`}
                  >
                    {fab}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Max Price
                </h4>
                <span className="text-xs font-bold text-[#4A1D4F] tabular-nums">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1499"
                max="15000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#4A1D4F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹1,499</span>
                <span>₹15,000</span>
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2.5">
                Color Palette
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedColor('all')}
                  className={`px-2 py-1 rounded text-[11px] font-medium border ${
                    selectedColor === 'all'
                      ? 'bg-[#4A1D4F] text-white border-[#4A1D4F]'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  All
                </button>
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(selectedColor === c.name ? 'all' : c.name)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border transition-transform ${
                      selectedColor === c.name
                        ? 'ring-2 ring-[#4A1D4F] scale-110'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area (4 cols desktop, 2 cols mobile) */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#B8935A]/20 shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-[#F3E6EA] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#4A1D4F]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1E1A24] mb-2">
                  {language === 'mr' ? 'कोणतीही साडी सापडली नाही' : 'No Sarees Match Your Filters'}
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                  {language === 'mr'
                    ? 'कृपया आपले फिल्टर्स बदला किंवा सर्व साड्या पाहण्यासाठी रिसेट बटण दाबा.'
                    : 'Try broadening your search query or reset filters to explore all 18 authentic handloom drapes.'}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#4A1D4F] text-white text-xs font-medium hover:bg-[#3B153F] transition-all shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto z-10 animate-slide-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-serif text-lg font-bold text-[#4A1D4F]">Filter Sarees</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-black rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div className="mt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Category
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`py-1.5 px-2 text-xs rounded-lg text-center ${
                      selectedCategory === 'all'
                        ? 'bg-[#4A1D4F] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    All Sarees
                  </button>
                  {siteData.categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`py-1.5 px-2 text-xs rounded-lg text-center truncate ${
                        selectedCategory === c.slug
                          ? 'bg-[#4A1D4F] text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {t(c.name)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold uppercase text-gray-700">Max Price</span>
                  <span className="font-bold text-[#4A1D4F]">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1499"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#4A1D4F]"
                />
              </div>

              {/* Colors */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Color
                </h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(selectedColor === c.name ? 'all' : c.name)}
                      className={`w-7 h-7 rounded-full border ${
                        selectedColor === c.name ? 'ring-2 ring-[#4A1D4F]' : 'border-black/20'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-gray-100 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-full bg-[#4A1D4F] text-white text-xs font-semibold"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-medium"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
