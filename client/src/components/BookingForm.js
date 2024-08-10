import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../redux/bookingSlice';
import { FaCalendar, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const BookingForm = ({ room }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    if (room && room.availability) {
      const dates = room.availability.map(a => a.date);
      setAvailableDates(dates);
    }
  }, [room]);

  useEffect(() => {
    if (selectedDate && room && room.availability) {
      const selectedAvailability = room.availability.find(a => a.date === selectedDate);
      if (selectedAvailability) {
        setAvailableTimeSlots(selectedAvailability.timeSlots);
      } else {
        setAvailableTimeSlots([]);
      }
    }
  }, [selectedDate, room]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (timeSlot) => {
    if (!timeSlot.isBooked) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTimeSlot) {
      dispatch(createBooking({ roomId: room._id, date: selectedDate, timeSlot: selectedTimeSlot }));
    }
    navigate('/');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Book Your Room</h2>
      <div className="mb-6">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
          <FaCalendar className="mr-2 text-blue-600" />
          Select Date
        </label>
        <select
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          required
        >
          <option value="">Choose a date</option>
          {availableDates.map((date, index) => (
            <option key={index} value={date}>
              {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
          <FaClock className="mr-2 text-blue-600" />
          Available Time Slots
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableTimeSlots.map((slot, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => handleTimeSlotClick(slot)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                slot.isBooked
                  ? 'bg-red-100 text-red-800 cursor-not-allowed'
                  : slot === selectedTimeSlot
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
              }`}
              disabled={slot.isBooked}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {slot.start} - {slot.end}
            </motion.button>
          ))}
        </div>
      </div>
      <motion.button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={!selectedDate || !selectedTimeSlot}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaCheckCircle className="mr-2" />
        Confirm Booking
      </motion.button>
    </motion.form>
  );
};

export default BookingForm;