import React from "react";
import { Link } from "react-router-dom";

function Unauthorized(props) {
  return (
    <div className="centered">
      <img src="/images/unauthorized.png" className="home-logo" alt="Logo" />
      <h1 className="title">Error 401, Unauthorized, try logging again</h1>
      <Link to="/login/student">
        <p className="mt-5 mb-3 text-danger">{"Student Login"}</p>
      </Link>
    </div>
  );
}

export default Unauthorized;
