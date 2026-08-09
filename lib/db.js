// In-Memory Database Store for Vercel Serverless environment & Local execution
// Uses global object to retain state across serverless function re-invocations in node process

import { MENU_ITEMS } from './menuData.js';

if (!global.__DELIGHT_DB__) {
  global.__DELIGHT_DB__ = {
    orders: [
      {
        id: 'ORD-9821',
        createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
        customerName: 'Wanjiku M.',
        phone: '0712345678',
        orderType: 'Pickup',
        paymentMethod: 'M-PESA Till 4809304',
        mpesaCode: 'QK8912AB01',
        status: 'Preparing',
        total: 200,
        items: [
          { id: 'bobba', name: 'Bobba', size: 'Large', quantity: 1, price: 100, addOns: ['🫚 Extra Ginger'] },
          { id: 'crimson-red', name: 'Crimson Red', size: 'Large', quantity: 1, price: 100, addOns: [] },
        ],
        notes: 'Cold juice, no ice please.',
      },
      {
        id: 'ORD-9820',
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
        customerName: 'Kevin O.',
        phone: '0798765432',
        orderType: 'Delivery',
        paymentMethod: 'M-PESA Till 4809304',
        mpesaCode: 'QK8911XX92',
        status: 'Ready',
        total: 240,
        items: [
          { id: 'suns-flower', name: "Sun's Flower", size: 'Large', quantity: 2, price: 120, addOns: ['🍋 Extra Lime'] },
        ],
        notes: 'Deliver near Equity Bank stage.',
      },
      {
        id: 'ORD-9819',
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        customerName: 'Grace N.',
        phone: '0722114455',
        orderType: 'Pickup',
        paymentMethod: 'Cash (POS Walk-in)',
        mpesaCode: 'CASH',
        status: 'Completed',
        total: 170,
        items: [
          { id: 'sweet-sensation', name: 'Sweet Sensation', size: 'Large', quantity: 1, price: 100, addOns: [] },
          { id: 'bobba', name: 'Bobba', size: 'Mid', quantity: 1, price: 70, addOns: [] },
        ],
        notes: '',
      },
    ],
    menu: [...MENU_ITEMS],
  };
}

const db = global.__DELIGHT_DB__;

export async function getOrders(statusFilter) {
  let list = [...db.orders];
  if (statusFilter && statusFilter !== 'all') {
    list = list.filter((o) => o.status.toLowerCase() === statusFilter.toLowerCase());
  }
  // Sort latest first
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getOrderById(id) {
  return db.orders.find((o) => o.id.toUpperCase() === id.toUpperCase()) || null;
}

export async function createOrder(orderData) {
  const newId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder = {
    id: newId,
    createdAt: new Date().toISOString(),
    customerName: orderData.customerName || 'Valued Customer',
    phone: orderData.phone || '',
    deviceId: orderData.deviceId || 'DEV_UNKNOWN',
    orderType: orderData.orderType || 'Pickup',
    paymentMethod: orderData.paymentMethod || 'M-PESA Till 4809304',
    mpesaCode: orderData.mpesaCode || 'PENDING',
    status: 'Pending',
    total: orderData.total || 0,
    items: orderData.items || [],
    notes: orderData.notes || '',
  };
  db.orders.unshift(newOrder);
  return newOrder;
}

export async function updateOrderStatus(id, status, notes) {
  const order = db.orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
  if (!order) return null;

  order.status = status;
  if (notes !== undefined) {
    order.staffNotes = notes;
  }
  order.updatedAt = new Date().toISOString();
  return order;
}

export async function getCustomers() {
  const customerMap = new Map();

  // Aggregate orders by normalized phone number or deviceId
  db.orders.forEach((o) => {
    const rawPhone = (o.phone || '').trim().replace(/\s+/g, '');
    const rawDev = (o.deviceId || '').trim();
    // Unique key: phone preferred, fallback to deviceId
    const key = rawPhone ? `phone_${rawPhone}` : (rawDev ? `dev_${rawDev}` : `ord_${o.id}`);

    if (!customerMap.has(key)) {
      customerMap.set(key, {
        key,
        customerName: o.customerName || 'Guest Customer',
        phone: o.phone || 'N/A',
        deviceId: o.deviceId || 'N/A',
        totalOrders: 0,
        totalSpent: 0,
        lastOrderAt: o.createdAt,
        orders: [],
      });
    }

    const cust = customerMap.get(key);
    // Keep most recent customer name if updated
    if (o.customerName && o.customerName !== 'Valued Customer' && o.customerName !== 'Guest Customer') {
      cust.customerName = o.customerName;
    }
    cust.totalOrders += 1;
    cust.totalSpent += (o.total || 0);
    if (new Date(o.createdAt) > new Date(cust.lastOrderAt)) {
      cust.lastOrderAt = o.createdAt;
    }
    cust.orders.push(o);
  });

  const customerList = Array.from(customerMap.values()).map((c) => ({
    ...c,
    orders: c.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  }));

  // Sort customers by latest order activity
  return customerList.sort((a, b) => new Date(b.lastOrderAt) - new Date(a.lastOrderAt));
}

export async function getStats() {
  const orders = db.orders;
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.total : sum), 0);
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === 'Completed').length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing').length;

  // Item popularity counter
  const itemCounts = {};
  orders.forEach((o) => {
    if (o.status !== 'Cancelled') {
      o.items.forEach((item) => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + (item.quantity || 1);
      });
    }
  });

  const topItems = Object.entries(itemCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalRevenue,
    totalOrders,
    completedOrders,
    pendingOrders,
    topItems,
  };
}

export async function getMenuItems() {
  return db.menu;
}

export async function updateMenuItem(id, updates) {
  const item = db.menu.find((m) => m.id === id);
  if (!item) return null;
  Object.assign(item, updates);
  return item;
}
