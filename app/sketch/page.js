'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, RefreshCw, Sparkles, TrendingUp, ShoppingBag, 
  Clock, CheckSquare, Square, Plus, Trash2, Store, Heart, Zap, Award
} from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';

export default function SketchDashboardPage() {
  const [activeTab, setActiveTab] = useState('journal');
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([
    { id: 1, text: 'Order 50kg Fresh Passion Fruit from Farm 🚜', done: true, color: 'bg-[#FFEAA7]' },
    { id: 2, text: 'Clean Hydraulic Cold-Press Machine at 4PM 🧼', done: false, color: 'bg-[#FF7675]/20' },
    { id: 3, text: 'Confirm M-PESA Till 4809304 Receipts 💳', done: true, color: 'bg-[#55E6C1]/30' },
    { id: 4, text: 'Prepare 30 Bottles of Bobba Special for Lunch Surge 🍹', done: false, color: 'bg-[#74B9FF]/25' },
  ]);
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedDay, setSelectedDay] = useState('Today');

  const toggleNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, done: !n.done } : n))
    );
  };

  const addNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const bgColors = ['bg-[#FFEAA7]', 'bg-[#FF7675]/20', 'bg-[#55E6C1]/30', 'bg-[#74B9FF]/25'];
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    setNotes((prev) => [
      ...prev,
      { id: Date.now(), text: newNoteText.trim(), done: false, color: randomColor },
    ]);
    setNewNoteText('');
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen sketch-notebook-grid text-[#2D3436] flex flex-col font-sans pb-16">
      {/* Top Sketch Navigation Bar */}
      <header className="border-b-2 border-[#2D3436] bg-[#FBF9F3]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-xs font-bold text-[#2D3436] hover:text-[#D92626] transition-colors border border-[#2D3436] px-3 py-1.5 rounded-xl bg-white shadow-[2px_2px_0px_#2D3436]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Store Homepage</span>
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black font-handwriting tracking-wide text-[#7A0C0C]">
              ✏️ PASH JUICES <span className="text-[#D92626] font-normal text-xl">Hand-Drawn Journal</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 800);
            }}
            className="flex items-center space-x-1 text-xs font-bold bg-white border border-[#2D3436] px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#2D3436] hover:bg-[#FFEAA7] transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline font-handwriting text-sm">Sync Journal Data</span>
          </button>

          <Link
            href="/admin"
            className="flex items-center space-x-1 text-xs font-black bg-[#FF7675]/30 text-[#2D3436] px-3.5 py-1.5 rounded-xl border border-[#2D3436] shadow-[2px_2px_0px_#2D3436] hover:bg-[#FF7675]/50 transition-all font-serif"
          >
            <span>📊 Admin (Normal Style)</span>
          </Link>

          <Link
            href="/pos"
            className="flex items-center space-x-1.5 bg-[#FFEAA7] text-[#2D3436] font-black text-xs px-3.5 py-1.5 rounded-xl border border-[#2D3436] shadow-[2px_2px_0px_#2D3436] hover:scale-105 transition-all font-serif"
          >
            <Store className="w-4 h-4" />
            <span>POS Receiver</span>
          </Link>

        </div>
      </header>

      {/* Main Sketch Dashboard Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hand-Drawn Bookmark Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-dashed border-[#2D3436]/40 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'journal', label: '📓 Sales Journal', color: 'bg-[#FFEAA7]' },
              { id: 'squeezes', label: '🍹 Juice Squeezes', color: 'bg-[#74B9FF]/30' },
              { id: 'mpesa', label: '💳 M-PESA Register', color: 'bg-[#55E6C1]/40' },
              { id: 'ratings', label: '⭐ Guest Ratings', color: 'bg-[#FF7675]/30' },
              { id: 'notes', label: '📝 Quick Notes', color: 'bg-white' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-t-2xl font-handwriting text-lg font-bold border-2 border-[#2D3436] transition-all ${
                  activeTab === tab.id
                    ? `${tab.color} shadow-[3px_-3px_0px_#2D3436] scale-105 -translate-y-1`
                    : 'bg-white/60 text-[#2D3436]/70 hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 font-handwriting text-base font-bold bg-white px-3 py-1 rounded-xl border border-[#2D3436] shadow-[2px_2px_0px_#2D3436]">
            <span>Calendar View:</span>
            {['Today', 'This Week', 'This Month'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  selectedDay === d ? 'bg-[#FFEAA7] text-[#2D3436] font-black' : 'hover:bg-gray-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Hand-Drawn Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Revenue */}
          <div className="sketch-card p-6 relative overflow-hidden bg-white font-handwriting">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold font-sans text-gray-500 uppercase tracking-wider block">Daily Revenue</span>
                <div className="text-4xl font-black text-[#2D3436] mt-1 marker-highlight">
                  14,850 <span className="text-xl text-[#D92626]">BOB</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#FFEAA7] border border-[#2D3436] flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#2D3436]">
                💰
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between text-base font-bold">
              <span className="text-emerald-700 flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>+18.4% vs Yesterday</span>
              </span>
              <span className="text-gray-400">42 Orders</span>
            </div>
          </div>

          {/* Card 2: Cold-Pressed Bottles */}
          <div className="sketch-card p-6 relative overflow-hidden bg-white font-handwriting">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold font-sans text-gray-500 uppercase tracking-wider block">Bottles Pressed</span>
                <div className="text-4xl font-black text-[#7A0C0C] mt-1 marker-highlight-pink">
                  186 <span className="text-lg text-gray-600 font-sans font-normal">bottles</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#FF7675]/30 border border-[#2D3436] flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#2D3436]">
                🍹
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between text-base font-bold">
              <span className="text-[#7A0C0C]">Hero: Bobba Special</span>
              <span className="text-gray-400">500ml & 350ml</span>
            </div>
          </div>

          {/* Card 3: M-PESA Till Success */}
          <div className="sketch-card p-6 relative overflow-hidden bg-white font-handwriting">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold font-sans text-gray-500 uppercase tracking-wider block">M-PESA Till 4809304</span>
                <div className="text-4xl font-black text-emerald-800 mt-1 marker-highlight-mint">
                  100% <span className="text-base text-emerald-600 font-sans">Verified</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#55E6C1]/40 border border-[#2D3436] flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#2D3436]">
                💳
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between text-base font-bold">
              <span className="text-emerald-700">Till # 4809304</span>
              <span className="text-gray-400">Instant Sync</span>
            </div>
          </div>

          {/* Card 4: Average Prep Time */}
          <div className="sketch-card p-6 relative overflow-hidden bg-white font-handwriting">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold font-sans text-gray-500 uppercase tracking-wider block">Avg Kitchen Prep</span>
                <div className="text-4xl font-black text-[#0984E3] mt-1 marker-highlight-blue">
                  8.5 <span className="text-lg text-gray-600 font-sans font-normal">mins</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#74B9FF]/30 border border-[#2D3436] flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#2D3436]">
                ⏱️
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between text-base font-bold">
              <span className="text-[#0984E3]">Express Queue</span>
              <span className="text-gray-400">Target &lt; 10m</span>
            </div>
          </div>

        </div>

        {/* Hand-Drawn Main Section: Charts & Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 7 Columns: FigJam Style Hand-Drawn Line & Bar Charts */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Chart 1: Weekly Sales Progression Pencil Line Graph */}
            <div className="sketch-card p-6 bg-white space-y-4 relative">
              <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-3">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block font-sans">FigJam Sketch Viz</span>
                  <h3 className="text-2xl font-black font-handwriting text-[#2D3436]">
                    Weekly Sales Growth (BOB Thousands) 📈
                  </h3>
                </div>
                <span className="text-xs font-extrabold bg-[#FFEAA7] border border-[#2D3436] px-3 py-1 rounded-xl shadow-[2px_2px_0px_#2D3436] font-handwriting">
                  Pencil Sketch
                </span>
              </div>

              {/* Hand-Drawn Line Graph SVG */}
              <div className="h-64 w-full relative pt-4 flex flex-col justify-between">
                <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 150">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1.5" />
                  <line x1="0" y1="70" x2="500" y2="70" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1.5" />
                  <line x1="0" y1="110" x2="500" y2="110" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1.5" />

                  {/* Sketchy Hand-Drawn Polyline */}
                  <path
                    d="M 20 120 Q 80 90, 140 100 T 260 50 T 380 40 T 480 15"
                    fill="none"
                    stroke="#D92626"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Duplicate Overlay line for pencil effect */}
                  <path
                    d="M 20 121 Q 80 91, 140 99 T 260 51 T 380 39 T 480 16"
                    fill="none"
                    stroke="#7A0C0C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="8 3"
                    opacity="0.8"
                  />

                  {/* Data Points / Circles */}
                  {[
                    { x: 20, y: 120, label: '8k' },
                    { x: 100, y: 95, label: '10.5k' },
                    { x: 180, y: 85, label: '11k' },
                    { x: 260, y: 50, label: '13.2k' },
                    { x: 340, y: 45, label: '14k' },
                    { x: 420, y: 25, label: '15.8k' },
                    { x: 480, y: 15, label: '17.5k' },
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="6" fill="#FFEAA7" stroke="#2D3436" strokeWidth="2.5" />
                      <text x={pt.x} y={pt.y - 12} textAnchor="middle" fill="#2D3436" fontSize="14" fontFamily="Caveat" fontWeight="bold">
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between text-base font-handwriting font-bold text-gray-700 px-2">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun 🌟</span>
                </div>
              </div>
            </div>

            {/* Chart 2: Top Seller Drink Volumes Sketchy Bar Graph */}
            <div className="sketch-card p-6 bg-white space-y-4">
              <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-3">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block font-sans">Product Performance</span>
                  <h3 className="text-2xl font-black font-handwriting text-[#2D3436]">
                    Top Cold-Pressed Blends (Units Sold) 🍹
                  </h3>
                </div>
                <span className="text-xs font-extrabold bg-[#55E6C1]/40 border border-[#2D3436] px-3 py-1 rounded-xl shadow-[2px_2px_0px_#2D3436] font-handwriting">
                  Pencil Fill
                </span>
              </div>

              {/* Hand-Drawn Bar Charts */}
              <div className="space-y-4 font-handwriting pt-2">
                {[
                  { name: 'Bobba Special (Lime · Ginger · Sugarcane)', count: 68, color: 'bg-[#FFEAA7]', percent: '85%' },
                  { name: "Sun's Flower (Passion Fruit · Sugarcane)", count: 52, color: 'bg-[#74B9FF]/40', percent: '65%' },
                  { name: 'Thick Mess (Mango · Sugarcane)', count: 44, color: 'bg-[#FF7675]/40', percent: '55%' },
                  { name: 'Bitter Herbs Elixir (Aloe · Sugarcane)', count: 35, color: 'bg-[#55E6C1]/40', percent: '45%' },
                  { name: 'Avocado Cream Smoothie', count: 28, color: 'bg-[#A29BFE]/40', percent: '35%' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{item.name}</span>
                      <span className="text-[#D92626] font-black">{item.count} bottles</span>
                    </div>
                    <div className="h-6 w-full bg-gray-100 rounded-xl border-2 border-[#2D3436] overflow-hidden relative shadow-[2px_2px_0px_#2D3436]">
                      <div
                        className={`h-full ${item.color} border-r-2 border-[#2D3436] transition-all duration-1000`}
                        style={{ width: item.percent }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Pie Chart & Interactive Sticky Notes Checklist */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Chart 3: Category Distribution Pie Chart */}
            <div className="sketch-card p-6 bg-white space-y-4">
              <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-3">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block font-sans">Category Ratio</span>
                  <h3 className="text-2xl font-black font-handwriting text-[#2D3436]">
                    Sales Mix by Category 🥧
                  </h3>
                </div>
              </div>

              {/* Hand-Drawn Donut Chart Representation */}
              <div className="flex flex-col items-center justify-center py-4 space-y-4">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Circle Background */}
                    <path
                      className="text-gray-100"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Pie Slices */}
                    <path
                      className="text-[#D92626]"
                      strokeDasharray="55, 100"
                      strokeWidth="6"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#FFEAA7]"
                      strokeDasharray="25, 100"
                      strokeDashoffset="-55"
                      strokeWidth="6"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#55E6C1]"
                      strokeDasharray="15, 100"
                      strokeDashoffset="-80"
                      strokeWidth="6"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center font-handwriting text-center">
                    <span className="text-xs text-gray-500 font-sans uppercase font-bold">Total Sales</span>
                    <span className="text-2xl font-black text-[#7A0C0C]">100%</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-3 w-full font-handwriting text-base font-bold pt-2">
                  <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <div className="w-4 h-4 rounded-full bg-[#D92626] border border-[#2D3436]" />
                    <span>Juices (55%)</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <div className="w-4 h-4 rounded-full bg-[#FFEAA7] border border-[#2D3436]" />
                    <span>Smoothies (25%)</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <div className="w-4 h-4 rounded-full bg-[#55E6C1] border border-[#2D3436]" />
                    <span>Elixirs (15%)</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <div className="w-4 h-4 rounded-full bg-gray-300 border border-[#2D3436]" />
                    <span>Treats (5%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Hand-Drawn Sticky Notes Checklist */}
            <div className="sketch-card p-6 bg-[#FFEAA7]/40 space-y-4 border-2 border-[#2D3436] relative shadow-[5px_5px_0px_#2D3436]">
              <div className="flex justify-between items-center border-b-2 border-dashed border-[#2D3436]/40 pb-3">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block font-sans">Kitchen Action Notes</span>
                  <h3 className="text-2xl font-black font-handwriting text-[#2D3436]">
                    Store Staff Doodle List 📝
                  </h3>
                </div>
              </div>

              {/* Note List */}
              <div className="space-y-3 font-handwriting text-lg">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-2xl border-2 border-[#2D3436] flex items-center justify-between shadow-[2px_2px_0px_#2D3436] ${note.color} transition-all`}
                  >
                    <button
                      onClick={() => toggleNote(note.id)}
                      className="flex items-center space-x-3 text-left flex-1"
                    >
                      {note.done ? (
                        <CheckSquare className="w-5 h-5 text-[#D92626] shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-[#2D3436] shrink-0" />
                      )}
                      <span className={note.done ? 'line-through opacity-60' : 'font-bold'}>
                        {note.text}
                      </span>
                    </button>

                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Note Form */}
              <form onSubmit={addNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Type a new doodle action note..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl bg-white border-2 border-[#2D3436] text-sm font-bold font-handwriting focus:outline-none focus:ring-2 focus:ring-[#D92626] shadow-[2px_2px_0px_#2D3436]"
                />
                <button
                  type="submit"
                  className="bg-[#2D3436] text-white font-handwriting text-lg font-black px-4 py-2 rounded-xl shadow-[2px_2px_0px_#7A0C0C] hover:bg-[#7A0C0C] transition-all flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
