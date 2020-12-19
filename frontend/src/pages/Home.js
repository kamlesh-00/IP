import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

class Home extends React.Component {
  state = { redirect: false };

  isAuthorized() {
    axios
      .get("/api/isAuthenticated")
      .then((response) => {
        return response.data.success;
      })
      .catch((err) => console.log(err.response));
  }

  componentWillMount() {
    if (this.isAuthorized()) {
      this.setState({
        redirect: true,
      });
    }
  }
  componentWillUpdate() {
    if (this.isAuthorized()) {
      this.setState({
        redirect: true,
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="centered">
        <img src="/images/logo.png" className="home-logo" alt="Logo" />
        <h1 className="title">Student Grievance Portal</h1>
        <Link to="/login">
          <Button variant="primary">Login</Button>
        </Link>{" "}
        <Link to="/register">
          <Button variant="danger">Register</Button>
        </Link>
      </div>
    );
  }
}

export default Home;
