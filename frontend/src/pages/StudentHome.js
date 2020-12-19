import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ComplaintDetails from "../utils/ComplaintDetails";
import ComplaintForm from "../utils/ComplaintForm";

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: [],
      logout: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleComplaintSubmit = this.handleComplaintSubmit.bind(this);
  }

  handleComplaintSubmit = () => {
    console.log("here");
    axios
      .get("/api/getComplaints")
      .then((res) => {
        console.log("Res data: ", res);
        this.setState({ complaints: res.data.complaints });
      })
      .catch((err) => console.log(err));
  };

  componentWillMount() {
    axios
      .get("/api/getComplaints")
      .then((res) => {
        this.setState({ complaints: res.data.complaints });
      })
      .catch((err) => console.log(err.response));
  }

  handleLogout() {
    axios
      .get("/api/logout")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            logout: true,
          });
        }
      })
      .catch((err) => console.log(err.response));
  }

  render() {
    if (this.state.logout) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <Button color="primary" className="logout" onClick={this.handleLogout}>
          {"Logout"}
        </Button>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="box">
                <ComplaintForm onComplaintSubmit={this.handleComplaintSubmit} />
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
