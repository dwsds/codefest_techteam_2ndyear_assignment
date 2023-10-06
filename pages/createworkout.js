import React, { useState } from 'react';

function CreateWorkout() {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const userToken = localStorage.getItem("user-token");
    if (!userToken) {
      setError("Access token is missing.");
      return;
    }

    const requestBody = {
      title: title,
      load: parseFloat(load),
      reps: parseInt(reps),
    };

    try {
      const response = await fetch("https://workoutapi-fjcr.onrender.com/api/workouts", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccess(true);
        console.log("Workout created successfully:", responseData);
      } else if (response.status === 400) {
        setError(responseData.error);
        setSuccess(false);
      } else if (response.status === 401) {
        setError("Access token is missing or invalid");
        setSuccess(false);
      } else {
        setError("An error occurred while creating the workout.");
        setSuccess(false);
      }
    } catch (error) {
      setError("An error occurred during the request.");
      setSuccess(false);
    }
  }

  return (
    <div>
      <h2 className='h2'>Create a New Workout</h2>
      {error && <p>{error}</p>}
      
      <form className='create-workout-form' onSubmit={handleSubmit}>
        <label className='title1'>
          Title:
          <input className='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label className='load1'>
          Load:
          <input className='load' type="number" value={load} onChange={(e) => setLoad(e.target.value)} required />
        </label>
        <br />
        <label className='reps1'>
          Reps:
          <input className='reps' type="number" value={reps} onChange={(e) => setReps(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Create Workout</button>
      </form>
      {success && <p className='success-message'>Workout created successfully!</p>} 
      
    </div>
  );
}

export default CreateWorkout;
