import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendar, FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-100 to-white"
    >
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-5xl font-extrabold mb-8 text-center text-blue-900"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to <span className="text-blue-600">Room</span>Booking
        </motion.h1>
        <motion.p 
          className="text-xl text-center text-gray-700 mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Find and book the perfect room for your needs
        </motion.p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-800">
              <FaSearch className="mr-3 text-blue-600" /> Find a Room
            </h2>
            <p className="mb-6 text-gray-600">Browse our selection of available rooms and find the perfect space for your needs.</p>
            <Link to="/rooms" className="inline-flex items-center bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
              View Rooms <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-800">
              <FaCalendar className="mr-3 text-blue-600" /> Manage Bookings
            </h2>
            <p className="mb-6 text-gray-600">View and manage your room bookings in one convenient place.</p>
            <Link to="/bookings" className="inline-flex items-center bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
              My Bookings <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;