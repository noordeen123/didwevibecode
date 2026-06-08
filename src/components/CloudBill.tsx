import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function CloudBill() {
  const [bill, setBill] = useState(0);

  useEffect(() => {
    const handleClick = () => {
      setBill((prev) => (prev === 0 ? 5 : prev * 2.5 + 13));
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center shadow-lg backdrop-blur-md bg-opacity-80"
    >
      <div className="text-white font-semibold flex items-center gap-2">
        <span className="text-xl">☁️</span>
        <span>AWS / Vercel / Supabase Billing Estimate</span>
      </div>
      <div className="text-red-500 font-mono text-2xl font-bold">
        ${bill.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </motion.div>
  );
}
