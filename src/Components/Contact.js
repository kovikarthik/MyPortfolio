import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div 
      className="my-8 p-4 bg-gray-100 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
      <form className="flex flex-col space-y-4">
        <input 
          className="p-2 rounded border border-gray-300"
          type="text"
          placeholder="Your Name"
        />
        <input 
          className="p-2 rounded border border-gray-300"
          type="email"
          placeholder="Your Email"
        />
        <textarea 
          className="p-2 rounded border border-gray-300"
          placeholder="Your Message"
        />
        <button 
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default Contact;
