import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

class ComplaintForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: true,
      userType: "",
      level: "",
      category: "",
      complaintDetail: "",
      collegeName: "",
      collegeId: "",
      collegePassword: "",
      adminId: "",
      adminPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleComplaint = this.handleComplaint.bind(this);
    this.handleNewCollege = this.handleNewCollege.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleComplaint(event) {
    event.preventDefault();
    const complaintDetails = {
      level: this.state.level,
      category: this.state.category,
      complaintDetail: this.state.complaintDetail,
    };
    axios
      .post("/api/addComplaint", complaintDetails)
      .then((res) => {
        if (!res.data.success) {
          this.setState({
            loginStatus: false,
          });
        } else {
          this.setState({
            level: "",
            category: "",
            complaintDetail: "",
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
    this.props.onComplaintSubmit();
  }

  handleNewCollege(event) {
    event.preventDefault();
    const newCollege = {
      username: this.state.collegeId,
      name: this.state.collegeName,
      password: this.state.collegePassword,
    };
    axios
      .post("api/admin/addCollege", newCollege)
      .then((res) => {
        if (!res.data.success) {
          this.setState({
            loginStatus: false,
          });
        } else {
          alert("College added successfully");
          this.setState({
            collegeId: "",
            collegeName: "",
            collegePassword: "",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  componentWillMount() {}

  handleNewAdmin(event) {
    event.preventDefault();
    const newAdmin = {
      username: this.state.adminId,
      password: this.state.adminPassword,
    };
    axios
      .post("api/addAdmin", newAdmin)
      .then((res) => {
        if (!res.data.success) {
          this.setState({
            loginStatus: false,
          });
        } else {
          alert("Admin added successfully");
          this.setState({
            adminId: "",
            adminPassword: "",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (!this.state.loginStatus) {
      return <Redirect to="/unauthorized" />;
    }
    if (this.props.userType === "student") {
      return (
        <Form onSubmit={this.handleComplaint}>
          <Form.Group controlId="exampleForm.SelectCustom">
            <h4 className="center">Register your complaint</h4>
            <p className="text-danger center">All details are compulsory*</p>
            <br />
            <Form.Control
              as="select"
              custom
              className="mb-2"
              name="level"
              value={this.state.level}
              onChange={this.handleChange}>
              <option>Select Level</option>
              <option>University Level</option>
              <option>College/Institute level</option>
              <option>Department Level</option>
            </Form.Control>
            <Form.Control
              as="select"
              custom
              className="mb-2"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}>
              <option>Select sub-categories</option>
              <option>Admission</option>
              <option>Finance</option>
              <option>Examination</option>
              <option>Lecture Timetable/Learning</option>
              <option>Paper Re-evaluation</option>
              <option>Any other categories</option>
            </Form.Control>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter your complaint here..."
              className="mb-2"
              name="complaintDetail"
              value={this.state.complaintDetail}
              onChange={this.handleChange}
            />
            <Button variant="primary" type="submit" className="">
              Submit
            </Button>
          </Form.Group>
        </Form>
      );
    } else if (this.props.userType === "college") {
      return <p>College Login</p>;
    } else if (this.props.userType === "admin") {
      return (
        <React.Fragment>
          <Form onSubmit={this.handleNewCollege}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <h4 className="center">Register new college</h4>
              <p className="text-danger center">All details are compulsory*</p>
              <br />
              <Form.Control
                type="text"
                placeholder="Enter College Name"
                className="mb-2"
                name="collegeName"
                value={this.state.collegeName}
                onChange={this.handleChange}
              />
              <Form.Control
                type="text"
                placeholder="Enter college registration id"
                className="mb-2"
                name="collegeId"
                value={this.state.collegeId}
                onChange={this.handleChange}
              />
              <Form.Control
                type="password"
                placeholder="Enter college password"
                className="mb-2"
                name="collegePassword"
                type="password"
                value={this.state.collegePassword}
                onChange={this.handleChange}
              />
              <Button variant="primary" type="submit" className="">
                Submit
              </Button>
            </Form.Group>
          </Form>
          <hr />
          <Form onSubmit={this.handleNewAdmin}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <h4 className="center">Register new Admin</h4>
              <p className="text-danger center">All details are compulsory*</p>
              <br />
              <Form.Control
                type="text"
                placeholder="Enter admin registration id"
                className="mb-2"
                name="adminId"
                value={this.state.adminId}
                onChange={this.handleChange}
              />
              <Form.Control
                type="text"
                placeholder="Enter admin password"
                className="mb-2"
                name="adminPassword"
                type="password"
                value={this.state.adminPassword}
                onChange={this.handleChange}
              />
              <Button variant="primary" type="submit" className="">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </React.Fragment>
      );
    }
  }
}

export default ComplaintForm;
