import React from 'react'
import { Route, Navigate } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import MentorProfile from './pages/MentorProfile/MentorProfile';
export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/mentor-profile" element={<MentorProfile />} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </div>
  )
}
