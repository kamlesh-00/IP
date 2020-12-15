import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ComplaintDetails from "../utils/ComplaintDetails";
import ComplaintForm from "../utils/ComplaintForm";

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: null,
    };
    this.handleComplaintSubmit = this.handleComplaintSubmit.bind.this();
  }

  handleComplaintSubmit() {
    axios
      .get("/api/getComplaints")
      .then((res) => {
        this.setState({ complaints: res.data });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    axios
      .get("/api/getComplaints")
      .then((res) => {
        this.setState({ complaints: res.data });
      })
      .catch((err) => console.log(err));
  }

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
                <ComplaintForm
                  handleComplaintSubmit={this.handleComplaintSubmit}
                />
              </div>
            </div>
            <div className="col-sm-8">
              <div className="box">
                <ComplaintDetails complaints={this.state.complaints} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentHome;
