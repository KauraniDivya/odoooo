import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomListPage from './pages/RoomListPage';
import RoomDetailPage from './pages/RoomDetailsPage';
import BookingsPage from './pages/BookingsPage';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/rooms" element={<RoomListPage />} />
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;