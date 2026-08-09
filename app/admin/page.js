'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, TrendingUp, DollarSign, ShoppingBag, CheckCircle2, 
  Clock, Flame, RefreshCw, Search, Store, ShieldCheck, Filter, 
  BarChart3, Layers, UserCheck, Eye, Phone, ArrowUpRight, Users, ChevronDown, ChevronUp, Smartphone
} from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'customers'
  const [expandedCustomerKey, setExpandedCustomerKey] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, statsRes, customersRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/stats'),
        fetch('/api/customers'),
      ]);

      const ordersData = await ordersRes.json();
      const statsData = await statsRes.json();
      const customersData = await customersRes.json();

      if (ordersData.success) {
        setOrders(ordersData.orders || []);
      }
      if (statsData.success) {
        setStats(statsData.stats);
      }
      if (customersData.success) {
        setCustomers(customersData.customers || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

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
        fetchData();
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = statusFilter === 'ALL' || o.status.toUpperCase() === statusFilter.toUpperCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      (o.mpesaCode && o.mpesaCode.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      c.customerName.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.deviceId.toLowerCase().includes(q)
    );
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const readyOrdersCount = orders.filter((o) => o.status === 'Ready').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      {/* Admin Navbar */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors border border-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  PASH <span className="text-red-500 font-normal">ADMIN</span>
                </span>
                <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30 uppercase tracking-wider">
                  EXECUTIVE DASHBOARD
                </span>
              </div>
              <p className="text-xs text-gray-400">Real-Time Store Operations, Financial Metrics & Orders Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={fetchData}
              className="flex items-center space-x-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-gray-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <Link
              href="/sketch"
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs px-3 py-2 rounded-lg border border-gray-700 transition-colors"
            >
              <span>Store Journal</span>
            </Link>

            <Link
              href="/pos"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <Store className="w-4 h-4" />
              <span>Live POS Terminal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Executive Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Gross Revenue */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-amber-400">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gross Sales Revenue</span>
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {totalRevenue} <span className="text-base text-amber-400 font-bold">BOB</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-800 pt-2 font-medium">
              <span>M-PESA Till: <strong className="text-amber-400">{STORE_INFO.mpesaTill}</strong></span>
              <span className="text-emerald-400 font-bold">100% Realized</span>
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-red-400">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders Received</span>
              <ShoppingBag className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {orders.length} <span className="text-base text-gray-400 font-normal">orders</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-800 pt-2 font-medium">
              <span>Kitchen Queue: <strong className="text-red-400">{pendingOrdersCount} Pending</strong></span>
              <span className="text-amber-400 font-bold">{readyOrdersCount} Ready</span>
            </div>
          </div>

          {/* Card 3: Recognized Customers */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-emerald-400">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unique Customers</span>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {customers.length} <span className="text-base text-emerald-400 font-normal">clients</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-800 pt-2 font-medium">
              <span>Device & Phone Tracked</span>
              <span className="text-emerald-400 font-bold">Zero Duplicates</span>
            </div>
          </div>

          {/* Card 4: Average Basket Size */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-cyan-400">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Customer Basket</span>
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0} <span className="text-base text-cyan-400 font-bold">BOB</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-800 pt-2 font-medium">
              <span>Per Customer Order</span>
              <span className="text-amber-400 font-bold">Cold-Pressed Hero</span>
            </div>
          </div>

        </div>

        {/* Navigation Tab Bar (Live Queue vs Customer History) */}
        <div className="flex border-b border-gray-800 space-x-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-1 font-bold text-base flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-red-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-red-500" />
            <span>Live Orders Queue ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`pb-3 px-1 font-bold text-base flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'customers'
                ? 'border-red-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Customer Profiles ({customers.length})</span>
          </button>
        </div>

        {/* TAB 1: Live Orders Queue */}
        {activeTab === 'orders' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6 space-y-5">
            {/* Table Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">Live Store Orders Queue</h2>
                <p className="text-xs text-gray-400 font-normal">Manage order status, track customer receipts & phone contacts</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Search input */}
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search Ref ID, Name, Phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-gray-950 border border-gray-700 text-xs font-semibold text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                {/* Status Filter buttons */}
                <div className="flex bg-gray-950 p-1 rounded-lg border border-gray-800 text-xs font-bold">
                  {['ALL', 'Pending', 'Preparing', 'Ready', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-md transition-all ${
                        statusFilter === st ? 'bg-red-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-normal text-xs space-y-2">
                  <ShoppingBag className="w-8 h-8 text-gray-600 mx-auto" />
                  <p>No orders found matching your search or filter criteria.</p>
                </div>
              ) : (
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-gray-950 text-gray-400 uppercase font-bold tracking-wider text-[10px] border-b border-gray-800">
                    <tr>
                      <th className="py-3 px-4">Order Ref</th>
                      <th className="py-3 px-4">Customer & Phone</th>
                      <th className="py-3 px-4">Items & Add-ons</th>
                      <th className="py-3 px-4">Order Type</th>
                      <th className="py-3 px-4">Total (BOB)</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 font-medium">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white text-xs">
                          {order.id}
                        </td>
                        <td className="py-3.5 px-4 space-y-0.5">
                          <div className="font-bold text-white text-xs">{order.customerName}</div>
                          <div className="text-gray-400 font-mono text-[11px] flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-red-500" />
                            <span>{order.phone}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 space-y-1">
                          {order.items?.map((item, i) => (
                            <div key={i} className="text-xs">
                              <span className="font-semibold text-white">{item.quantity}x {item.name}</span>
                              {item.size && <span className="text-amber-400 ml-1">({item.size})</span>}
                              {item.addOns && item.addOns.length > 0 && (
                                <div className="text-[10px] text-red-400 font-normal">
                                  + {item.addOns.join(', ')}
                                </div>
                              )}
                            </div>
                          ))}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-amber-400">
                          {order.orderType}
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-red-400 text-sm">
                          {order.total} BOB
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              order.status === 'Pending'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : order.status === 'Preparing'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                                : order.status === 'Ready'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-gray-800 text-gray-400 border border-gray-700'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          {order.status === 'Pending' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'Preparing')}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm"
                            >
                              Start Prep
                            </button>
                          )}
                          {order.status === 'Preparing' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'Ready')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm"
                            >
                              Mark Ready
                            </button>
                          )}
                          {order.status === 'Ready' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'Completed')}
                              className="bg-gray-700 hover:bg-gray-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm"
                            >
                              Complete
                            </button>
                          )}
                          <Link
                            href={`/track/${order.id}`}
                            target="_blank"
                            className="inline-block p-1 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700"
                            title="Open live customer tracking view"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Customer Profiles & Piled-Up Orders */}
        {activeTab === 'customers' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">Recognized Customers & Order Piles</h2>
                <p className="text-xs text-gray-400 font-normal">
                  Automatically recognized by Phone Number & Device ID without needing explicit user accounts. Repeat orders pile up under each customer!
                </p>
              </div>

              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Name, Phone, Device ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-gray-950 border border-gray-700 text-xs font-semibold text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            {filteredCustomers.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-normal text-xs space-y-2">
                <Users className="w-8 h-8 text-gray-600 mx-auto" />
                <p>No customer profiles found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCustomers.map((cust) => {
                  const isExpanded = expandedCustomerKey === cust.key;

                  return (
                    <div
                      key={cust.key}
                      className="bg-gray-950 border border-gray-800 rounded-xl p-4 space-y-3 transition-colors hover:border-gray-700"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-base font-bold text-white">{cust.customerName}</h3>
                            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                              {cust.totalOrders} {cust.totalOrders === 1 ? 'Order' : 'Orders Piled'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-gray-400 font-medium">
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3.5 h-3.5 text-red-500" />
                              <span>{cust.phone}</span>
                            </div>
                            <span>Device: <strong className="text-gray-300 font-mono">{cust.deviceId}</strong></span>
                            <span>Last active: <strong className="text-gray-300">{new Date(cust.lastActive).toLocaleDateString()}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <span className="text-[10px] text-gray-400 uppercase font-bold block">Lifetime Value</span>
                            <span className="text-lg font-extrabold text-amber-400">{cust.totalSpent} BOB</span>
                          </div>

                          <button
                            onClick={() => toggleCustomerExpand(cust.key)}
                            className="bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-700 flex items-center space-x-1 transition-colors"
                          >
                            <span>{isExpanded ? 'Hide Orders' : `View ${cust.totalOrders} Orders`}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Order History Pile */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-gray-800 space-y-2">
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            Piled Order Records for {cust.customerName}:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {cust.orders.map((ord) => (
                              <div key={ord.id} className="bg-gray-900 border border-gray-800 p-3 rounded-lg space-y-2 text-xs">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                                  <span className="font-bold text-red-400">{ord.id}</span>
                                  <span className="text-[10px] font-bold bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">
                                    {ord.status}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {ord.items?.map((it, idx) => (
                                    <div key={idx} className="flex justify-between text-gray-300">
                                      <span>{it.quantity}x {it.name} ({it.size || 'Std'})</span>
                                      <span className="font-bold text-white">{it.price * it.quantity} BOB</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-gray-400 text-[11px]">
                                  <span>{new Date(ord.createdAt).toLocaleString()}</span>
                                  <strong className="text-white font-bold">{ord.total} BOB</strong>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
