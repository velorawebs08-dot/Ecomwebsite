/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Navbar.tsx - Solid ivory #FAF6F0 navbar strip (72px, sticky top)
 * 3-zone layout (1fr auto 1fr):
 * - Left side: Home, Shop (40px spacing)
 * - Center: Perfectly centered logo "Aarunya Heritage" with gold tagline
 * - Right side: About, Contact (40px spacing) + search, wishlist, account, plum cart circle
 * - Mobile: Hamburger on left, Logo centered, Search & Cart on right. Mobile panel with EN / मराठी toggle.
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext.tsx';
import { siteData } from '../data/siteData.ts';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  Globe,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsDrawerOpen,
    t,
    language,
    setLanguage,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' && (!location.search || location.search === '');
    }
    if (path === '/shop') {
      return location.pathname === '/shop' && (!location.search || location.search === '');
    }
    if (path.includes('?')) {
      return (location.pathname + location.search) === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-[#FAF6F0] h-[72px] transition-shadow duration-300 border-b border-black/[0.06] flex items-center ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP LAYOUT: Logo far left, Nav links in middle (40px spacing), Action icons on right */}
        <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center h-[72px] w-full">
          
          {/* Far Left: Logo and Tagline */}
          <div className="flex items-center justify-start pr-6">
            <Link
              to="/"
              className="group flex flex-col items-start text-left outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1D4F]/30 rounded-sm"
            >
              <span className="font-serif text-2xl xl:text-3xl font-semibold tracking-wider text-[#4A1D4F] group-hover:text-[#3B153F] transition-colors leading-none whitespace-nowrap">
                {siteData.brand.name}
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#B8935A] font-medium mt-1 leading-none whitespace-nowrap">
                {t(siteData.brand.tagline)}
              </span>
            </Link>
          </div>

          {/* Center: Home, Shop, About, Contact (40px spacing) */}
          <nav className="flex items-center justify-center gap-[40px]">
            {siteData.navLinks.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-sans text-[14px] font-medium tracking-[0.02em] transition-colors py-1 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1D4F]/30 rounded-sm whitespace-nowrap group ${
                    active ? 'text-[#4A1D4F]' : 'text-[#1E1A24] hover:text-[#4A1D4F]'
                  }`}
                >
                  <span>{t(item.label)}</span>
                  {active ? (
                    <span className="absolute bottom-[-6px] left-0 right-0 h-[1.5px] bg-[#4A1D4F] rounded-full pointer-events-none" />
                  ) : (
                    <span className="absolute bottom-[-6px] left-0 w-0 h-[1.5px] bg-[#B8935A] rounded-full transition-all duration-250 ease-out group-hover:w-full pointer-events-none" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Far Right: Search, Wishlist, Account + Filled Plum Cart Circle */}
          <div className="flex items-center justify-end gap-2 pl-4 border-l border-black/10">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-[#B8935A]/50 rounded-full pl-3 pr-1 py-1 shadow-md w-60 sm:w-72 z-50 animate-fade-in"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'mr' ? 'साडी, रेशीम शोधा...' : 'Search sarees, silks...'}
                    autoFocus
                    className="w-full text-xs bg-transparent outline-none text-[#1E1A24] placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="p-1.5 text-[#4A1D4F] hover:bg-[#F3E6EA] rounded-full transition-colors cursor-pointer"
                    aria-label="Execute search"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-[#1E1A24] rounded-full transition-colors cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-[#1E1A24] hover:text-[#4A1D4F] transition-colors rounded-full hover:bg-[#F3E6EA]/40 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1D4F]/30 cursor-pointer"
                  aria-label="Open search input"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/shop?wishlist=true"
              className="p-2 text-[#1E1A24] hover:text-[#4A1D4F] transition-colors rounded-full hover:bg-[#F3E6EA]/40 relative outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1D4F]/30"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#4A1D4F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/checkout"
              className="p-2 text-[#1E1A24] hover:text-[#4A1D4F] transition-colors rounded-full hover:bg-[#F3E6EA]/40 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1D4F]/30"
              aria-label="Account and orders"
              title="Track Orders"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Filled Plum Cart Circle */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-10 h-10 bg-[#4A1D4F] hover:bg-[#5E2564] text-white rounded-full transition-all relative flex items-center justify-center shadow-sm cursor-pointer outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1D4F]/30 ml-1"
              aria-label={`Open shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B8935A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE LAYOUT: Logo left, Search, Cart and Hamburger on the right */}
        <div className="lg:hidden flex items-center justify-between h-[72px]">
          {/* Logo on the left */}
          <Link
            to="/"
            className="group flex flex-col items-start text-left outline-none focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-[#4A1D4F] leading-none">
              {siteData.brand.name}
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#B8935A] font-medium mt-0.5 leading-none">
              {t(siteData.brand.tagline)}
            </span>
          </Link>

          {/* Search, Cart, Hamburger on the right */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#1E1A24] hover:text-[#4A1D4F] transition-colors rounded-full outline-none"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-9 h-9 bg-[#4A1D4F] text-white rounded-full flex items-center justify-center relative shadow-sm outline-none"
              aria-label={`Open shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B8935A] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1E1A24] hover:text-[#4A1D4F] transition-colors rounded-lg outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1D4F]/30"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input popup */}
        {searchOpen && (
          <div className="lg:hidden py-2 pb-3 border-t border-gray-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'साड्या शोधा...' : 'Search sarees, silks...'}
                autoFocus
                className="w-full text-xs bg-white border border-[#B8935A]/30 rounded-full pl-4 pr-10 py-2 outline-none text-[#1E1A24]"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A1D4F]"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Slide-down Panel (with all 6 links and EN / मराठी toggle) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[72px] inset-x-0 bg-[#FAF6F0] border-b border-[#B8935A]/25 shadow-xl py-6 px-6 z-50 animate-slide-down">
          <nav className="flex flex-col space-y-1 mb-6">
            {siteData.navLinks.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-3 rounded-lg font-sans text-sm font-medium tracking-[0.02em] transition-colors flex items-center justify-between ${
                    active
                      ? 'text-[#4A1D4F] bg-[#F3E6EA]/60 font-semibold'
                      : 'text-[#1E1A24] hover:bg-[#F3E6EA]/30'
                  }`}
                >
                  <span>{t(item.label)}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#4A1D4F]" />}
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher in Mobile Menu */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-[#1E1A24]">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#B8935A]" />
              <span className="font-medium">Language / भाषा:</span>
            </div>
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-gray-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  language === 'en' ? 'bg-[#4A1D4F] text-white shadow-xs' : 'text-gray-600 hover:text-[#4A1D4F]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  language === 'mr' ? 'bg-[#4A1D4F] text-white shadow-xs' : 'text-gray-600 hover:text-[#4A1D4F]'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide down animation helper */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </header>
  );
};
