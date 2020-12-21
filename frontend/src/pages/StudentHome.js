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
      userType: "",
      loading: true,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleComplaintSubmit = this.handleComplaintSubmit.bind(this);
  }

  handleComplaintSubmit = () => {
    axios
      .get("/api/getComplaints")
      .then((res) => {
        this.setState({
          complaints: res.data.complaints,
        });
      })
      .catch((err) => console.log(err));
  };

  componentWillMount() {
    axios
      .get("/api/getComplaints")
      .then((res) => {
        this.setState({
          userType: res.data.type,
          complaints: res.data.complaints,
          loading: false,
        });
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
    if (this.state.loading) {
      return <h4 className="center mt-5">Loading....</h4>;
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
                <ComplaintForm
                  onComplaintSubmit={this.handleComplaintSubmit}
                  userType={this.state.userType}
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
