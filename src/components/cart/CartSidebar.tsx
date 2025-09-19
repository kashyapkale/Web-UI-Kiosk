import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, TrashIcon, PlusIcon, MinusIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose
}) => {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    tax,
    total
  } = useCart();
  const navigate = useNavigate();
  const handleCheckout = () => {
    onClose();
    navigate('/confirmation');
  };
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-40" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} />
          {/* Sidebar */}
          <motion.div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col" initial={{
        x: '100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '100%'
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300
      }}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                <XIcon size={24} className="text-gray-600" />
              </button>
            </div>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <div className="bg-orange-100 rounded-full p-3 mb-4">
                    <TrashIcon size={24} className="text-orange-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add items from our menu to get started
                  </p>
                  <Button onClick={onClose}>Browse Menu</Button>
                </div> : <div className="space-y-4">
                  {items.map(item => <div key={item.id} className="flex border-b border-gray-100 pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800">
                            {item.name}
                          </h3>
                          <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                            <TrashIcon size={16} />
                          </button>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-100 p-1 rounded-full">
                            <MinusIcon size={14} />
                          </button>
                          <span className="mx-3 text-gray-800 font-medium">
                            {item.quantity}
                          </span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-100 p-1 rounded-full">
                            <PlusIcon size={14} />
                          </button>
                          <div className="ml-auto font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>}
            </div>
            {/* Summary */}
            {items.length > 0 && <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200 mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button fullWidth onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </div>}
          </motion.div>
        </>}
    </AnimatePresence>;
};