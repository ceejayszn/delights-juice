'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Check, Copy, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { STORE_INFO } from '@/lib/menuData';
import { getDeviceId, getSavedCustomerInfo, saveCustomerInfo } from '@/lib/device';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart, onSuccessOrder }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [orderType, setOrderType] = useState('Pickup');
  const [mpesaCode, setMpesaCode] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedTill, setCopiedTill] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill saved customer details from device storage
  useEffect(() => {
    const saved = getSavedCustomerInfo();
    if (saved.name && !customerName) setCustomerName(saved.name);
    if (saved.phone && !phone) setPhone(saved.phone);
  }, []);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.selectedPrice * item.quantity, 0);

  const copyTill = () => {
    navigator.clipboard.writeText(STORE_INFO.mpesaTill);
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone number');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      // Save for auto-fill on device
      saveCustomerInfo(customerName.trim(), phone.trim());

      const orderPayload = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        deviceId: getDeviceId(),
        orderType,
        paymentMethod: `M-PESA Till ${STORE_INFO.mpesaTill}`,
        mpesaCode: mpesaCode.toUpperCase().trim() || 'NOT_PROVIDED',
        total: totalAmount,
        notes: notes.trim(),
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          size: item.selectedSize || 'Standard',
          quantity: item.quantity,
          price: item.selectedPrice,
          addOns: item.selectedAddons || [],
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (data.success) {
        onClearCart();
        onClose();
        if (onSuccessOrder) {
          onSuccessOrder(data.order);
        }
      } else {
        setErrorMsg(data.error || 'Failed to process order. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error submitting order: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
        <div className="w-screen max-w-md bg-white text-gray-900 shadow-2xl flex flex-col justify-between border-l border-gray-200">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">Your Juice Cart</h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#F3F4F6]">
            
            {/* Empty State */}
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400 border border-gray-300">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto">Select your cold-pressed juices, smoothies, or herbal elixirs to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Items Selected ({cart.length})</span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${index}`}
                    className="bg-white rounded-xl p-3.5 flex items-center justify-between border border-gray-200 space-x-3 shadow-sm"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 text-base">{item.name}</h4>
                        <span className="font-extrabold text-red-700 text-base">
                          {item.selectedPrice * item.quantity} BOB
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-1 text-xs">
                        {item.selectedSize && (
                          <span className="bg-gray-100 text-gray-800 font-semibold px-2 py-0.5 rounded border border-gray-300">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedAddons && item.selectedAddons.map((addon, i) => (
                          <span key={i} className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                            {addon}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center space-x-1.5 bg-gray-100 px-2 py-1 rounded-lg border border-gray-300">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="text-gray-700 hover:text-red-600 font-bold p-0.5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-gray-900 px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="text-gray-700 hover:text-red-600 font-bold p-0.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* M-PESA Till Quick Box */}
                <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">Official M-PESA Till</span>
                    <span className="text-lg font-black text-red-700 tracking-wider">{STORE_INFO.mpesaTill}</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyTill}
                    className="w-full bg-white hover:bg-amber-100 text-gray-900 font-bold text-xs py-1.5 rounded-lg border border-amber-300 flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    {copiedTill ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-700" />}
                    <span>{copiedTill ? 'Till Copied!' : 'Copy Till Number'}</span>
                  </button>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmitOrder} className="space-y-3 pt-2 text-xs">
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 font-bold p-3 rounded-lg text-xs">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Kamau"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0798169278"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Order Fulfillment Type</label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setOrderType('Pickup')}
                        className={`py-2 rounded-lg border transition-colors ${
                          orderType === 'Pickup'
                            ? 'bg-red-600 text-white border-red-700'
                            : 'bg-white text-gray-800 border-gray-300'
                        }`}
                      >
                        Store Pickup
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('Delivery')}
                        className={`py-2 rounded-lg border transition-colors ${
                          orderType === 'Delivery'
                            ? 'bg-red-600 text-white border-red-700'
                            : 'bg-white text-gray-800 border-gray-300'
                        }`}
                      >
                        Express Delivery
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">M-PESA Confirmation Code (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. QJK92XLM"
                      value={mpesaCode}
                      onChange={(e) => setMpesaCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 text-xs font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Special Preparation Instructions</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Extra ice, no sugarcane sweetness..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                </form>
              </div>
            )}

          </div>

          {/* Footer Total & Place Order Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-white space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-600 uppercase">Total Amount:</span>
                <span className="text-2xl font-black text-red-700">{totalAmount} BOB</span>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold text-base py-3 rounded-xl border border-red-700 flex items-center justify-center space-x-2 transition-colors shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Order to POS...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
