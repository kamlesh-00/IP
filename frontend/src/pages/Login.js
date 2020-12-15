import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
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
        <Link to="/register">
          <p className="mt-5 mb-3 text-danger">{"Student Registration"}</p>
        </Link>
      </form>
    );
  }
}

export default Login;
