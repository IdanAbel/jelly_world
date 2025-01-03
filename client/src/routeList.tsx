import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import React from 'react';
import Profile from './Pages/Profile';

const RouteList: React.FC = () => (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/profile' element={<Profile />} />
  </Routes>
);

export default RouteList;
