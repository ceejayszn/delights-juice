'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Check, Copy, Flame, ArrowRight, ShieldCheck, Clock, Star, HeartPulse } from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';

export default function Hero({ onOpenMpesa }) {
  const [copied, setCopied] = useState(false);

  const copyTill = () => {
    navigator.clipboard.writeText(STORE_INFO.mpesaTill);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:py-20 border-b border-gray-200 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & Till Card */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>100% Raw • Hydraulic Cold-Pressed • Unpasteurized</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
              Nourish Your Body With <br />
              <span className="text-red-600 font-black">
                Raw Cold-Pressed Juices
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the purest form of fruit nutrition. Extracted fresh daily using hydraulic cold-press technology with <strong className="text-red-700 font-bold">zero added sugar</strong> and <strong className="text-red-700 font-bold">zero preservatives</strong>.
            </p>

            {/* M-PESA Till Copy & Quick Pay Banner */}
            <div className="bg-white p-5 rounded-2xl max-w-xl mx-auto lg:mx-0 border border-gray-200 shadow-sm relative">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                    <img src="/images/mpesa.png" alt="M-PESA" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Official M-PESA Till</span>
                    <span className="text-2xl font-black text-red-700 tracking-wider">
                      {STORE_INFO.mpesaTill}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={copyTill}
                    className="flex-1 sm:flex-initial bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors border border-gray-300"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                    <span>{copied ? 'Copied!' : 'Copy Till'}</span>
                  </button>
                  <button
                    onClick={onOpenMpesa}
                    className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors border border-red-700"
                  >
                    <span>Pay Till</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: See Menu & M-PESA Green Button Side-by-Side */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#juices"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-base px-6 py-3 rounded-lg shadow-sm transition-all text-center flex items-center justify-center space-x-2"
              >
                <span className="emoji-apple">🍹</span>
                <span>See Menu</span>
              </a>

              <button
                onClick={onOpenMpesa}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-6 py-3 rounded-lg transition-all text-center flex items-center justify-center space-x-2 shadow-sm border border-emerald-700"
              >
                <img src="/images/mpesa.png" alt="M-PESA" className="w-6 h-6 object-contain" />
                <span>Pay Till</span>
              </button>

              <Link
                href="/pos"
                className="w-full sm:w-auto bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 font-bold text-base px-5 py-3 rounded-lg transition-all text-center flex items-center justify-center space-x-2 shadow-sm"
              >
                <Flame className="w-4 h-4 text-red-600" />
                <span>POS</span>
              </Link>
            </div>

            {/* Feature Perks */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-300/60 max-w-lg mx-auto lg:mx-0 text-center">
              <div className="space-y-1 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-red-600 mx-auto" />
                <span className="text-xs font-bold text-gray-800 block">100% Cold-Pressed</span>
              </div>
              <div className="space-y-1 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <HeartPulse className="w-5 h-5 text-red-600 mx-auto" />
                <span className="text-xs font-bold text-gray-800 block">Zero Added Sugar</span>
              </div>
              <div className="space-y-1 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <Clock className="w-5 h-5 text-red-800 mx-auto" />
                <span className="text-xs font-bold text-gray-800 block">Live Store POS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88">
              
              {/* Product Visual Card */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-300 shadow-md bg-gray-900 flex items-center justify-center group">
                <img
                  src="/images/2fd (5).jpg"
                  alt="Pash Signature Juice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Special Badge */}
                <div className="absolute top-4 right-4 bg-amber-400 text-gray-900 font-extrabold text-xs px-3 py-1 rounded-lg shadow flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-current text-red-700" />
                  <span>BOBBA SPECIAL JUICE</span>
                </div>

                {/* Bottom Solid Overlay Label (No Gradients) */}
                <div className="absolute bottom-0 inset-x-0 bg-gray-950/90 border-t border-gray-800 p-5 text-left">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Cold-Pressed Hero</span>
                      <h3 className="text-xl font-bold text-white">Bobba Special Juice</h3>
                      <p className="text-xs text-gray-300 font-medium">Lime · Zesty Ginger · Organic Sugarcane</p>
                    </div>
                    <span className="text-sm font-black text-white bg-red-700 px-3 py-1 rounded-lg border border-red-600">
                      70 / 100 BOB
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}



