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

function AuthRoute(props) {
  function isAuthorized() {
    axios.get("/api/isAuthenticated").then((response) => {
      return response.data.success;
    });
  }

  if (!isAuthorized()) {
    return <Route path={props.path} component={props.component} />;
  } else return <Route path="/home" component={StudentHome} />;
}

class App extends React.Component {
  render() {
    return (
      <div className="background">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/register" component={Register} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/home" component={StudentHome} />
            <AuthRoute path="/unauthorized" component={Unauthorized} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
