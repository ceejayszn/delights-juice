'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Store, Phone, Copy, Check, Menu, X, Sparkles } from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';

export default function Navbar({ cartCount = 0, onOpenCart, onOpenMpesa }) {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyTill = () => {
    navigator.clipboard.writeText(STORE_INFO.mpesaTill);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Top Banner Ticker with Big iPhone Emojis */}
      <div className="bg-gray-950 text-gray-100 py-2 px-4 text-xs font-bold flex flex-wrap items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-xs font-bold tracking-wide flex items-center space-x-2 border border-red-500/30">
            <span className="emoji-apple">🍹</span>
            <span>100% RAW • HYDRAULIC COLD-PRESSED • UNPASTEURIZED</span>
          </span>
          <span className="hidden lg:inline text-amber-400 font-semibold text-xs flex items-center space-x-1">
            <span className="emoji-apple">⚡</span>
            <span>Zero Added Sugar • Living Enzyme Juices</span>
          </span>
        </div>

        <div className="flex items-center space-x-3 mx-auto sm:mx-0 mt-1.5 sm:mt-0">
          <button
            onClick={copyTill}
            className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded-lg transition-colors text-xs font-bold border border-gray-700 shadow-sm"
            title="Click to copy M-PESA Till"
          >
            <span className="emoji-apple">💳</span>
            <span className="text-amber-400 font-extrabold">M-PESA Till:</span>
            <span className="text-white font-black tracking-wider font-mono text-sm">{STORE_INFO.mpesaTill}</span>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
          </button>

          <button
            onClick={onOpenMpesa}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-extrabold transition-colors border border-emerald-700 shadow-sm"
          >
            <img src="/images/mpesa.png" alt="M-PESA" className="w-4 h-4 object-contain" />
            <span>Pay Till</span>
          </button>

          <Link
            href="/pos"
            className="hidden md:flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors border border-red-700 shadow-sm"
          >
            <span className="emoji-apple">🏬</span>
            <span>POS Terminal</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 border-b-2 border-gray-950 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-red-600 bg-red-50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <img
                src="/favicon.jpg"
                alt="PASH JUICES"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/2fd (5).jpg';
                }}
              />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-red-600 transition-colors flex items-center space-x-1">
                <span>PASH</span>
                <span className="text-red-600 font-extrabold">JUICES</span>
              </span>
              <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider -mt-1">
                100% Raw • Cold-Pressed • Natural
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links with Big iPhone Emojis */}
          <div className="hidden md:flex items-center space-x-1 text-sm font-bold text-gray-800">
            <a
              href="#juices"
              className="px-3.5 py-2 rounded-lg hover:bg-gray-100 hover:text-red-700 transition-colors flex items-center space-x-2"
            >
              <span className="emoji-apple">🍹</span>
              <span>Raw Juices</span>
            </a>

            <a
              href="#treats"
              className="px-3.5 py-2 rounded-lg hover:bg-gray-100 hover:text-red-700 transition-colors flex items-center space-x-2"
            >
              <span className="emoji-apple">🍦</span>
              <span>Cool Treats</span>
            </a>

            <a
              href="#benefits"
              className="px-3.5 py-2 rounded-lg hover:bg-gray-100 hover:text-red-700 transition-colors flex items-center space-x-2"
            >
              <span className="emoji-apple">🌿</span>
              <span>Benefits</span>
            </a>

            <Link
              href="/sketch"
              className="px-3.5 py-2 rounded-lg hover:bg-gray-100 hover:text-red-700 transition-colors flex items-center space-x-2"
            >
              <span className="emoji-apple">📓</span>
              <span>Store Journal</span>
            </Link>

            <Link
              href="/admin"
              className="px-3.5 py-2 rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors font-bold flex items-center space-x-2 border border-red-200"
            >
              <span className="emoji-apple">📊</span>
              <span>Executive Admin</span>
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Header Compact Green M-PESA Button */}
            <button
              onClick={onOpenMpesa}
              className="p-1.5 sm:p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-700 shadow-sm transition-all active:scale-95 flex items-center justify-center shrink-0"
              title="Pay Till via M-PESA"
            >
              <img src="/images/mpesa.png" alt="M-PESA" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            </button>
            {/* Phone Call */}
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="hidden lg:flex items-center space-x-2 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3.5 py-2 rounded-lg transition-colors shadow-sm"
            >
              <span className="emoji-apple">📞</span>
              <span>{STORE_INFO.phone}</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg border border-red-700 shadow-sm transition-all active:scale-95 text-sm"
            >
              <span className="emoji-apple">🛒</span>
              <span className="hidden sm:inline font-extrabold">Order Cart</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-gray-900 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 border border-gray-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Big iPhone Emojis */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-2 text-sm font-bold text-gray-800 shadow-xl">
            <a
              href="#juices"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 py-2.5 px-3 rounded-lg hover:bg-gray-100"
            >
              <span className="emoji-apple-lg">🍹</span>
              <span>Raw Cold-Pressed Juices</span>
            </a>

            <a
              href="#treats"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 py-2.5 px-3 rounded-lg hover:bg-gray-100"
            >
              <span className="emoji-apple-lg">🍦</span>
              <span>Simba Sticks & Lyons Maid Ice Pops</span>
            </a>

            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 py-2.5 px-3 rounded-lg hover:bg-gray-100"
            >
              <span className="emoji-apple-lg">🌿</span>
              <span>Hydraulic Cold-Pressed Process</span>
            </a>

            <Link
              href="/sketch"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 py-2.5 px-3 rounded-lg hover:bg-gray-100"
            >
              <span className="emoji-apple-lg">📓</span>
              <span>Store Journal</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 py-2.5 px-3 rounded-lg hover:bg-gray-100 text-red-700 font-bold"
            >
              <span className="emoji-apple-lg">📊</span>
              <span>Executive Admin Dashboard</span>
            </Link>

            <div className="pt-3 border-t border-gray-200">
              <Link
                href="/pos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 w-full bg-red-600 hover:bg-red-700 text-white justify-center py-3 rounded-lg font-bold shadow-sm text-sm"
              >
                <span className="emoji-apple-lg">🏬</span>
                <span>Open Live POS Terminal</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}



