import React, { useRef, Suspense, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register.jsx';
import MentorProfile from './pages/MentorProfile/MentorProfile';
import Search from './pages/Search/Search'
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "./pages/Room/Room";
import StudyGroup from "./pages/Study Group/StudyGroup";
import Navbar from "./pages/Navbar/Navbar";
import Form from "./pages/Form/Form";
import MenteeProfile from "./pages/MenteeProfile/MenteeProfile";
import { MyComponent } from "./components/loading";
// import { Model } from "./components/Models/Blender";
export default function App() {
  // const [action1, setAction1] = useState("aryan");

  return (
    <div>
      
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/form" element={<Form />} />
        <Route exact path="/profile/mentee" element={<MenteeProfile />} />
        <Route exact path="/studygroups" element={<StudyGroup />} />
        <Route exact path="/room" element={<Room />} />
        <Route exact path="/profile/mentor/:mail" element={<MentorProfile />} />
        <Route exact path="/profile/mentee/:mail" element={<MenteeProfile />} />
        <Route exact path="/room/:mail" element={<Room />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <MyComponent></MyComponent>
    </div>
  )
}
