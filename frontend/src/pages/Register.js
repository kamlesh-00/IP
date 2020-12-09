import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      middlename: "",
      lastname: "",
      coursename: "",
      academic_year: "",
      registration_number: "",
      college: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target]: event.target.value,
    });
  }

  handleSubmit() {
    const userDetail = {
      name:
        this.state.firstname +
        " " +
        this.state.middlename +
        " " +
        this.state.lastname,
    };
    axios.post("/api/authenticate/register");
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h1 className="h3 mb-5 font-weight-normal">
          To lodge grievance, register first
        </h1>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter First Name"
          required="true"
          autofocus=""
          name="firstname"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Middle Name"
          required=""
          autofocus=""
          name="middlename"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Last Name"
          required=""
          autofocus=""
          name="lastname"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Course Name"
          required=""
          autofocus=""
          name="coursename"
          onChange={this.handleChange}
        />
        {/*College name selector */}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Academic Year(eg: 2018-2020)"
          required=""
          autofocus=""
          name="academicyear"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Registration Id"
          required=""
          autofocus=""
          name="id"
          onChange={this.handleChange}
        />
        <input
          type="password"
          id="password"
          className="form-control mb-3"
          placeholder="Password"
          required=""
          name="password"
          onChange={this.handleChange}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          {"Register"}
        </button>
        <Link to="/login/student">
          <p className="mt-5 mb-3 text-danger">{"Login"}</p>
        </Link>
      </form>
    );
  }
}

export default Register;
