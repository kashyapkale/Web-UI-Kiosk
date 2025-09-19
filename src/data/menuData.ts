export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  tags: string[];
}
export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}
export const categories: MenuCategory[] = [{
  id: 'burgers',
  name: 'Burgers',
  description: 'Juicy, flavorful burgers made with premium ingredients',
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2070&auto=format&fit=crop'
}, {
  id: 'pizzas',
  name: 'Pizzas',
  description: 'Hand-tossed pizzas with artisanal toppings',
  image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop'
}, {
  id: 'salads',
  name: 'Salads',
  description: 'Fresh, crisp salads with house-made dressings',
  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop'
}, {
  id: 'desserts',
  name: 'Desserts',
  description: 'Decadent desserts to satisfy your sweet tooth',
  image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop'
}, {
  id: 'drinks',
  name: 'Drinks',
  description: 'Refreshing beverages for every taste',
  image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1974&auto=format&fit=crop'
}];
export const menuItems: MenuItem[] = [{
  id: 'burger-1',
  name: 'Classic Cheeseburger',
  description: 'Angus beef patty, cheddar cheese, lettuce, tomato, and special sauce on a brioche bun',
  price: 12.99,
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2070&auto=format&fit=crop',
  category: 'burgers',
  popular: true,
  tags: ['beef', 'cheese', 'classic']
}, {
  id: 'burger-2',
  name: 'Bacon Avocado Burger',
  description: 'Angus beef patty, crispy bacon, avocado, swiss cheese, and garlic aioli',
  price: 15.99,
  image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1780&auto=format&fit=crop',
  category: 'burgers',
  popular: true,
  tags: ['beef', 'bacon', 'avocado']
}, {
  id: 'burger-3',
  name: 'Mushroom Swiss Burger',
  description: 'Angus beef patty, sautéed mushrooms, swiss cheese, and truffle aioli',
  price: 14.99,
  image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop',
  category: 'burgers',
  popular: false,
  tags: ['beef', 'mushroom', 'swiss']
}, {
  id: 'pizza-1',
  name: 'Margherita Pizza',
  description: 'San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil',
  price: 14.99,
  image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop',
  category: 'pizzas',
  popular: true,
  tags: ['vegetarian', 'classic', 'cheese']
}, {
  id: 'pizza-2',
  name: 'Pepperoni Pizza',
  description: 'Tomato sauce, mozzarella, and artisanal pepperoni',
  price: 16.99,
  image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2080&auto=format&fit=crop',
  category: 'pizzas',
  popular: true,
  tags: ['pepperoni', 'classic', 'cheese']
}, {
  id: 'pizza-3',
  name: 'Vegetable Supreme Pizza',
  description: 'Tomato sauce, mozzarella, bell peppers, onions, mushrooms, olives, and artichokes',
  price: 17.99,
  image: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?q=80&w=1974&auto=format&fit=crop',
  category: 'pizzas',
  popular: false,
  tags: ['vegetarian', 'vegetables']
}, {
  id: 'salad-1',
  name: 'Caesar Salad',
  description: 'Romaine lettuce, parmesan cheese, croutons, and caesar dressing',
  price: 9.99,
  image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=1990&auto=format&fit=crop',
  category: 'salads',
  popular: true,
  tags: ['classic', 'vegetarian']
}, {
  id: 'salad-2',
  name: 'Greek Salad',
  description: 'Mixed greens, cucumber, tomato, red onion, kalamata olives, and feta cheese',
  price: 10.99,
  image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=1964&auto=format&fit=crop',
  category: 'salads',
  popular: false,
  tags: ['vegetarian', 'mediterranean']
}, {
  id: 'dessert-1',
  name: 'Chocolate Lava Cake',
  description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
  price: 8.99,
  image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop',
  category: 'desserts',
  popular: true,
  tags: ['chocolate', 'hot', 'ice cream']
}, {
  id: 'dessert-2',
  name: 'New York Cheesecake',
  description: 'Creamy cheesecake with a graham cracker crust, topped with fresh berries',
  price: 7.99,
  image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2070&auto=format&fit=crop',
  category: 'desserts',
  popular: true,
  tags: ['cheesecake', 'berries']
}, {
  id: 'drink-1',
  name: 'Fresh Lemonade',
  description: 'Freshly squeezed lemons with a hint of mint',
  price: 3.99,
  image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1974&auto=format&fit=crop',
  category: 'drinks',
  popular: true,
  tags: ['refreshing', 'cold', 'non-alcoholic']
}, {
  id: 'drink-2',
  name: 'Craft IPA',
  description: 'Locally brewed IPA with citrus and pine notes',
  price: 6.99,
  image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=2070&auto=format&fit=crop',
  category: 'drinks',
  popular: false,
  tags: ['alcoholic', 'beer']
}];