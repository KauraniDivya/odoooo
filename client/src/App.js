import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import RoomList from './pages/RoomList';
import RoomDetailPage from './pages/RoomDetails';
import Bookings from './pages/Bookings';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;