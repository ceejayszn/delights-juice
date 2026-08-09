'use client';

import React from 'react';
import { ShoppingBag, MessageCircle, Copy, ArrowUpRight } from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';

export default function MobileStickyBar({ cartCount, onOpenCart, onOpenMpesa }) {
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent('Hi Pash Juices! I would like to order raw cold-pressed juices.')}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 p-2 pb-3 shadow-lg text-xs font-bold">
      <div className="grid grid-cols-4 gap-1 text-center">
        {/* Order Now */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-red-600 text-white font-bold border border-red-700 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4 text-white" />
          <span className="mt-0.5">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow">
              {cartCount}
            </span>
          )}
        </button>

        {/* Pay M-PESA Till */}
        <button
          onClick={onOpenMpesa}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-gray-50 text-gray-900 font-bold border border-gray-300"
        >
          <Copy className="w-4 h-4 text-red-600" />
          <span className="mt-0.5">Till {STORE_INFO.mpesaTill}</span>
        </button>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-gray-50 text-gray-900 font-bold border border-gray-300"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span className="mt-0.5">WhatsApp</span>
        </a>

        {/* Juices Menu */}
        <a
          href="#juices"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-gray-50 text-gray-900 font-bold border border-gray-300"
        >
          <ArrowUpRight className="w-4 h-4 text-red-600" />
          <span className="mt-0.5">Menu</span>
        </a>
      </div>
    </div>
  );
}


