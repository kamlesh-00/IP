import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

class ComplaintForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "",
      category: "",
      complaintDetail: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const complaintDetails = {
      level: this.state.id,
      category: this.state.password,
      complaintDetail: this.state.complaintDetail,
    };
    axios
      .post("/api/addComplaint", complaintDetails)
      .then((res) => {
        console.log(res.data);
        this.props.handleComplaintSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <h4 className="center">Register your complaint</h4>
          <p className="text-danger center">All details are compulsory*</p>
          <br />
          <Form.Control as="select" custom className="mb-2" name="level">
            <option>Select Level</option>
            <option>University Level</option>
            <option>College/Institute level</option>
            <option>Department Level</option>
          </Form.Control>
          <Form.Control as="select" custom className="mb-2" name="category">
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
          />
          <Button variant="primary" type="submit" className="">
            Submit
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default ComplaintForm;
