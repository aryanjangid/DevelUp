import React from 'react'
import Button from '../../components/Button'

export default function Home() {
  return (
    <div>
      <h1 style={{color:"black"}}>Home</h1>
      <Button name="login" to="login"></Button>
      <Button name="mentor-profile" to="mentor-profile"></Button>
    </div>
  )
}
