import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaSignOutAlt, FaHotel, FaCalendarAlt, FaCog } from 'react-icons/fa';
import { logout } from '../redux/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold tracking-tight">
            <span className="text-yellow-400">Room</span>Booking
          </Link>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link to="/rooms" className="flex items-center hover:text-yellow-400 transition duration-300">
                  <FaHotel className="mr-2" /> Rooms
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/bookings" className="flex items-center hover:text-yellow-400 transition duration-300">
                      <FaCalendarAlt className="mr-2" /> My Bookings
                    </Link>
                  </li>
                    
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/login" 
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    <FaUser className="mr-2" /> Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;