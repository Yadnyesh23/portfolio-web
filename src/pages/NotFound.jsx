import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#080808' }}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-8xl font-extrabold mb-4" style={{ color: '#1E1E1E' }}>404</div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: '#FFFFFF' }}>Page Not Found</h1>
          <p className="text-sm mb-8" style={{ color: '#A8A8A8' }}>The page you're looking for doesn't exist.</p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
            style={{ backgroundColor: '#4F7CFF', color: '#FFFFFF' }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
