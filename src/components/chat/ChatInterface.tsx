import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendIcon, XIcon, ShoppingCartIcon, MessageSquareIcon } from 'lucide-react';
import { MenuItem, menuItems } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { CartSidebar } from '../cart/CartSidebar';
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  menuItems?: MenuItem[];
}
export const ChatInterface: React.FC = () => {
  const [isFullChatOpen, setIsFullChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    text: "👋 Hi there! I'm your AI assistant. Ask me about our menu items or type a food you're interested in!",
    sender: 'bot',
    timestamp: new Date()
  }]);
  const {
    addItem
  } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    if (isFullChatOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isFullChatOpen, messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    // Open full chat if it's not already open
    if (!isFullChatOpen) {
      setIsFullChatOpen(true);
    }
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    // Process message and generate response
    setTimeout(() => {
      const query = inputValue.toLowerCase();
      const matchedItems = menuItems.filter(item => item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.tags.some(tag => tag.toLowerCase().includes(query)) || item.category.toLowerCase().includes(query));
      let botResponse: Message;
      if (matchedItems.length > 0) {
        botResponse = {
          id: `bot-${Date.now()}`,
          text: `I found ${matchedItems.length} item(s) that might interest you:`,
          sender: 'bot',
          timestamp: new Date(),
          menuItems: matchedItems.slice(0, 3) // Limit to 3 items
        };
      } else if (query.includes('add to cart')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          text: "I've added the item to your cart! Anything else you'd like to try?",
          sender: 'bot',
          timestamp: new Date()
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          text: "I'm not sure what you're looking for. Try asking about burgers, pizzas, salads, desserts, or drinks!",
          sender: 'bot',
          timestamp: new Date()
        };
      }
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    // Add confirmation message
    const confirmationMessage: Message = {
      id: `bot-confirmation-${Date.now()}`,
      text: `Great choice! Added ${item.name} to your cart.`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const closeChatView = () => {
    setIsFullChatOpen(false);
  };
  return <>
      {/* Floating Chat Input Bar (shown when full chat is closed) */}
      <AnimatePresence>
        {!isFullChatOpen && <motion.div className="fixed bottom-8 left-0 right-0 mx-auto w-1/2 z-30" initial={{
        y: 100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} exit={{
        y: 100,
        opacity: 0
      }} transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300
      }}>
            <motion.div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center p-2 pl-5" whileHover={{
          y: -4
        }} style={{
          boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.08)',
          transform: 'perspective(1000px) rotateX(2deg)'
        }}>
              <MessageSquareIcon size={20} className="text-orange-500 mr-3" />
              <input type="text" className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400" placeholder="Ask me about our menu..." value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
              <motion.button className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={handleSendMessage}>
                <SendIcon size={16} />
              </motion.button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      {/* Full Chat View with Cart */}
      <AnimatePresence>
        {isFullChatOpen && <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }}>
            <motion.div className="bg-white w-[95%] h-[90%] max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex" initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} transition={{
          type: 'spring',
          damping: 25
        }}>
              {/* Chat Section */}
              <div className="flex-1 flex flex-col h-full">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-orange-50">
                  <div>
                    <h3 className="font-medium text-orange-600">
                      AI Food Assistant
                    </h3>
                    <p className="text-xs text-gray-500">
                      Ask me about our menu!
                    </p>
                  </div>
                  <button onClick={closeChatView} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <XIcon size={20} className="text-gray-600" />
                  </button>
                </div>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map(message => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-4 ${message.sender === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                        <p className="text-sm">{message.text}</p>
                        {/* Menu items display */}
                        {message.menuItems && message.menuItems.length > 0 && <div className="mt-3 space-y-3">
                            {message.menuItems.map(item => <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm">
                                <div className="flex items-center space-x-3">
                                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-800">
                                      {item.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                      ${item.price.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                      {item.description}
                                    </p>
                                  </div>
                                  <Button size="sm" onClick={() => handleAddToCart(item)} icon={<ShoppingCartIcon size={14} />}>
                                    Add
                                  </Button>
                                </div>
                              </div>)}
                          </div>}
                      </div>
                    </div>)}
                  <div ref={messagesEndRef} />
                </div>
                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <input ref={inputRef} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message..." className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <motion.button className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center" whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} onClick={handleSendMessage}>
                      <SendIcon size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>
              {/* Cart Section */}
              <div className="w-[350px] border-l border-gray-200 hidden md:block">
                <div className="h-full">
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-gray-800">
                        Your Cart
                      </h2>
                      <button onClick={() => setIsCartOpen(true)} className="text-orange-500 text-sm font-medium">
                        View Full Cart
                      </button>
                    </div>
                  </div>
                  <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
                    <CartPreview />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      {/* Mobile Cart Button (visible in full chat view on mobile) */}
      {isFullChatOpen && <div className="md:hidden fixed bottom-6 right-6 z-50">
          <motion.button className="bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg" whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={() => setIsCartOpen(true)}>
            <ShoppingCartIcon size={24} />
          </motion.button>
        </div>}
      {/* Full Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>;
};
// Cart Preview Component for the side panel
const CartPreview = () => {
  const {
    items,
    subtotal,
    tax,
    total
  } = useCart();
  if (items.length === 0) {
    return <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="bg-orange-100 rounded-full p-3 mb-4">
          <ShoppingCartIcon size={24} className="text-orange-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">
          Your cart is empty
        </h3>
        <p className="text-gray-500">Add items from our menu to get started</p>
      </div>;
  }
  return <div className="space-y-4">
      {items.slice(0, 4).map(item => <div key={item.id} className="flex items-center space-x-3 pb-3 border-b border-gray-100">
          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">
                {item.quantity} × ${item.price.toFixed(2)}
              </span>
              <span className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>)}
      {items.length > 4 && <div className="text-center text-sm text-gray-500">
          +{items.length - 4} more items
        </div>}
      <div className="pt-3 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-100 font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>;
};