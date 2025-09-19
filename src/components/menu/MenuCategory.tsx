import React from 'react';
import { motion } from 'framer-motion';
import { MenuCategory as MenuCategoryType } from '../../data/menuData';
interface MenuCategoryProps {
  category: MenuCategoryType;
  isActive: boolean;
  onClick: () => void;
}
export const MenuCategory: React.FC<MenuCategoryProps> = ({
  category,
  isActive,
  onClick
}) => {
  return <motion.div className={`relative cursor-pointer rounded-xl overflow-hidden ${isActive ? 'ring-2 ring-orange-500' : ''}`} whileHover={{
    y: -5
  }} whileTap={{
    scale: 0.95
  }} onClick={onClick}>
      <div className="w-24 h-24 sm:w-32 sm:h-32">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
          <h3 className="text-white font-medium text-sm">{category.name}</h3>
        </div>
      </div>
    </motion.div>;
};