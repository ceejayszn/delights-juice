'use client';

import React from 'react';
import { Clock, Phone, MapPin, CheckCircle2, ChefHat, PackageCheck, Printer, XCircle, User } from 'lucide-react';

export default function PosOrderCard({ order, onUpdateStatus, onPrintReceipt }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold animate-pulse';
      case 'Preparing':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-bold';
      case 'Ready':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 border-gray-300 font-bold';
      case 'Cancelled':
        return 'bg-red-100 text-red-900 border-red-300 font-bold';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formattedTime = new Date(order.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 text-gray-900">
      {/* Top Header */}
      <div>
        <div className="flex justify-between items-start border-b border-gray-200 pb-3">
          <div>
            <span className="text-xs font-bold text-red-700 tracking-wide block">{order.id}</span>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-xs font-semibold text-gray-500 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {formattedTime}
              </span>
              <span className="text-[11px] font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded border border-gray-300">
                {order.orderType}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <span className={`text-xs px-3 py-1 rounded-full border ${getStatusBadge(order.status)}`}>
            {order.status}
          </span>
        </div>

        {/* Customer Details */}
        <div className="pt-3 space-y-1 text-xs">
          <div className="flex items-center space-x-1.5 font-bold text-gray-900">
            <User className="w-3.5 h-3.5 text-red-600" />
            <span>{order.customerName}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
            <a href={`tel:${order.phone}`} className="flex items-center space-x-1 hover:text-red-700 font-bold">
              <Phone className="w-3.5 h-3.5 text-gray-500" />
              <span>{order.phone}</span>
            </a>

            {order.mpesaCode && (
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
                M-PESA: {order.mpesaCode}
              </span>
            )}
          </div>

          {order.notes && (
            <div className="mt-2 bg-amber-50 text-amber-900 p-2 rounded-lg text-xs font-medium border border-amber-200">
              💡 <strong>Note:</strong> {order.notes}
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="mt-3 pt-3 border-t border-gray-200 space-y-1.5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Ordered Items:</span>
          {order.items?.map((item, i) => (
            <div key={i} className="flex justify-between items-start text-xs font-semibold text-gray-900 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <div>
                <span>{item.quantity}x {item.name}</span>
                {item.size && <span className="text-gray-500 font-normal text-[11px] ml-1">({item.size})</span>}
                {item.addOns && item.addOns.length > 0 && (
                  <div className="text-[10px] text-red-700 font-normal">
                    Add-ons: {item.addOns.join(', ')}
                  </div>
                )}
              </div>
              <span className="font-bold text-gray-900 shrink-0 ml-2">{item.price * item.quantity} BOB</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer & Action Buttons */}
      <div className="pt-3 border-t border-gray-200 space-y-3">
        <div className="flex justify-between items-center text-sm font-bold text-gray-900">
          <span>Total Paid:</span>
          <span className="text-red-700 text-base font-extrabold">{order.total} BOB</span>
        </div>

        {/* Status Change Buttons */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          {order.status === 'Pending' && (
            <button
              onClick={() => onUpdateStatus(order.id, 'Preparing')}
              className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
            >
              <ChefHat className="w-4 h-4" />
              <span>Start Preparing</span>
            </button>
          )}

          {order.status === 'Preparing' && (
            <button
              onClick={() => onUpdateStatus(order.id, 'Ready')}
              className="col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Mark Ready for Pickup</span>
            </button>
          )}

          {order.status === 'Ready' && (
            <button
              onClick={() => onUpdateStatus(order.id, 'Completed')}
              className="col-span-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Order</span>
            </button>
          )}

          {order.status !== 'Completed' && order.status !== 'Cancelled' && (
            <button
              onClick={() => onUpdateStatus(order.id, 'Cancelled')}
              className="bg-red-50 hover:bg-red-100 text-red-700 font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1 border border-red-200"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Order</span>
            </button>
          )}

          <button
            onClick={() => onPrintReceipt(order)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1 border border-gray-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
