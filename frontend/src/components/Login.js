import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

import "../App.css";

export default class Login extends React.Component {
  constructor() {
    super();
    let loggedIn = false;

    const token = localStorage.getItem("token");
    if (token) loggedIn = true;

    this.state = {
      username: "",
      password: "",
      loggedIn,
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async formSubmit(ev) {
    ev.preventDefault();
    const { username, password } = this.state;
    try {
      const token = await Axios.post("/login", { username, password });
      localStorage.setItem("token", token);
      this.setState({
        loggedIn: true,
      });
    } catch (err) {
      alert("Invalid email");
      window.location.reload();
      this.setState({
        error: err.message,
      });
    }
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/user" />;
    }

    return (
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <form onSubmit={this.formSubmit} class="box">
                <h1>NeooPal Login</h1>
                <p class="text-muted">Please enter your login and password!</p>
                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.onChange}
                  name="username"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                />
                <a class="forgot text-muted" href="/#">
                  Forgot password?
                </a>
                <input type="submit" value="Login" />
                {this.state.error}
              </form>
              <Redirect to="/" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
