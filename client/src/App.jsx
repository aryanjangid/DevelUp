import React from 'react'
import { Route, Navigate } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register.jsx';
import MentorProfile from './pages/MentorProfile/MentorProfile';
import Search from './pages/Search/Search'
export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/profile/:mail" element={<MentorProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}
