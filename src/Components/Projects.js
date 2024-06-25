import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { title: 'Project One', description: 'This is the description for project one.' },
  { title: 'Project Two', description: 'This is the description for project two.' },
  { title: 'Project Three', description: 'This is the description for project three.' },
];

const Projects = () => {
  return (
    <div className="my-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="p-4 bg-white rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p>{project.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
