import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchRooms } from '../redux/roomSlic';
import BookingForm from '../components/BookingForm';
import { FaUser, FaTag, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

const RoomDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [dispatch, rooms]);

  const room = rooms.find((r) => r._id === id);

  if (loading) return <h1>Loading</h1>;
  if (error) return <div className="text-red-600 text-center text-xl">{error}</div>;
  if (!room) return <div className="text-center text-xl">Room not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12"
    >
      <motion.h1 
        className="text-4xl font-extrabold mb-8 text-center text-blue-900"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {room.name}
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <img src={`https://i.ibb.co/NrJBCgV/2177.jpg,${room.name}`} alt={room.name} className="w-full h-80 object-cover rounded-xl shadow-lg" />
          <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Room Details</h2>
            <p className="flex items-center mb-3 text-gray-700">
              <FaUser className="mr-3 text-blue-600" />
              <span className="font-semibold">{room.seatCapacity} seats</span>
            </p>
            <p className="flex items-center mb-3 text-gray-700">
              <FaMapMarkerAlt className="mr-3 text-blue-600" />
              <span className="font-semibold">Location: {room.location || 'Not specified'}</span>
            </p>
            <p className="flex items-center mb-3 text-gray-700">
              <FaInfoCircle className="mr-3 text-blue-600" />
              <span className="font-semibold">Description: {room.description || 'No description available'}</span>
            </p>
            <div className="flex flex-wrap mt-4">
              {room.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full flex items-center">
                  <FaTag className="mr-1" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Book this room</h2>
            <BookingForm room={room} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoomDetailPage;