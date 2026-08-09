'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Store, PlusCircle, BarChart3, UtensilsCrossed, RefreshCw, Search, Volume2, VolumeX } from 'lucide-react';
import PosOrderCard from '@/components/PosOrderCard';
import PosRegister from '@/components/PosRegister';

export default function PosDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const previousOrderCountRef = useRef(0);

  const playChimeSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio chime error:', e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/orders${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`);
      const data = await res.json();
      if (data.success && data.orders) {
        // Sound alert if new order came in
        if (previousOrderCountRef.current > 0 && data.orders.length > previousOrderCountRef.current) {
          playChimeSound();
        }
        previousOrderCountRef.current = data.orders.length;
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Error fetching POS orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 4000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      alert('Error updating order status: ' + err.message);
    }
  };

  const handlePrintReceipt = (order) => {
    setReceiptOrder(order);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const filteredOrders = orders.filter((o) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      (o.mpesaCode && o.mpesaCode.toLowerCase().includes(q))
    );
  });

  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const preparingCount = orders.filter((o) => o.status === 'Preparing').length;
  const readyCount = orders.filter((o) => o.status === 'Ready').length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      {/* Top POS Navbar */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-30 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-sm">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-white tracking-tight">SRAIC Juice Live POS Receiver</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                LIVE KDS ONLINE
              </span>
            </div>
            <p className="text-xs text-gray-400">Kitchen Display & Counter Terminal</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors border ${
              soundEnabled ? 'bg-gray-800 text-amber-400 border-gray-700' : 'bg-gray-800 text-gray-400 border-gray-700'
            }`}
            title="Toggle new order sound chime"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          <button
            onClick={() => setRegisterOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Counter Walk-in Order</span>
          </button>

          <Link
            href="/sketch"
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs px-3 py-2 rounded-lg border border-gray-700 transition-colors"
          >
            <span>Store Journal</span>
          </Link>

          <Link
            href="/pos/analytics"
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs px-3 py-2 rounded-lg border border-gray-700 flex items-center space-x-1"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Analytics</span>
          </Link>

          <Link
            href="/"
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs px-3 py-2 rounded-lg border border-gray-700 transition-colors"
          >
            Exit POS
          </Link>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Status Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => setStatusFilter('all')}
            className={`p-4 rounded-xl cursor-pointer transition-all border ${
              statusFilter === 'all'
                ? 'bg-gray-900 border-red-600 shadow-sm'
                : 'bg-gray-900/60 border-gray-800 hover:bg-gray-900'
            }`}
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Active</span>
            <div className="text-2xl font-extrabold text-white mt-1">{orders.length} Orders</div>
          </div>

          <div
            onClick={() => setStatusFilter('Pending')}
            className={`p-4 rounded-xl cursor-pointer transition-all border ${
              statusFilter === 'Pending'
                ? 'bg-gray-900 border-amber-500 shadow-sm'
                : 'bg-gray-900/60 border-gray-800 hover:bg-gray-900'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pending Prep</span>
              {pendingCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              )}
            </div>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">{pendingCount} New</div>
          </div>

          <div
            onClick={() => setStatusFilter('Preparing')}
            className={`p-4 rounded-xl cursor-pointer transition-all border ${
              statusFilter === 'Preparing'
                ? 'bg-gray-900 border-blue-500 shadow-sm'
                : 'bg-gray-900/60 border-gray-800 hover:bg-gray-900'
            }`}
          >
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">In Kitchen</span>
            <div className="text-2xl font-extrabold text-blue-400 mt-1">{preparingCount} Prepping</div>
          </div>

          <div
            onClick={() => setStatusFilter('Ready')}
            className={`p-4 rounded-xl cursor-pointer transition-all border ${
              statusFilter === 'Ready'
                ? 'bg-gray-900 border-emerald-500 shadow-sm'
                : 'bg-gray-900/60 border-gray-800 hover:bg-gray-900'
            }`}
          >
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Ready to Collect</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">{readyCount} Ready</div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['all', 'Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors border ${
                  statusFilter === st
                    ? 'bg-red-600 text-white border-red-700 shadow-sm'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-750'
                }`}
              >
                {st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search ID, customer, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 text-white rounded-lg pl-9 pr-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-red-600 focus:outline-none placeholder-gray-500"
            />
          </div>
        </div>

        {/* Orders Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-7 h-7 text-red-500 animate-spin mx-auto" />
            <p className="text-xs font-bold text-gray-400">Fetching store orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center space-y-3">
            <UtensilsCrossed className="w-10 h-10 text-gray-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Orders Found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              No active orders match status &quot;{statusFilter}&quot;. Place an order on the front-end to watch it pop up live!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOrders.map((order) => (
              <PosOrderCard
                key={order.id}
                order={order}
                onUpdateStatus={handleUpdateStatus}
                onPrintReceipt={handlePrintReceipt}
              />
            ))}
          </div>
        )}
      </main>

      {/* Counter Walk-in Register Modal */}
      <PosRegister
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onOrderCreated={() => fetchOrders()}
      />

      {/* Printable Receipt Layout (Hidden until window.print() triggered) */}
      {receiptOrder && (
        <div id="printable-receipt" className="hidden">
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}>SRAIC JUICE SHOP</h2>
            <p style={{ margin: '2px 0' }}>100% Pure Organic Juices & Smoothies</p>
            <p style={{ margin: '2px 0' }}>M-PESA Till: 4809304</p>
            <p style={{ margin: '2px 0' }}>Tel: +254 798 169 278</p>
            <p style={{ margin: '5px 0' }}>--------------------------------</p>
          </div>

          <p><strong>Receipt #:</strong> {receiptOrder.id}</p>
          <p><strong>Date:</strong> {new Date(receiptOrder.createdAt).toLocaleString()}</p>
          <p><strong>Customer:</strong> {receiptOrder.customerName} ({receiptOrder.phone})</p>
          <p><strong>Type:</strong> {receiptOrder.orderType}</p>
          <p><strong>Payment:</strong> {receiptOrder.paymentMethod}</p>
          {receiptOrder.mpesaCode && <p><strong>M-PESA Code:</strong> {receiptOrder.mpesaCode}</p>}
          
          <p style={{ margin: '5px 0' }}>--------------------------------</p>
          <p><strong>ITEMS ORDERED:</strong></p>
          {receiptOrder.items?.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', margin: '3px 0' }}>
              <span>{item.quantity}x {item.name} ({item.size})</span>
              <span>{item.price * item.quantity} KSH</span>
            </div>
          ))}

          <p style={{ margin: '5px 0' }}>--------------------------------</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold' }}>
            <span>TOTAL PAID:</span>
            <span>{receiptOrder.total} KSH</span>
          </div>
          <p style={{ margin: '5px 0' }}>--------------------------------</p>
          <p style={{ textAlign: 'center', marginTop: '10px' }}>Thank you for visiting SRAIC Juice Shop!</p>
        </div>
      )}
    </div>
  );
}

