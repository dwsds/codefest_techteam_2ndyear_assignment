import './styles2.css'
import React from 'react';

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('workoutData');
    window.location.href = '/'; 
  };

  return (
    <button className="logout_btn" onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
