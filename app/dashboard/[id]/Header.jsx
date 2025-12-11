
// components/dashboard/Header.jsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Search, Bell, ShoppingCart, User, Zap, Globe, BookOpen, Gift, HelpCircle, Settings, Menu, X
} from "lucide-react";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const notifications = 3;
  const router = useRouter();

  return (
    <motion.header
      {...fadeInUp}
      className="flex justify-between items-center p-4 bg-gray-900 text-white"
    >
      {/* paste your existing header markup here (from your file) */}
      <div className="flex items-center space-x-8">
        <motion.span
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-blue-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          TradePro
        </motion.span>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-blue-500 font-semibold flex items-center">
                <Zap className="mr-1" size={16} /> Explore
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center">
                <Globe className="mr-1" size={16} /> Investments
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center">
                <BookOpen className="mr-1" size={16} /> Learn
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="What are you looking for today?"
            className="pl-10 pr-4 py-2 bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Bell className="text-gray-300 hover:text-blue-500 transition-colors" />
          {notifications > 0 && (
            <motion.span
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {notifications}
            </motion.span>
          )}
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ShoppingCart className="text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <User className="text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
        </motion.div>
      </div>

      <div className="md:hidden">
        <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {isMenuOpen ? <X /> : <Menu />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 right-0 h-full w-64 bg-gray-800 p-4 z-50"
          >
            <motion.button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <X />
            </motion.button>
            <nav className="mt-8">
              <ul className="space-y-4">
                <li><a href="#" className="text-blue-500 font-semibold flex items-center"><Zap className="mr-2" size={16} /> Explore</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"><Globe className="mr-2" size={16} /> Investments</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"><BookOpen className="mr-2" size={16} /> Learn</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"><Gift className="mr-2" size={16} /> Rewards</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"><HelpCircle className="mr-2" size={16} /> Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center"><Settings className="mr-2" size={16} /> Settings</a></li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
