import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendar, FaClock, FaUser } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Find Your Perfect Room</h1>
            <p className="text-xl mb-8">Discover and book rooms tailored to your needs</p>
            <Link 
              to="/rooms" 
              className="bg-white text-blue-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RoomBooking</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FaSearch, title: "Easy Search", description: "Find rooms quickly with our intuitive search" },
              { icon: FaCalendar, title: "Flexible Booking", description: "Book rooms on your schedule" },
              { icon: FaClock, title: "24/7 Availability", description: "Access rooms any time, day or night" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <feature.icon className="text-4xl text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your Room?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied users who have found their perfect space</p>
          <Link 
            to="/signup" 
            className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center"
          >
            Sign Up Now <FaUser className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;