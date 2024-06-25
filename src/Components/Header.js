import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 via-blue-700  via-blue-600 from-blue-900 via-blue-500 from-blue-900 via-blue-600  Via-blue-700 Via-blue-800 to-blue-900 text-white py-4 shadow ">
      <motion.h1 
        className="text-4xl font-bold text-center "
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        Welcome
      </motion.h1>
    </header>
  );
};

export default Header;
