import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { restaurant } from '../../data/restaurantData';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { ShoppingCartIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
export const Header: React.FC = () => {
  const {
    isAuthenticated,
    logout,
    user
  } = useAuth();
  const {
    totalItems
  } = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div className="flex items-center cursor-pointer" onClick={() => isAuthenticated && navigate('/dashboard')} whileHover={{
        scale: 1.03
      }} whileTap={{
        scale: 0.97
      }}>
          <img src={restaurant.logo} alt={restaurant.name} className="h-10 w-10 rounded-full object-cover mr-2" />
          <h1 className="text-xl font-bold text-orange-600">
            {restaurant.name}
          </h1>
        </motion.div>
        {isAuthenticated && <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <UserIcon size={16} className="text-gray-600 mr-1" />
              <span className="text-sm text-gray-600">
                {user?.name || 'Guest'}
              </span>
            </div>
            <motion.div className="relative cursor-pointer" whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.95
        }} onClick={() => navigate('/dashboard')}>
              <ShoppingCartIcon size={22} className="text-orange-600" />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>}
            </motion.div>
            <Button variant="ghost" size="sm" onClick={handleLogout} icon={<LogOutIcon size={16} />} className="text-gray-600">
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>}
      </div>
    </header>;
};