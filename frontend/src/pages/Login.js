import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      type: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    console.log("Login detail submit");
  }

  handleChange(event) {
    this.setState({
      [event.target]: event.target.value,
    });
  }

  register_link() {
    if (this.state.type === "Student") {
      return (
        <Link to="/register">
          <p className="mt-5 mb-3 text-danger">{"Register"}</p>
        </Link>
      );
    } else {
      return null;
    }
  }

  componentDidMount() {
    var { type } = this.props.match.params;
    var type;
    if (type === "college") {
      type = "College";
    } else if (type === "admin") {
      type = "Admin";
    } else {
      type = "Student";
    }
    this.setState({
      type: type,
    });
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <img className="home-logo" src="/images/login.png" />
        <h1 className="h3 mb-5 font-weight-normal title">
          {this.state.type + " Login"}
        </h1>
        <input
          type="text"
          id={this.state.type.toLowerCase() + "_id"}
          className="form-control mb-2"
          placeholder={this.state.type + " id"}
          required="true"
          autofocus="true"
          name="id"
          onChange={this.handleChange}
        />
        <input
          type="password"
          id="password"
          className="form-control mb-3"
          placeholder="Password"
          required="true"
          name="password"
          onChange={this.handleChange}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          {"Sign in"}
        </button>
        {this.register_link()}
      </form>
    );
  }
}

export default Login;
