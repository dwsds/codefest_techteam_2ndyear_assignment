
import React, { useState,useEffect } from 'react';
import './styles2.css';

function AllWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [isModifying, setIsModifying] = useState(null); 
  const [modifiedReps, setModifiedReps] = useState({});
  const [modifiedLoad, setModifiedLoad] = useState({});
  const [inputReps, setInputReps] = useState(workouts.reps); 
  const [inputLoad, setInputLoad] = useState(workouts.load); 
  
  
  async function fetchWorkouts() {
    try {
      const userToken = localStorage.getItem("user-token");
      if (!userToken) {
        setError("User token not found.");
        return;
      }
       const response = await fetch("https://workoutapi-fjcr.onrender.com/api/workouts", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${userToken}`,
          "Accept": "application/json",
        },
      });
        if (response.ok) {
        const result = await response.json();
        console.log(result)
        setWorkouts(result); 
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      }
    } catch (error) {
      setError("An error occurred during the request");
      console.error("An error occurred:", error);
    }
  }
  


  const handleUpdate = (workoutId) => {
    const modifiedRepsValue = inputReps;
    const modifiedLoadValue = inputLoad;
    const userToken = localStorage.getItem("user-token");
    if (!userToken) {
      setError("Access token is missing.");
      return;
    }
    const requestdata = {
      load:parseFloat(inputLoad),
      reps:parseInt(inputReps),
    };
    
  fetch(`https://workoutapi-fjcr.onrender.com/api/workouts/${workoutId}`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json",},
      body: JSON.stringify(requestdata),
    })
      .then((response) => {
        
          console.log(response);
      })
       .then((updatedWorkout) => {
       setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout._id === workoutId
            ? { ...workout,  reps: modifiedRepsValue,load:modifiedLoadValue }
            : workout
        )
      );
      setInputReps(updatedWorkout.reps);
      setInputLoad(updatedWorkout.load);
      console.log('Workout updated successfully:', updatedWorkout);
        setIsModifying(null);
        setError(null); 
      })
      .catch((error) => {
        console.error('Error updating workout:', error);
        setError('Failed to update workout. Please try again.');
      });
  };
  
  

 
  async function handleDelete(workoutId) {
    try {
      const userToken = localStorage.getItem("user-token");
      if (!userToken) {
        setError("User token not found.");
        return;
      }

      const response = await fetch(`https://workoutapi-fjcr.onrender.com/api/workouts/${workoutId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
       
        const updatedWorkouts = workouts.filter(workout => workout._id !== workoutId);
        setWorkouts(updatedWorkouts);
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      }
    } catch (error) {
      setError("An error occurred during the request");
      console.error("An error occurred:", error);
    }
   
  }



function handleCancel() {
    setModifiedReps({});
    setModifiedLoad({});
    setIsModifying(null);
  }



  function handleDeleteConfirmation(workoutId) {
   const confirmDelete = window.confirm("Are you sure you want to delete this workout?");
    if (confirmDelete) {
      handleDelete(workoutId);
    }
  }
 
 
 
  useEffect(() => {
    fetchWorkouts(); 
  }, []);
  

  

  return (
    <div>
      <h1 className="all">All Workouts</h1>
      {error && <p className="error-message">{error}</p>}
      <ul className="workouts-list">
        {workouts.map((workout) => (
          <li key={workout._id} className="workout-item">
            <h2>{workout.title}</h2>
            <p>workout-id: {workout._id}</p>
            <p>Reps: {isModifying === workout._id ? modifiedReps[workout._id] : workout.reps}</p>
            <p>Load: {isModifying === workout._id ? modifiedLoad[workout._id] : workout.load}</p>
            {isModifying === workout._id ? (
              <div>
                <label htmlFor={`modifiedReps_${workout._id}`}>Modified Reps:</label>
                  <input  className='modreps'
                  type="number"
                  id={`modifiedReps_${workout._id}`}
                  value={inputReps}
                  onChange={(e) => setInputReps(e.target.value)} required
                />

                <br />
                <label htmlFor={`modifiedLoad_${workout._id}`}>Modified Load:</label>
                <input className='modload'
                  type="number"
                  id={`modifiedLoad_${workout._id}`}
                  value={inputLoad}
                  onChange={(e) => setInputLoad(e.target.value)} required
                />

                <br />
                <button className="savebutton" onClick={() => handleUpdate(workout._id)}>Save Changes</button>
                <button className="cancelbutton" onClick={handleCancel}>Cancel Changes</button>
              </div>
            ) : (
              <div>
                <button className='modify-button' onClick={() => setIsModifying(workout._id)}>Modify</button>
                <button className='delete-button' onClick={() => handleDeleteConfirmation(workout._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  

        }
export default AllWorkouts;

