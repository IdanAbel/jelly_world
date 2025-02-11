import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Profile from './Pages/Profile';
import Home from "./Pages/Home";
import CandyInsert from "./Pages/CandyInsert";
import CandyEdit from "./Pages/CandyEdit";
import Register from './Pages/Register';
import Login from './Pages/Login';
import Reviews from './Components/reviews';

const RouteList: React.FC = () => (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/candy-insert' element={<CandyInsert/>}/>
        <Route path='/admin/candy/:id/edit' element={<CandyEdit/>}/>
        <Route path="/reviews" element={<Reviews />} />
        <Route path='/' element={<Home/>}/>
    </Routes>
);

export default RouteList;
