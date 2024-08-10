import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import roomReducer from '../redux/roomSlic';
import bookingReducer from '../redux/bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
  },
});

export default store;