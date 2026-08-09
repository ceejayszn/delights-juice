'use client';

import React from 'react';
import { Droplet, Sparkles, HeartPulse, Leaf, ShieldCheck } from 'lucide-react';

export default function ColdPressedBenefits() {
  const benefits = [
    {
      icon: Droplet,
      title: 'Hydraulic Cold-Pressed',
      desc: 'Thousands of pounds of pressure extract living juice without heat, preserving vitamins & active enzymes.',
      badge: 'Zero Heat',
    },
    {
      icon: HeartPulse,
      title: 'Zero Added Sugar',
      desc: '100% natural fruit sweetness only. Never diluted with water or artificial sweeteners.',
      badge: '100% Natural',
    },
    {
      icon: Leaf,
      title: 'Raw & Unpasteurized',
      desc: 'Pure living raw juices packed with natural antioxidants, micronutrients, and bio-available vitamins.',
      badge: 'Living Enzymes',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Preservatives',
      desc: 'No chemicals, additives, or artificial flavorings. Squeezed fresh daily for maximum bio-active vitality.',
      badge: 'Clean Nutrition',
    },
  ];

  return (
    <section id="benefits" className="py-16 border-b border-gray-800 bg-gray-900 text-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Pash Juices Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Cold-Pressed Raw Juices Are Superior
          </h2>
          <p className="text-base text-gray-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Traditional centrifugal blenders generate high friction heat that oxidizes delicate enzymes. Our hydraulic press gently squeezes living raw fruit, keeping 100% of nature&apos;s nutrition intact.
          </p>
        </div>

        {/* 4 Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-gray-800 text-gray-100 p-6 rounded-2xl border border-gray-700 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-500">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-xs font-bold bg-gray-700 border border-gray-600 px-2.5 py-0.5 rounded-lg text-gray-300">
                    {b.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{b.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-normal">{b.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Stat Counter Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gray-800 text-gray-100 border border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-3xl sm:text-4xl font-black text-red-500">100%</span>
            <span className="text-xs font-bold uppercase text-gray-400">Pure Raw Fruit</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-black text-amber-400">0g</span>
            <span className="text-xs font-bold uppercase text-gray-400">Added Refined Sugar</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-black text-emerald-400">5x</span>
            <span className="text-xs font-bold uppercase text-gray-400">More Enzyme Vitality</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-black text-sky-400">Live</span>
            <span className="text-xs font-bold uppercase text-gray-400">Store POS Receiver</span>
          </div>
        </div>

      </div>
    </section>
  );
}

