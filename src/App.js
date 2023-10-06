import homepage from './pages/homepage';
import Login from './login';
import Register from './register';

import './styles.css';
import { Workouts } from "./pages/Workouts";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import AllWorkouts from './pages/getall';
import CreateWorkout from './pages/createworkout.js';



function App() {
  
  return (
    <Router>
        <Switch>
            <Route path="/Workouts" component={Workouts}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/getall" component={AllWorkouts}/>
            <Route path="/createnew" component={CreateWorkout}/>
            <Route path="/" component={homepage}/>
            </Switch>
    </Router>
   
  );
}

export default App;

