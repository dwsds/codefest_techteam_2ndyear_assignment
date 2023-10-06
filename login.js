

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const history = useHistory();


  async function login() {
    const requestBody = {
      email: Email,
      password: Password,
    };

    try {
      const response = await fetch("https://workoutapi-fjcr.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.email && result.token) {
          
          localStorage.setItem("user-email", result.email);
          localStorage.setItem("user-token", result.token);
          
          history.push("/Workouts");
          console.log("Redirecting to /Workouts");
        } else {
          setError("Authentication response missing email or token");
        }
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      }
    } catch (error) {
      setError("An error occurred during authentication");
      console.error("An error occurred:", error);
    }
  }

  return (
    <div className='div'>
      <h1 className='h1'>LOGIN</h1>
      <div className='User_info'>
        <input
          type='email'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
          className='user_email'
        ></input>
        <br />
        <input
          type='password' 
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          className='user_pass'
        ></input>
        
        <br />
        <button className='loginButton' onClick={login}>Login</button>
        {error && <p className='errormsg'>{error}</p>} 
      </div>
      <p className='p1'>Don't have an account? <a href="/register">Sign Up</a></p> 
    </div>
  );
}

export default Login;