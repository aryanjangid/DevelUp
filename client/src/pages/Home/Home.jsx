import React, { Suspense } from 'react';
import Button from '../../components/Button'

import Model from '../../components/Models/Team';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Home() {
  return (
    <div>
      <h1 style={{ color: "black" }}>Home</h1>
      <Button name="login" to="login"></Button>
      <Button name="mentor-profile" to="mentor-profile"></Button>
      <Canvas style={{height: "30rem"}}>
        <OrbitControls enableDamping={true} enableZoom={true} />

        <directionalLight position={[4, 5, 2]} intensity={1} color="#F32053" />
        <directionalLight position={[-4, -5, -2]} intensity={1} color="#A8ECF0" />
        <directionalLight position={[4, -5, 2]} intensity={1} color="#407BFF" />

        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  )
}
