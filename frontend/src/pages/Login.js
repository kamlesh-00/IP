import axios from "axios";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      errors: "",
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  isAuthorized() {
    axios
      .get("/api/isAuthenticated")
      .then((response) => {
        return response.data.success;
      })
      .catch((err) => console.log(err.response));
  }

  componentWillMount() {
    if (this.isAuthorized()) {
      this.setState({
        redirectStatus: true,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const loginDetails = {
      username: this.state.id,
      password: this.state.password,
    };
    axios
      .post("/api/login", loginDetails)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            errors: "",
            redirect: true,
          });
        }
      })
      .catch((err) => {
        if (err) {
          if (err.response.status === 401) {
            this.setState({
              errors: "Wrong Username or Password",
            });
          }
        }
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    const errors = this.state.errors;
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
        <img className="home-logo" src="/images/login.png" alt="Logo" />
        <h1 className="h3 mb-5 font-weight-normal title">{"Login"}</h1>
        <input
          type="text"
          className="form-control mb-2"
          placeholder={"Registration Id"}
          required={true}
          autoFocus={true}
          name="id"
          onChange={this.handleChange}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          required={true}
          name="password"
          onChange={this.handleChange}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          {"Sign in"}
        </button>
        {alert()}
        <Link to="/register">
          <p className="mt-5 mb-3 text-danger">{"Student Registration"}</p>
        </Link>
      </form>
    );
  }
}

export default Login;
