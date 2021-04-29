import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChangeInput = e => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const registerSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/user/register', {...user})
      localStorage.setItem('firstLogin', true)
      window.location.href = "/"
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          required 
          value={user.name}
          onChange={onChangeInput} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          value={user.email}
          onChange={onChangeInput} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          autoComplete="on"
          required 
          value={user.password} 
          onChange={onChangeInput} 
        />
        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
