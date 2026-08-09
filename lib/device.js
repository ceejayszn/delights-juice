// Client-Side Device Identification & Contact Memory Helper

const DEVICE_KEY = 'pash_device_id';
const CUSTOMER_INFO_KEY = 'pash_customer_info';

/**
 * Returns or generates a persistent device UUID stored in localStorage.
 */
export function getDeviceId() {
  if (typeof window === 'undefined') return 'SSR_SERVER_DEVICE';
  
  let deviceId = localStorage.getItem(DEVICE_KEY);
  if (!deviceId) {
    // Generate UUID-like string
    deviceId = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem(DEVICE_KEY, deviceId);
  }
  return deviceId;
}

/**
 * Returns cached customer contact info (name, phone) saved on previous order.
 */
export function getSavedCustomerInfo() {
  if (typeof window === 'undefined') return { name: '', phone: '' };
  try {
    const raw = localStorage.getItem(CUSTOMER_INFO_KEY);
    return raw ? JSON.parse(raw) : { name: '', phone: '' };
  } catch (e) {
    return { name: '', phone: '' };
  }
}

/**
 * Saves customer contact info to localStorage for future zero-friction ordering.
 */
export function saveCustomerInfo(name, phone) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CUSTOMER_INFO_KEY, JSON.stringify({ name, phone }));
  } catch (e) {
    console.error('Failed to save customer info:', e);
  }
}
