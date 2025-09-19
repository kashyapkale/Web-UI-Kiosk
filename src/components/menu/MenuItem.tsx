import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
interface MenuItemProps {
  item: MenuItemType;
}
export const MenuItem: React.FC<MenuItemProps> = ({
  item
}) => {
  const {
    addItem
  } = useCart();
  return <motion.div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300" whileHover={{
    y: -5
  }} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }}>
      <div className="relative h-48 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        {item.popular && <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Popular
          </div>}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 text-lg">{item.name}</h3>
          <span className="font-bold text-orange-500">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {item.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map(tag => <span key={tag} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>)}
          </div>
          <motion.button className="bg-orange-500 text-white p-2 rounded-full" whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={() => addItem(item)}>
            <PlusIcon size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>;
};