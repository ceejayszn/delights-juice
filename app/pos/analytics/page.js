'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, DollarSign, ShoppingBag, CheckCircle, Flame, RefreshCw } from 'lucide-react';

export default function PosAnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const avgOrderValue = stats && stats.totalOrders > 0
    ? Math.round(stats.totalRevenue / stats.totalOrders)
    : 0;

  return (
    <div className="min-h-screen bg-[#180E23] text-purple-100 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-purple-950/90 border-b border-purple-800/60 sticky top-0 z-30 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/pos"
            className="p-2 bg-purple-900 hover:bg-purple-800 rounded-xl text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-white">Delight Juice Sales Analytics</h1>
            <p className="text-xs text-purple-300 font-bold">Daily Revenue & Item Leaderboard</p>
          </div>
        </div>

        <button
          onClick={fetchStats}
          className="bg-juice-orange hover:bg-juice-orange-hover text-white font-black text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Data</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-juice-orange animate-spin mx-auto" />
            <p className="text-sm font-bold text-purple-300">Calculating revenue metrics...</p>
          </div>
        ) : !stats ? (
          <div className="text-center py-16 text-purple-400">Failed to load analytics data.</div>
        ) : (
          <>
            {/* Top Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Total Revenue */}
              <div className="bg-gradient-to-br from-purple-900 to-purple-950 border border-purple-700/50 rounded-3xl p-6 shadow-xl space-y-2">
                <div className="flex justify-between items-center text-juice-yellow">
                  <span className="text-xs font-black uppercase tracking-wider">Total Sales Revenue</span>
                  <DollarSign className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-white">{stats.totalRevenue} BOB</div>
                <span className="text-[11px] text-emerald-400 font-bold block">Gross Sales Realized</span>
              </div>

              {/* Total Orders */}
              <div className="bg-gradient-to-br from-purple-900 to-purple-950 border border-purple-700/50 rounded-3xl p-6 shadow-xl space-y-2">
                <div className="flex justify-between items-center text-juice-orange">
                  <span className="text-xs font-black uppercase tracking-wider">Total Order Volume</span>
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-white">{stats.totalOrders}</div>
                <span className="text-[11px] text-purple-300 font-bold block">Orders Received</span>
              </div>

              {/* Completed Orders */}
              <div className="bg-gradient-to-br from-purple-900 to-purple-950 border border-purple-700/50 rounded-3xl p-6 shadow-xl space-y-2">
                <div className="flex justify-between items-center text-juice-lime">
                  <span className="text-xs font-black uppercase tracking-wider">Fulfill Rate</span>
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-white">{stats.completedOrders}</div>
                <span className="text-[11px] text-emerald-400 font-bold block">Fulfilled & Completed</span>
              </div>

              {/* Avg Order Value */}
              <div className="bg-gradient-to-br from-purple-900 to-purple-950 border border-purple-700/50 rounded-3xl p-6 shadow-xl space-y-2">
                <div className="flex justify-between items-center text-cyan-400">
                  <span className="text-xs font-black uppercase tracking-wider">Average Basket Size</span>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-white">{avgOrderValue} BOB</div>
                <span className="text-[11px] text-purple-300 font-bold block">Average Per Customer Order</span>
              </div>

            </div>

            {/* Top Selling Juices Leaderboard */}
            <div className="bg-purple-950/60 border border-purple-800/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-purple-800/60 pb-4">
                <Flame className="w-6 h-6 text-juice-orange" />
                <div>
                  <h2 className="text-lg font-black text-white">Top Selling Products Leaderboard</h2>
                  <p className="text-xs text-purple-300 font-bold">Most ordered juice flavors & treats</p>
                </div>
              </div>

              <div className="space-y-4">
                {stats.topItems?.map((item, idx) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-white flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-juice-purple text-juice-yellow font-black text-[11px] flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <span>{item.name}</span>
                      </span>
                      <span className="text-juice-orange font-black">{item.count} Sold</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-purple-900/60 h-3 rounded-full overflow-hidden border border-purple-800/40">
                      <div
                        className="bg-gradient-to-r from-juice-orange to-juice-yellow h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (item.count / (stats.topItems[0]?.count || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Link */}
            <div className="text-center pt-4">
              <Link
                href="/pos"
                className="inline-flex items-center space-x-2 bg-juice-purple hover:bg-juice-purple-dark text-white font-black text-xs px-6 py-3 rounded-2xl shadow-purple-glow transition-all"
              >
                <span>Return to Live POS Order Receiver</span>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
