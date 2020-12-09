import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ComplaintDetails from "../utils/ComplaintDetails";
import ComplaintForm from "../utils/ComplaintForm";

class StudentHome extends Component {
  render() {
    return (
      <React.Fragment>
        <Button color="primary" className="logout">
          {"Logout"}
        </Button>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="box">
                <ComplaintForm />
              </div>
            </div>
            <div className="col-sm-8">
              <div className="box">
                <ComplaintDetails />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentHome;
