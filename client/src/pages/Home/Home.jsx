import React, { Suspense } from 'react';
import Button from '../../components/Button'
import classes from './home.module.css'
import Model from '../../components/Models/Team';
import background from '../../Assets/chatsbackground.png'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Home() {
  return (
    <div >
      {/* <h1 style={{ color: "black" }}>Home</h1>
      <Button name="login" to="login"></Button>
      <Button name="mentor-profile" to="mentor-profile"></Button> */}
      <div className={classes.landingDiv}>
        <div className={classes.landingLeftDiv}>
          <h1><span>MENTORING AND HELPING</span> EACH OTHER TO LEARN NEW SKILLS</h1>
          <h2 >We are building a robust and influential network that will assist juniors in connecting with and learning from their mentors </h2>
          <div style={{marginTop:"3rem"}}><Button center="1" name="Explore" to="/search"></Button></div>
        </div>
        <div className={classes.threejsDiv}>
          <Canvas>
            <OrbitControls enableDamping={true} enableZoom={true} />

            <directionalLight position={[4, 5, 2]} intensity={1} color="#F32053" />
            <directionalLight position={[-4, -5, -2]} intensity={1} color="#A8ECF0" />
            <directionalLight position={[4, -5, 2]} intensity={1} color="#407BFF" />

            <Suspense fallback={null}>
              <Model />
            </Suspense>
          </Canvas>
        </div>
      </div>


    </div>
  )
}
