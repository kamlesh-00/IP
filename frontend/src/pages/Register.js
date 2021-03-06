import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      middlename: "",
      lastname: "",
      coursename: "",
      academic_year: "",
      collegename: "",
      department_name: "",
      password: "",
      id: "",
      collegeDetails: [],
      error: "",
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  collegeDetails = [];

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentWillMount() {
    axios
      .get("/api/getColleges")
      .then((res) => {
        this.setState({
          collegeDetails: res.data,
        });
      })
      .catch((err) => console.log(err.response));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.firstname.trim() === "" ||
      this.state.middlename.trim() === "" ||
      this.state.lastname.trim() === "" ||
      this.state.id.trim() === "" ||
      this.state.coursename.trim() === "" ||
      this.state.collegename.trim() === "" ||
      this.state.collegename.trim() === "Pick your college" ||
      this.state.academic_year.trim() === "" ||
      this.state.password.trim() === "" ||
      this.state.department_name.trim() === ""
    ) {
      this.setState({ error: "All fields are required" });
      return;
    }
    const userDetail = {
      name:
        this.state.firstname +
        " " +
        this.state.middlename +
        " " +
        this.state.lastname,
      username: this.state.id,
      course_name: this.state.coursename,
      college_name: this.state.collegename,
      academic_year: this.state.academic_year,
      password: this.state.password,
      department_name: this.state.department_name,
    };
    axios
      .post("/api/student/register", userDetail)
      .then((res) => {
        if (!res.data.success) {
          this.setState({
            error: "Account already exists with this registration id",
          });
        } else if (res.data.success) {
          this.setState({
            redirect: true,
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  collegeInput(ele) {
    return <option>{ele.name}</option>;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    const errors = this.state.error;
    function alert() {
      if (errors === "") return null;
      else
        return (
          <Alert variant="danger" className="mt-5">
            {errors}
          </Alert>
        );
    }
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h1 className="h3 mb-5 font-weight-normal">
          To lodge grievance, register first
        </h1>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter First Name"
          required={true}
          autoFocus={true}
          name="firstname"
          value={this.state.firstname}
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Middle Name"
          name="middlename"
          value={this.state.middlename}
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Last Name"
          name="lastname"
          value={this.state.lastname}
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Course Name"
          name="coursename"
          value={this.state.coursename}
          onChange={this.handleChange}
        />
        <select
          className="form-control mb-2"
          name="collegename"
          value={this.state.collegename}
          onChange={this.handleChange}>
          <option selected>Pick your college</option>
          {this.state.collegeDetails.map(this.collegeInput)}
        </select>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Department Name"
          name="department_name"
          value={this.state.department_name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Academic Year(eg: 2018-2020)"
          name="academic_year"
          value={this.state.academic_year}
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Registration Id"
          name="id"
          value={this.state.id}
          onChange={this.handleChange}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          {"Register"}
        </button>
        {alert()}
        <Link to="/login/student">
          <p className="mt-5 mb-3 text-danger">{"Login"}</p>
        </Link>
      </form>
    );
  }
}

export default Register;
