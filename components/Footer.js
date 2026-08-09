'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Store } from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-100 pt-14 pb-16 border-t border-gray-800" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-red-600 bg-red-50 p-1 shadow-md">
                <img
                  src="/favicon.jpg"
                  alt="PASH JUICES"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/2fd (5).jpg';
                  }}
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight flex items-center space-x-1.5">
                  <span>PASH JUICES</span>
                  <span className="emoji-apple text-lg">🍹</span>
                </span>
                <span className="block text-[11px] text-amber-400 font-extrabold uppercase tracking-wider">
                  100% Raw Cold-Pressed
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              Hydraulic cold-pressed unpasteurized fruit juices, smoothies, herbal elixirs, Simba Sticks ice cream & Lyons Maid ice pops squeezed fresh daily with zero added sugar.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30 flex items-center space-x-1.5">
                <span className="emoji-apple">⚡</span>
                <span>Living Enzymes</span>
              </span>
              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30 flex items-center space-x-1.5">
                <span className="emoji-apple">🍃</span>
                <span>Zero Sugar</span>
              </span>
            </div>
          </div>

          {/* Col 2: Operating Hours with iPhone Emojis */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-2.5 flex items-center space-x-2">
              <span className="emoji-apple text-base">⏰</span>
              <span>Store Hours</span>
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-semibold">
              <li className="flex justify-between items-center bg-gray-900/80 p-2.5 rounded-lg border border-gray-800">
                <span className="flex items-center space-x-2">
                  <span className="emoji-apple">📅</span>
                  <span>Monday - Saturday:</span>
                </span>
                <span className="font-black text-amber-400">7:30 AM - 8:30 PM</span>
              </li>
              <li className="flex justify-between items-center bg-gray-900/80 p-2.5 rounded-lg border border-gray-800">
                <span className="flex items-center space-x-2">
                  <span className="emoji-apple">🌟</span>
                  <span>Sunday & Holidays:</span>
                </span>
                <span className="font-bold text-white">9:00 AM - 7:00 PM</span>
              </li>
              <li className="pt-1 text-xs text-emerald-400 font-bold flex items-center space-x-1.5">
                <span className="emoji-apple">🚀</span>
                <span>Express Pickup & Fast Delivery</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location with iPhone Emojis */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-2.5 flex items-center space-x-2">
              <span className="emoji-apple text-base">📍</span>
              <span>Location & Ordering</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-2.5 text-gray-300 hover:text-emerald-400 transition-colors group bg-gray-900/80 p-2.5 rounded-lg border border-gray-800"
              >
                <span className="emoji-apple text-lg">🗺️</span>
                <span>
                  Pash Juices Store Directions <br />
                  <strong className="text-white group-hover:underline text-xs flex items-center space-x-1 mt-0.5">
                    <span>Open Google Maps Pin</span>
                    <span className="emoji-apple text-xs">➔</span>
                  </strong>
                </span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex items-center space-x-2.5 text-gray-300 hover:text-emerald-400 transition-colors bg-gray-900/80 p-2.5 rounded-lg border border-gray-800"
              >
                <span className="emoji-apple text-lg">📞</span>
                <span>Order Hotline: <strong className="text-white font-black">{STORE_INFO.phone}</strong></span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20Pash%20Juices,%20I%20would%20like%20to%20place%20an%20order!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/60 font-bold"
              >
                <span className="emoji-apple text-lg">💬</span>
                <span>Order on WhatsApp Hotline</span>
              </a>
            </div>
          </div>

          {/* Col 4: Official M-PESA Till & Staff Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-2.5 flex items-center space-x-2">
              <span className="emoji-apple text-base">💳</span>
              <span>M-PESA Till & Staff POS</span>
            </h4>
            
            {/* Till Box */}
            <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-2">
              <div className="text-[11px] font-bold text-gray-400 uppercase flex items-center space-x-1.5">
                <span className="emoji-apple">📲</span>
                <span>Official M-PESA Buy Goods</span>
              </div>
              <div className="flex items-center justify-between bg-black px-3 py-2 rounded-lg border border-gray-700">
                <span className="text-amber-400 font-extrabold text-xs">TILL NUMBER:</span>
                <span className="text-white font-black font-mono text-base tracking-widest">{STORE_INFO.mpesaTill}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/pos"
                className="inline-flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs px-3.5 py-2.5 rounded-lg transition-colors border border-red-700 shadow-sm"
              >
                <span className="emoji-apple">🏬</span>
                <span>Open Counter POS Terminal</span>
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-red-400 font-bold text-xs px-3.5 py-2 rounded-lg transition-colors border border-gray-800"
              >
                <span className="emoji-apple">📊</span>
                <span>Executive Admin Dashboard</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Apple Emojis */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 space-y-3 sm:space-y-0 font-medium">
          <div className="flex items-center space-x-2">
            <span className="emoji-apple">🍹</span>
            <span>© {new Date().getFullYear()} PASH JUICES. All rights reserved. Buy Goods Till <strong className="text-amber-400 font-bold">{STORE_INFO.mpesaTill}</strong>.</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300 font-bold">
            <span className="flex items-center space-x-1">
              <span className="emoji-apple">🍊</span>
              <span>100% Raw</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span className="emoji-apple">❄️</span>
              <span>Cold-Pressed</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span className="emoji-apple">🌿</span>
              <span>Zero Sugar</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}



