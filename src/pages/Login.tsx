import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { UserIcon, LockIcon, AlertCircleIcon } from 'lucide-react';
export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    login,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try user@example.com / password');
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex flex-col justify-center items-center p-4">
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="text-center mb-8">
        <motion.div initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 0.3,
        type: 'spring',
        stiffness: 200
      }} className="w-24 h-24 bg-white rounded-full mx-auto mb-4 shadow-lg overflow-hidden">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop" alt="Restaurant Logo" className="w-full h-full object-cover" />
        </motion.div>
        <motion.h1 initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.5
      }} className="text-3xl font-bold text-orange-600">
          Savory Bites
        </motion.h1>
        <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.6
      }} className="text-gray-600">
          Welcome to our AI-powered ordering kiosk
        </motion.p>
      </motion.div>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.7,
      duration: 0.5
    }} className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Log In
        </h2>
        {error && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <AlertCircleIcon className="text-red-500 mr-2" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </motion.div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" label="Email" placeholder="user@example.com" value={email} onChange={e => setEmail(e.target.value)} icon={<UserIcon size={18} />} fullWidth autoComplete="email" />
          <Input type="password" label="Password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} icon={<LockIcon size={18} />} fullWidth autoComplete="current-password" />
          <div className="pt-2">
            <Button type="submit" fullWidth disabled={isLoading} className="mt-2">
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </div>
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Demo credentials:</p>
            <p>Email: user@example.com</p>
            <p>Password: password</p>
          </div>
        </form>
      </motion.div>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1,
      duration: 1
    }} className="mt-10 max-w-lg">
        <div className="grid grid-cols-4 gap-3">
          {['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500&auto=format&fit=crop', 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=500&auto=format&fit=crop'].map((src, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 1 + index * 0.2
        }} className="h-16 rounded-lg overflow-hidden shadow-md">
              <img src={src} alt="Food" className="w-full h-full object-cover" />
            </motion.div>)}
        </div>
      </motion.div>
    </div>;
};