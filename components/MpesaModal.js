'use client';

import React, { useState } from 'react';
import { X, Check, Copy, Phone } from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';

export default function MpesaModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyTill = () => {
    navigator.clipboard.writeText(STORE_INFO.mpesaTill);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl z-10 border border-gray-200 text-gray-900">
        {/* Header */}
        <div className="bg-gray-50 text-gray-900 p-5 relative border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-1.5 shadow-sm">
              <img src="/images/mpesa.png" alt="M-PESA" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">Official M-PESA Till</span>
              <h3 className="text-xl font-bold text-gray-900">Buy Goods & Services</h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Big Till Box */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-center space-y-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">M-PESA Till Number</span>
            <div className="text-3xl font-black text-red-700 tracking-wider">
              {STORE_INFO.mpesaTill}
            </div>
            <button
              onClick={copyTill}
              className="mt-2 inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg border border-red-700 transition-colors shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Till Number Copied!' : 'Tap to Copy Till Number'}</span>
            </button>
          </div>

          {/* Instructions */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">How to Pay via M-PESA:</h4>
            <ol className="space-y-2 text-sm font-semibold text-gray-800">
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Open M-PESA menu on your phone or Safaricom App.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Select <strong>Lipa na M-PESA</strong> ➔ <strong>Buy Goods and Services</strong>.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Enter Till Number <strong className="text-red-700">{STORE_INFO.mpesaTill}</strong>.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                <span>Enter the total amount and your M-PESA PIN to confirm payment.</span>
              </li>
            </ol>
          </div>

          {/* Footer Call Support */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3 text-xs">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-2.5 rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors border border-gray-300"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>Call Hotline ({STORE_INFO.phone})</span>
            </a>
            
            <button
              onClick={onClose}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



