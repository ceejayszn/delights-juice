// ========================================================
// DELIGHT JUICE BAR — LIGHTWEIGHT & ULTRA-FAST JS ENGINE
// ========================================================

const TILL_NUMBER = "4809304";
const PHONE_NUMBER = "+254 798 169278";

// --- NAV DRAWER TOGGLE ---
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) closeNav();
  });
}

function closeNav() {
  if (burger) burger.classList.remove('open');
  if (navLinks) navLinks.classList.remove('open');
}

// --- MODAL ENGINE ---
const payModal = document.getElementById('payModal');
const modalChoiceView = document.getElementById('modalChoiceView');
const modalPayView = document.getElementById('modalPayView');

function openPayModal(view = 'choice') {
  switchModalView(view);
  if (payModal) payModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePayModal() {
  if (payModal) payModal.classList.remove('active');
  document.body.style.overflow = '';
}

function switchModalView(view) {
  if (view === 'choice') {
    if (modalChoiceView) modalChoiceView.style.display = 'block';
    if (modalPayView) modalPayView.style.display = 'none';
  } else {
    if (modalChoiceView) modalChoiceView.style.display = 'none';
    if (modalPayView) modalPayView.style.display = 'block';
  }
}

// Close modal on background overlay click
if (payModal) {
  payModal.addEventListener('click', (e) => {
    if (e.target === payModal) closePayModal();
  });
}

// Escape key listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePayModal();
    closeOrderModal();
  }
});

// --- ORDER MODAL ENGINE ---
const orderModal = document.getElementById('orderModal');
const orderItemName = document.getElementById('orderItemName');

function openOrderModal(itemName = 'Delight Raw Juice') {
  if (orderItemName) {
    orderItemName.value = itemName;
  }
  if (orderModal) {
    orderModal.classList.add('active');
  }
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  if (orderModal) {
    orderModal.classList.remove('active');
  }
  document.body.style.overflow = '';
}

if (orderModal) {
  orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) closeOrderModal();
  });
}

function handleSendOrder(e) {
  e.preventDefault();
  const item = document.getElementById('orderItemName')?.value || 'Juice';
  const size = document.getElementById('orderItemSize')?.value || 'Large';
  const name = document.getElementById('orderCustomerName')?.value || 'Valued Customer';
  const phone = document.getElementById('orderCustomerPhone')?.value || '';
  const fulfillment = document.querySelector('input[name="fulfillment"]:checked')?.value || 'Takeaway Pickup';

  const text = `Hello Delight Juice Bar! 🍹✨\n\n` +
               `I'd like to place an order:\n` +
               `🧃 *Item:* ${item}\n` +
               `🥤 *Size:* ${size}\n` +
               `📦 *Fulfillment:* ${fulfillment}\n` +
               `👤 *Name:* ${name}\n` +
               `📞 *Phone:* ${phone}\n` +
               `💳 *Payment:* M-PESA Till 4809304\n\n` +
               `Please confirm my order! Thank you 🙏`;

  const whatsappUrl = `https://wa.me/254798169278?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
  showToast(`Order created for ${name}! Opening WhatsApp...`);
  closeOrderModal();
}

// --- CLIPBOARD COPY FUNCTIONS ---
function copyTillNumber() {
  navigator.clipboard.writeText(TILL_NUMBER).then(() => {
    showToast(`Till No. ${TILL_NUMBER} copied to clipboard!`);
    
    const copyBtnText = document.getElementById('copyBtnText');
    const copyBtnIcon = document.getElementById('copyBtnIcon');
    if (copyBtnText && copyBtnIcon) {
      copyBtnText.textContent = "Copied! ✓";
      copyBtnIcon.textContent = "✅";
      setTimeout(() => {
        copyBtnText.textContent = "Copy Till Number";
        copyBtnIcon.textContent = "📋";
      }, 2500);
    }
  }).catch(() => {
    // Fallback if clipboard API fails
    showToast(`M-PESA Till: ${TILL_NUMBER}`);
  });
}

function copyPhone() {
  navigator.clipboard.writeText(PHONE_NUMBER.replace(/\s+/g, '')).then(() => {
    showToast(`Phone ${PHONE_NUMBER} copied!`);
  }).catch(() => {
    showToast(`Phone: ${PHONE_NUMBER}`);
  });
}

// --- SCROLL TO MENU ---
function scrollToMenu() {
  const menuSec = document.getElementById('juices');
  if (menuSec) {
    menuSec.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- TOAST NOTIFICATION ENGINE ---
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// --- SCROLL SHADOW PERFORMANCE OPTIMIZATION ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) {
    nav.style.boxShadow = window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,0.08)' : 'none';
  }
}, { passive: true });

// --- AUTO LAUNCH POPUP ON FIRST VISIT / QR SCAN ---
window.addEventListener('DOMContentLoaded', () => {
  // Show welcome popup choice modal automatically when customer opens site
  setTimeout(() => {
    openPayModal('choice');
  }, 400);
});
