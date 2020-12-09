import React from "react";
import { Button, Form } from "react-bootstrap";

function ComplaintForm(props) {
  return (
    <Form>
      <Form.Group controlId="exampleForm.SelectCustom">
        <h4 className="center">Register your complaint</h4>
        <p className="text-danger center">All details are compulsory*</p>
        <br />
        <Form.Control as="select" custom className="mb-2">
          <option>Select Level</option>
          <option>University Level</option>
          <option>College/Institute level</option>
          <option>Department Level</option>
        </Form.Control>
        <Form.Control as="select" custom className="mb-2">
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
        />
        <Button variant="primary" type="submit" className="">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

export default ComplaintForm;