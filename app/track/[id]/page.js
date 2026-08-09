'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2, ChefHat, PackageCheck, AlertCircle, Phone, RefreshCw, Sparkles, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';

export default function OrderTrackPage() {
  const params = useParams();
  const orderId = params?.id;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderStatus = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
        setError(null);
      } else {
        setError('Order not found or invalid ID');
      }
    } catch (err) {
      setError('Error fetching order status: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!orderId) return;
    fetchOrderStatus();

    // Poll every 3 seconds for live progress
    const interval = setInterval(fetchOrderStatus, 3000);
    return () => clearInterval(interval);
  }, [orderId]);

  const steps = [
    { key: 'Pending', label: 'Order Received', icon: Clock, desc: 'Store notified & waiting in kitchen queue' },
    { key: 'Preparing', label: 'Preparing in Kitchen', icon: ChefHat, desc: 'Juices being freshly squeezed & blended' },
    { key: 'Ready', label: 'Ready for Pickup / Delivery', icon: PackageCheck, desc: 'Your order is ready to collect!' },
    { key: 'Completed', label: 'Order Completed', icon: CheckCircle2, desc: 'Enjoy your freshly squeezed juice!' },
  ];

  const getStepIndex = (status) => {
    if (!status) return 0;
    const idx = steps.findIndex((s) => s.key.toLowerCase() === status.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  const currentStepIndex = order ? getStepIndex(order.status) : 0;

  const getWhatsappUrl = () => {
    if (!order) return '#';
    const itemsText = order.items?.map((i) => `• ${i.name} (${i.size || 'Standard'}) x${i.quantity}`).join('\n');
    const waText = encodeURIComponent(
      `🍹 *ORDER STATUS INQUIRY - ${order.id}*\n` +
      `----------------------------------------\n` +
      `👤 *Customer:* ${order.customerName}\n` +
      `📞 *Phone:* ${order.phone}\n` +
      `🏃 *Type:* ${order.orderType}\n` +
      `STATUS: ${order.status}\n\n` +
      `🛍️ *ITEMS:* \n${itemsText}\n`
    );
    return `https://wa.me/${STORE_INFO.whatsapp}?text=${waText}`;
  };

  return (
    <div className="min-h-screen bg-emerald-dark text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="glass-nav py-4 px-4 sm:px-8 flex items-center justify-between border-b border-white/10">
        <Link href="/" className="flex items-center space-x-2 text-xs font-bold text-gray-300 hover:text-juice-green transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to SRAIC JUICE Homepage</span>
        </Link>
        <span className="text-xs font-black bg-juice-green text-emerald-dark px-3 py-1 rounded-full animate-pulse-subtle shadow-green-glow font-display">
          ⚡ Live Order Tracker
        </span>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 sm:py-12 space-y-6">
        {loading ? (
          <div className="glass-panel rounded-3xl p-12 text-center border border-white/10 space-y-4">
            <RefreshCw className="w-8 h-8 text-juice-green animate-spin mx-auto" />
            <p className="text-sm font-bold text-gray-200 font-display">Loading your live order status...</p>
          </div>
        ) : error || !order ? (
          <div className="glass-panel rounded-3xl p-8 text-center border border-red-500/30 space-y-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
            <h2 className="text-xl font-black text-white font-display">Order Not Found</h2>
            <p className="text-xs text-gray-400 font-medium">{error}</p>
            <Link
              href="/"
              className="inline-block bg-juice-green hover:bg-juice-green-dark text-emerald-dark font-black px-6 py-3 rounded-2xl text-xs shadow-green-glow font-display"
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          <>
            {/* Status Top Banner */}
            <div className="bg-emerald-card border border-white/10 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="text-juice-yellow text-xs font-black uppercase tracking-wider block">Order Reference</span>
                  <h1 className="text-2xl sm:text-3xl font-black font-display text-white">{order.id}</h1>
                </div>
                <div className="text-right">
                  <span className="bg-juice-orange text-white font-black text-xs px-3.5 py-1.5 rounded-full inline-block shadow-juice-glow">
                    Status: {order.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-medium text-gray-300">
                <Sparkles className="w-4 h-4 text-juice-green animate-spin" />
                <span>Auto-refreshing live from store POS terminal every 3 seconds</span>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-8 shadow-2xl">
              <h2 className="text-base font-black text-white uppercase tracking-wider font-display">Live Order Progress</h2>
              
              <div className="relative">
                <div className="space-y-6">
                  {steps.map((step, idx) => {
                    const isDone = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="flex items-start space-x-4 relative z-10">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-lg transition-all ${
                            isCurrent
                              ? 'bg-juice-green text-emerald-dark shadow-green-glow scale-110 ring-4 ring-juice-green/20'
                              : isDone
                              ? 'bg-emerald-surface text-juice-green border border-juice-green/30'
                              : 'bg-emerald-card text-gray-500 border border-white/5'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1 pt-1">
                          <div className="flex items-center space-x-2">
                            <h3 className={`text-base font-black font-display ${isDone ? 'text-white' : 'text-gray-500'}`}>
                              {step.label}
                            </h3>
                            {isCurrent && (
                              <span className="bg-juice-green/20 text-juice-green text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse border border-juice-green/30">
                                IN PROGRESS
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 font-medium mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Details Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-2xl">
              <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-white/10 pb-3 font-display">
                Order Summary
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-gray-300 border-b border-white/10 pb-4">
                <div>
                  <span className="text-gray-400 block font-bold text-[10px] uppercase">Customer Name</span>
                  <span className="font-bold text-sm text-white font-display">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold text-[10px] uppercase">Phone Number</span>
                  <span className="font-bold text-sm text-white font-display">{order.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold text-[10px] uppercase">Order Type</span>
                  <span className="font-bold text-sm text-juice-green">{order.orderType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold text-[10px] uppercase">Payment Method</span>
                  <span className="font-bold text-sm text-juice-yellow">{order.paymentMethod}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Items Ordered:</span>
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-emerald-card/80 p-3 rounded-2xl text-xs font-bold text-white border border-white/5">
                    <div>
                      <span className="font-display text-sm">{item.quantity}x {item.name}</span>
                      {item.size && <span className="text-juice-yellow font-normal ml-2">({item.size})</span>}
                      {item.addOns && item.addOns.length > 0 && (
                        <div className="text-[10px] text-juice-green font-normal">
                          Add-ons: {item.addOns.join(', ')}
                        </div>
                      )}
                    </div>
                    <span className="font-black text-juice-green font-display text-sm">{item.price * item.quantity} BOB</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex justify-between items-center text-white font-black text-lg border-t border-white/10">
                <span>Total Amount Paid:</span>
                <span className="text-juice-green text-xl font-display">{order.total} BOB</span>
              </div>
            </div>

            {/* WhatsApp & Call Assistance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3.5 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="bg-emerald-card hover:bg-emerald-surface text-gray-200 font-bold p-3.5 rounded-2xl text-xs flex items-center justify-center space-x-2 transition-colors border border-white/10"
              >
                <Phone className="w-4 h-4 text-juice-green" />
                <span>Call Store ({STORE_INFO.phone})</span>
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

