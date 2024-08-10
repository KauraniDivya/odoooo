import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRooms } from '../redux/roomSlice';
import RoomCard from '../components/RoomCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const RoomListPage = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [capacityFilter, setCapacityFilter] = useState('');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterRooms(term, capacityFilter);
  };

  const handleCapacityFilter = (e) => {
    const capacity = e.target.value;
    setCapacityFilter(capacity);
    filterRooms(searchTerm, capacity);
  };

  const filterRooms = (term, capacity) => {
    const filtered = rooms.filter(room => 
      (room.name.toLowerCase().includes(term) ||
      room.tags.some(tag => tag.toLowerCase().includes(term))) &&
      (capacity === '' || room.seatCapacity >= parseInt(capacity))
    );
    setFilteredRooms(filtered);
  };

  if (loading) return <h1>Loading</h1>;
  if (error) return <div className="text-red-600 text-center text-xl">{error}</div>;

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
        Available Rooms
      </motion.h1>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="ml-4 bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        </div>
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-100 p-4 rounded-lg shadow-inner"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Capacity:
                <select 
                  value={capacityFilter} 
                  onChange={handleCapacityFilter}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Any</option>
                  <option value="5">5+</option>
                  <option value="10">10+</option>
                  <option value="20">20+</option>
                  <option value="50">50+</option>
                </select>
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {filteredRooms.map((room) => (
          <motion.div
            key={room._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <RoomCard room={room} />
          </motion.div>
        ))}
      </motion.div>
      {filteredRooms.length === 0 && (
        <p className="text-center text-gray-500 mt-8 text-xl">No rooms found matching your search criteria.</p>
      )}
    </motion.div>
  );
};

export default RoomListPage;