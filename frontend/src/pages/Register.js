import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      middlename: "",
      lastname: "",
      coursename: "",
      academic_year: "",
      college: "",
      email: "",
      password: "",
      collegeDetails: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  collegeDetails = [];

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }

  componentWillMount() {
    axios
      .get("/api/getColleges")
      .then((res) => {
        this.setState({
          collegeDetails: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleSubmit(event) {
    event.preventDefault();
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  collegeInput(ele) {
    return <option>{ele.name}</option>;
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
          required={true}
          autoFocus={true}
          name="firstname"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Middle Name"
          name="middlename"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Last Name"
          name="lastname"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Course Name"
          name="coursename"
          onChange={this.handleChange}
        />
        <select
          className="form-control mb-2"
          name="collegename"
          onChange={this.handleChange}>
          <option selected>Pick your college</option>
          {this.state.collegeDetails.map(this.collegeInput)}
        </select>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Department Name"
          name="coursename"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Academic Year(eg: 2018-2020)"
          name="academic_year"
          onChange={this.handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Registration Id"
          name="id"
          onChange={this.handleChange}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
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
