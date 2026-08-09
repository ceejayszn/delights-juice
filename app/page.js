'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ColdPressedBenefits from '@/components/ColdPressedBenefits';
import MenuCatalog from '@/components/MenuCatalog';
import CartDrawer from '@/components/CartDrawer';
import MpesaModal from '@/components/MpesaModal';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import MobileStickyBar from '@/components/MobileStickyBar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mpesaModalOpen, setMpesaModalOpen] = useState(false);
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState(null);

  const handleAddToCart = (itemWithConfig) => {
    setCart((prev) => {
      // Check if item with same ID and size exists
      const existingIndex = prev.findIndex(
        (i) => i.id === itemWithConfig.id && i.selectedSize === itemWithConfig.selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, { ...itemWithConfig, quantity: 1 }];
      }
    });

    setCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSuccessOrder = (order) => {
    setLastSubmittedOrder(order);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuickOrder = (itemWithConfig) => {
    // Single-click order: set cart directly to this item (or append) and open cart drawer immediately
    setCart([{ ...itemWithConfig, quantity: 1 }]);
    setCartOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col pb-16 sm:pb-0">
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenMpesa={() => setMpesaModalOpen(true)}
      />
      
      <main className="flex-1">
        <Hero onOpenMpesa={() => setMpesaModalOpen(true)} />
        <ColdPressedBenefits />
        <MenuCatalog
          onAddToCart={handleAddToCart}
          onQuickOrder={handleQuickOrder}
          onOpenMpesa={() => setMpesaModalOpen(true)}
        />
      </main>

      <Footer />

      {/* Mobile Bottom Fixed Action Bar */}
      <MobileStickyBar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenMpesa={() => setMpesaModalOpen(true)}
      />

      {/* Cart Slide-Over */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onSuccessOrder={handleSuccessOrder}
      />

      {/* M-PESA Payment Guidance Modal */}
      <MpesaModal
        isOpen={mpesaModalOpen}
        onClose={() => setMpesaModalOpen(false)}
      />

      {/* Order Success Confirmation & WhatsApp Dispatch Modal */}
      <OrderSuccessModal
        isOpen={!!lastSubmittedOrder}
        onClose={() => setLastSubmittedOrder(null)}
        order={lastSubmittedOrder}
      />
    </div>
  );
}


