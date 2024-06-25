import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      className="my-8 p-4 bg-gray-100 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <p className="text-lg">
        I am a passionate developer with experience in building responsive and animated web applications using modern web technologies.
      </p>
    </motion.div>
  );
};

export default About;
