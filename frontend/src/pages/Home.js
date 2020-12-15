import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Home(props) {
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

export default Home;
