import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ArrowLeftIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { restaurant } from '../data/restaurantData';
export const OrderConfirmation: React.FC = () => {
  const {
    items,
    subtotal,
    tax,
    total,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  const orderNumber = `SB-${Math.floor(10000 + Math.random() * 90000)}`;
  const estimatedTime = '25-35 minutes';
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    // If no items in cart, redirect to dashboard
    if (items.length === 0) {
      navigate('/dashboard');
    }
  }, [items.length, navigate]);
  const handleNewOrder = () => {
    clearCart();
    navigate('/dashboard');
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Success header */}
          <div className="bg-green-500 p-6 text-white text-center">
            <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 200
          }} className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
              <CheckCircleIcon size={40} className="text-green-500" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="opacity-90">
              Your order has been successfully placed
            </p>
          </div>
          {/* Order details */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h2 className="text-gray-500 text-sm">Order Number</h2>
                <p className="text-lg font-bold">{orderNumber}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <ClockIcon size={18} className="text-orange-500 mr-2" />
                <div>
                  <h2 className="text-gray-500 text-sm">Estimated Time</h2>
                  <p className="font-medium">{estimatedTime}</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 mb-6">
              <div className="flex items-start mb-4">
                <MapPinIcon size={18} className="text-orange-500 mr-2 mt-1" />
                <div>
                  <h2 className="text-gray-500 text-sm">Pickup Location</h2>
                  <p className="font-medium">{restaurant.name}</p>
                  <p className="text-gray-500 text-sm">{restaurant.address}</p>
                </div>
              </div>
            </div>
            {/* Order summary */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map(item => <div key={item.id} className="flex justify-between">
                    <div className="flex">
                      <span className="text-gray-800 font-medium">
                        {item.quantity}x
                      </span>
                      <span className="ml-2">{item.name}</span>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>)}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100 mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="mt-8 space-y-4">
              <Button fullWidth onClick={handleNewOrder}>
                Place New Order
              </Button>
              <Button variant="outline" fullWidth onClick={() => navigate('/dashboard')} icon={<ArrowLeftIcon size={16} />}>
                Return to Menu
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
};