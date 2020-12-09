import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Home(props) {
  return (
    <div className="centered">
      <img src="/images/logo.png" className="home-logo" alt="Logo" />
      <h1 className="title">Student Grievance Portal</h1>
      <Link to="/login/student">
        <Button variant="primary">Login</Button>
      </Link>{" "}
      <Link to="/register">
        <Button variant="danger">Register</Button>
      </Link>
      <div className="centered">
        <Link to="/login/college">
          <Button variant="secondary">College Login</Button>
        </Link>{" "}
        <Link to="/login/admin">
          <Button variant="secondary">Admin Login</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
