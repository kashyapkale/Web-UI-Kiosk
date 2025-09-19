export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
  socialMedia: {
    [key: string]: string;
  };
}
export const restaurant: Restaurant = {
  id: 'savory-bites',
  name: 'Savory Bites',
  logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
  description: 'A modern restaurant offering delicious, fresh food made with locally-sourced ingredients. Our menu features a variety of dishes to satisfy every palate.',
  address: '123 Main Street, Foodville, CA 90210',
  phone: '(555) 123-4567',
  email: 'info@savorybites.com',
  hours: {
    Monday: '11:00 AM - 9:00 PM',
    Tuesday: '11:00 AM - 9:00 PM',
    Wednesday: '11:00 AM - 9:00 PM',
    Thursday: '11:00 AM - 10:00 PM',
    Friday: '11:00 AM - 11:00 PM',
    Saturday: '10:00 AM - 11:00 PM',
    Sunday: '10:00 AM - 9:00 PM'
  },
  socialMedia: {
    instagram: 'savorybites',
    facebook: 'SavoryBitesRestaurant',
    twitter: 'SavoryBites'
  }
};