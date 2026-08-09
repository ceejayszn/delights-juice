'use client';

import React, { useState } from 'react';
import { MENU_ITEMS, ADDONS } from '@/lib/menuData';
import { Plus, Check, Sparkles, PlusCircle, Search, Zap, ShoppingBag } from 'lucide-react';

export default function MenuCatalog({ onAddToCart, onQuickOrder, onOpenMpesa }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState({}); // { itemId: 'large' | 'mid' }
  const [selectedAddons, setSelectedAddons] = useState({}); // { itemId: ['ginger', 'lime'] }

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const toggleAddon = (itemId, addonName) => {
    setSelectedAddons((prev) => {
      const current = prev[itemId] || [];
      if (current.includes(addonName)) {
        return { ...prev, [itemId]: current.filter((a) => a !== addonName) };
      } else {
        return { ...prev, [itemId]: [...current, addonName] };
      }
    });
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]" id="juices">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="inline-block bg-red-100 text-red-800 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          Pash Juices Collection
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          100% Raw Cold-Pressed <span className="text-red-600">Juices & Elixirs</span>
        </h2>
        <p className="text-gray-600 font-normal max-w-2xl mx-auto text-base leading-relaxed">
          Hydraulic cold-pressed daily with unpasteurized organic fruit, zero added sugar, and active living enzymes. Select your blend and size!
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative pt-2">
          <div className="relative">
            <Search className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search juices, smoothies, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10" id="wellness">
        {[
          { id: 'all', label: 'All Products' },
          { id: 'juices', label: 'Raw Juices' },
          { id: 'smoothies', label: 'Creamy Smoothies' },
          { id: 'wellness', label: 'Herbal Elixirs & Shots' },
          { id: 'treats', label: 'Cool Treats & Pops' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
              activeTab === tab.id
                ? 'bg-red-600 text-white border-red-700 shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isTreat = item.category === 'treats';
          const size = selectedSizes[item.id] || (isTreat ? 'single' : 'large');
          const price = isTreat ? item.prices.single : item.prices[size];
          const addons = selectedAddons[item.id] || [];

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Image Container - Full Edge to Edge */}
              <div className="relative h-64 sm:h-72 bg-gray-100 overflow-hidden border-b border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/2fd (5).jpg';
                  }}
                />
                
                {/* Badge Tag */}
                {item.tag && (
                  <div className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-400 text-gray-900 shadow">
                    {item.tag}
                  </div>
                )}

                {/* Price Display Badge */}
                <div className="absolute bottom-3 right-3 bg-red-700 text-white px-3 py-1 rounded-lg font-black text-lg border border-red-600 shadow">
                  {price} BOB
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-normal mt-1 leading-relaxed">{item.desc}</p>
                </div>

                {/* Size Selector for Juices */}
                {!isTreat && (
                  <div className="space-y-1.5 pt-2 border-t border-gray-200">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Select Cup Size:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => handleSizeChange(item.id, 'large')}
                        className={`py-2 px-2.5 rounded-lg font-bold border flex justify-between items-center transition-colors ${
                          size === 'large'
                            ? 'bg-red-600 text-white border-red-700'
                            : 'bg-gray-50 text-gray-800 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <span>Large (500ml)</span>
                        <span className={size === 'large' ? 'text-amber-200' : 'text-red-700 font-extrabold'}>{item.prices.large} BOB</span>
                      </button>

                      <button
                        onClick={() => handleSizeChange(item.id, 'mid')}
                        className={`py-2 px-2.5 rounded-lg font-bold border flex justify-between items-center transition-colors ${
                          size === 'mid'
                            ? 'bg-red-600 text-white border-red-700'
                            : 'bg-gray-50 text-gray-800 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <span>Mid (350ml)</span>
                        <span className={size === 'mid' ? 'text-amber-200' : 'text-red-700 font-extrabold'}>{item.prices.mid} BOB</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Add-ons Selector for Juices */}
                {!isTreat && (
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">
                      Add Extra Ingredients (+10-20 BOB):
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {ADDONS.map((addon) => {
                        const selected = addons.includes(addon.name);
                        return (
                          <button
                            key={addon.id}
                            onClick={() => toggleAddon(item.id, addon.name)}
                            className={`font-semibold px-2.5 py-1 rounded-lg border transition-colors flex items-center space-x-1 ${
                              selected
                                ? 'bg-emerald-600 text-white border-emerald-700'
                                : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            <span>{addon.name}</span>
                            {selected ? <Check className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-gray-500" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons: Dual Quick Order & Add to Cart */}
                <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => {
                      const configuredItem = {
                        ...item,
                        selectedSize: size,
                        selectedPrice: price,
                        selectedAddons: addons,
                      };
                      if (onQuickOrder) {
                        onQuickOrder(configuredItem);
                      } else {
                        onAddToCart(configuredItem);
                      }
                    }}
                    className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center space-x-1.5 transition-colors border border-red-700 shadow-sm"
                  >
                    <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>Quick Order</span>
                  </button>

                  <button
                    onClick={() =>
                      onAddToCart({
                        ...item,
                        selectedSize: size,
                        selectedPrice: price,
                        selectedAddons: addons,
                      })
                    }
                    className="w-full sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center space-x-1.5 transition-colors border border-gray-300"
                  >
                    <ShoppingBag className="w-4 h-4 text-gray-700" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Recipe Banner */}
      <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <span className="bg-red-100 text-red-800 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Custom Cold-Pressed Recipe
            </span>
            <h3 className="text-2xl font-bold text-gray-900">
              Create Your Own Signature Pash Cold-Pressed Elixir!
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Combine any hydraulic pressed base juice with organic ginger, bobba pearls, fresh lime, sugarcane, or mint! <strong className="text-red-700">1 free ingredient topping included</strong> with every juice order.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {ADDONS.map((addon) => (
                <span
                  key={addon.id}
                  className="bg-gray-100 text-gray-800 font-medium text-xs px-2.5 py-1 rounded-lg border border-gray-300"
                >
                  {addon.name} (+{addon.price} BOB)
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <button
              onClick={() => {
                const firstJuice = MENU_ITEMS[0];
                onAddToCart({
                  ...firstJuice,
                  selectedSize: 'large',
                  selectedPrice: firstJuice.prices.large,
                  selectedAddons: ['Extra Ginger', 'Extra Bobba'],
                });
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center space-x-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Create Custom Mix Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



