'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, CreditCard, Banknote } from 'lucide-react';
import { MENU_ITEMS } from '@/lib/menuData';

export default function PosRegister({ isOpen, onClose, onOrderCreated }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [phone, setPhone] = useState('N/A');
  const [paymentMethod, setPaymentMethod] = useState('Cash (POS Walk-in)');
  const [mpesaCode, setMpesaCode] = useState('CASH');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddItem = (item, size = 'large') => {
    const price = item.prices ? (item.prices[size] || item.prices.single) : 100;
    setSelectedItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id && i.size === size);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      } else {
        return [...prev, { id: item.id, name: item.name, size, price, quantity: 1, addOns: [] }];
      }
    });
  };

  const handleUpdateQty = (idx, newQty) => {
    if (newQty <= 0) {
      setSelectedItems((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setSelectedItems((prev) => {
        const updated = [...prev];
        updated[idx].quantity = newQty;
        return updated;
      });
    }
  };

  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitWalkInOrder = async () => {
    if (selectedItems.length === 0) return;
    setSubmitting(true);

    try {
      const orderPayload = {
        customerName: customerName || 'Walk-in Customer',
        phone: phone || 'N/A',
        orderType: 'Walk-in Counter',
        paymentMethod,
        mpesaCode: paymentMethod.includes('M-PESA') ? mpesaCode.toUpperCase() : 'CASH',
        status: 'Preparing', // Walk-in is immediately in preparation
        total: totalAmount,
        items: selectedItems,
        notes: 'Counter Walk-in Order',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success && data.order) {
        onOrderCreated(data.order);
        setSelectedItems([]);
        onClose();
      }
    } catch (err) {
      alert('Error creating walk-in order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Register Dialog */}
      <div className="relative bg-white rounded-2xl max-w-4xl w-full h-[90vh] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row border border-gray-200 text-gray-900">
        
        {/* Left Side: Product Selector */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 border-r border-gray-200 bg-[#F3F4F6]">
          <div className="flex justify-between items-center pb-3 border-b border-gray-300">
            <h3 className="text-base font-bold text-gray-900">Counter Quick Order Menu</h3>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              Tap items to add
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-red-600 hover:shadow-sm transition-all"
              >
                <div className="h-32 sm:h-36 w-full overflow-hidden bg-gray-100 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs line-clamp-1">{item.name}</h4>
                    <span className="text-[11px] text-red-700 font-extrabold">
                      {item.prices?.large ? `${item.prices.large} BOB` : `${item.prices.single} BOB`}
                    </span>
                  </div>

                  {item.prices?.large ? (
                    <div className="grid grid-cols-2 gap-1 pt-1">
                      <button
                        onClick={() => handleAddItem(item, 'large')}
                        className="bg-red-600 text-white text-[10px] font-bold py-1.5 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Lg ({item.prices.large})
                      </button>
                      <button
                        onClick={() => handleAddItem(item, 'mid')}
                        className="bg-gray-800 text-white text-[10px] font-bold py-1.5 rounded-lg hover:bg-gray-900 transition-colors"
                      >
                        Mid ({item.prices.mid})
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddItem(item, 'single')}
                      className="w-full bg-red-600 text-white text-[10px] font-bold py-1.5 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Add ({item.prices.single} BOB)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Current Ticket Summary */}
        <div className="w-full md:w-80 bg-white p-5 flex flex-col justify-between border-t md:border-t-0 border-gray-200 space-y-4">
          <div className="space-y-4 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <h4 className="font-bold text-gray-900 text-sm">Walk-in Ticket</h4>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-900 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500 font-medium">
                No items added to walk-in ticket yet.
              </div>
            ) : (
              <div className="space-y-2">
                {selectedItems.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-gray-900">{item.name} ({item.size})</span>
                      <span className="block text-[10px] text-gray-500">{item.price} BOB each</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleUpdateQty(idx, item.quantity - 1)}
                        className="w-5 h-5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-bold text-xs px-1">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQty(idx, item.quantity + 1)}
                        className="w-5 h-5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form details & Submit */}
          <div className="space-y-3 pt-3 border-t border-gray-200">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-700 uppercase block">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash (POS Walk-in)')}
                className={`py-1.5 rounded-lg font-bold text-xs flex items-center justify-center space-x-1 border transition-colors ${
                  paymentMethod.includes('Cash')
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Banknote className="w-3.5 h-3.5" />
                <span>Cash</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('M-PESA Till 4809304')}
                className={`py-1.5 rounded-lg font-bold text-xs flex items-center justify-center space-x-1 border transition-colors ${
                  paymentMethod.includes('M-PESA')
                    ? 'bg-red-600 text-white border-red-700 shadow-sm'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>M-PESA</span>
              </button>
            </div>

            <div className="flex justify-between items-center font-bold text-sm text-gray-900">
              <span>Total:</span>
              <span className="text-red-700 text-base font-extrabold">{totalAmount} BOB</span>
            </div>

            <button
              onClick={handleSubmitWalkInOrder}
              disabled={submitting || selectedItems.length === 0}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors disabled:opacity-50 shadow-sm"
            >
              {submitting ? 'Creating Ticket...' : 'Confirm & Send to Kitchen'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
