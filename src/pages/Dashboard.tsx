import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { MenuItem } from '../components/menu/MenuItem';
import { MenuCategory } from '../components/menu/MenuCategory';
import { ChatInterface } from '../components/chat/ChatInterface';
import { CartSidebar } from '../components/cart/CartSidebar';
import { categories, menuItems } from '../data/menuData';
import { restaurant } from '../data/restaurantData';
import { SearchIcon, ShoppingCartIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
export const Dashboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    totalItems
  } = useCart();
  // Filter items by active category and search query
  const filteredItems = menuItems.filter(item => (activeCategory === 'all' || item.category === activeCategory) && (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))));
  return <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero section */}
      <div className="relative h-64 bg-cover bg-center" style={{
      backgroundImage: `url(${restaurant.coverImage})`
    }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <div className="container mx-auto">
            <motion.h1 initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {restaurant.name}
            </motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="text-white text-lg max-w-xl">
              {restaurant.description}
            </motion.p>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="container mx-auto px-4 py-6 relative -mt-10">
        {/* Search and cart */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <input type="text" placeholder="Search menu..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} className="bg-orange-500 text-white px-4 py-3 rounded-xl shadow-md flex items-center space-x-2" onClick={() => setIsCartOpen(true)}>
            <ShoppingCartIcon size={18} />
            <span>Cart ({totalItems})</span>
          </motion.button>
        </div>
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Categories
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            <motion.div className={`relative cursor-pointer rounded-xl overflow-hidden ${activeCategory === 'all' ? 'ring-2 ring-orange-500' : ''}`} whileHover={{
            y: -5
          }} whileTap={{
            scale: 0.95
          }} onClick={() => setActiveCategory('all')}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-400 to-orange-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-medium text-sm">All Items</h3>
                </div>
              </div>
            </motion.div>
            {categories.map(category => <MenuCategory key={category.id} category={category} isActive={activeCategory === category.id} onClick={() => setActiveCategory(category.id)} />)}
          </div>
        </div>
        {/* Menu items */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {activeCategory === 'all' ? 'All Menu Items' : categories.find(c => c.id === activeCategory)?.name || 'Menu'}
            {searchQuery && ` • Search: "${searchQuery}"`}
          </h2>
          {filteredItems.length === 0 ? <div className="text-center py-12">
              <p className="text-gray-500">
                No items found. Try a different search or category.
              </p>
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => <MenuItem key={item.id} item={item} />)}
            </div>}
        </div>
      </div>
      {/* Chat interface */}
      <ChatInterface />
      {/* Cart sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>;
};