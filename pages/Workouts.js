import React from "react";
import { useHistory } from 'react-router-dom'; 
import LogoutButton from './logout';
import './styles2.css';

export const Workouts = () => {
    const history = useHistory(); 

    const GetAllWorkouts = () => {
        history.push('/getall');
    };
    const createNew = () => {
        history.push('/createnew');
    };
    
    

    return (
        <div className="workouts-container">
           
            <h1 className="hh1">Workout Buddy</h1><br />
            <div className="btn">
                <button className="neumorphic-btn" onClick={GetAllWorkouts}>View / Modify Workouts</button><br />
                <button className="neumorphic-btn" onClick={createNew}>Create a new workout</button><br />
            </div><br /><br />
            <LogoutButton />
        </div>
    );
};
