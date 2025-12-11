// components/dashboard/Breadcrumb.jsx
"use client";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Breadcrumb = ({ stock }) => {
  return (
    <motion.div
      {...fadeInUp}
      className="flex items-center space-x-2 text-sm text-gray-400 my-4"
    >
      <a href="/" className="hover:text-blue-500">Home</a>
      <span>/</span>
      <a href="/dashboard" className="hover:text-blue-500">Dashboard</a>
      <span>/</span>
      <span className="text-blue-500">{stock}</span>
    </motion.div>
  );
};

export default Breadcrumb;
