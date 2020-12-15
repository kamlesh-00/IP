import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentHome from "./pages/StudentHome";
import Unauthorized from "./pages/Unauthorized";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <div className="background">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route path="/login/:type" component={Login} />
          <Route path="/home" component={StudentHome} />
          <Route path="/unauthorized" component={Unauthorized} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
