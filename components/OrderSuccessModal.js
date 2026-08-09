'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, ArrowRight, Copy, Check, Clock, X } from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';

export default function OrderSuccessModal({ isOpen, onClose, order }) {
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen || !order) return null;

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Generate WhatsApp message text
  const itemsText = order.items.map((i) => `• ${i.name} (${i.size || 'Standard'}) x${i.quantity}`).join('\n');
  const waText = encodeURIComponent(
    `🍷 *NEW PASH JUICES ORDER - ${order.id}*\n` +
    `----------------------------------------\n` +
    `👤 *Customer:* ${order.customerName}\n` +
    `📞 *Phone:* ${order.phone}\n` +
    `🏃 *Type:* ${order.orderType}\n` +
    `💳 *Payment:* M-PESA Till ${STORE_INFO.mpesaTill}\n` +
    `🔑 *M-PESA Code:* ${order.mpesaCode || 'PENDING'}\n\n` +
    `🛍️ *COLD-PRESSED ITEMS:* \n${itemsText}\n\n` +
    `💵 *TOTAL:* ${order.total} BOB\n` +
    `📝 *Notes:* ${order.notes || 'None'}\n\n` +
    `Live Tracking: ${typeof window !== 'undefined' ? window.location.origin : ''}/track/${order.id}`
  );

  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${waText}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-gray-900 shadow-xl space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Order Submitted to POS!
          </h2>
          <p className="text-xs text-gray-600 font-normal">
            Your raw cold-pressed order has been sent directly to the store kitchen queue.
          </p>
        </div>

        {/* Order Details Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 font-bold uppercase">Order Ref:</span>
              <span className="font-extrabold text-red-700 text-lg">{order.id}</span>
            </div>
            <button
              onClick={copyOrderId}
              className="text-xs font-bold bg-white text-gray-800 px-2.5 py-1 rounded-lg flex items-center space-x-1 border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
            >
              {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
              <span>{copiedId ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500 font-bold uppercase">Customer:</span>
              <span className="font-bold text-gray-900">{order.customerName} ({order.phone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-bold uppercase">Order Type:</span>
              <span className="font-bold text-red-700">{order.orderType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-bold uppercase">M-PESA Till:</span>
              <span className="font-bold text-gray-900">{STORE_INFO.mpesaTill}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 font-extrabold text-lg">
              <span className="text-gray-900">Total Payable:</span>
              <span className="text-red-700">{order.total} BOB</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          {/* Send via WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-emerald-700 shadow-sm"
          >
            <MessageCircle className="w-4.5 h-4.5 text-white" />
            <span>Send Order Receipt via WhatsApp</span>
          </a>

          {/* Track Order Live */}
          <Link
            href={`/track/${order.id}`}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-red-700 shadow-sm"
          >
            <Clock className="w-4.5 h-4.5 text-white" />
            <span>Track Order Status Live</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>

          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2.5 rounded-xl text-xs transition-colors border border-gray-300"
          >
            Continue Browsing Menu
          </button>
        </div>

      </div>
    </div>
  );
}


