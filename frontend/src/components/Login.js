import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

import "../App.css";

export default class Login extends React.Component {
  constructor() {
    super();
    let loggedIn = false;
    let signup1 = false;
    var alert1 = false;
    var alert2 = false;

    const token = localStorage.getItem("token");
    if (token) loggedIn = true;

    this.state = {
      username: "",
      password: "",
      loggedIn,
      error: "",
      signup1,
      alert1,
      alert2,
    };
    this.onChange = this.onChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.signup = this.signup.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }
  signup() {
    this.setState({
      signup1: true,
    });
  }

  async formSubmit(ev) {
    ev.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      try {
        const token = await Axios.post("/login", { username, password });
        localStorage.setItem("token", token);
        this.setState({
          loggedIn: true,
        });
      } catch (err) {
        this.setState({
          alert2: true,
        });
        setTimeout(() => {
          this.setState({
            alert2: false,
          });
        }, 3000);
        window.location.reload();
        this.setState({
          error: err.message,
        });
      }
    } else {
      this.setState({
        alert1: true,
      });
      setTimeout(() => {
        this.setState({
          alert1: false,
        });
      }, 2000);
    }
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/user" />;
    }
    if (this.state.signup1 === true) {
      return <Redirect to="/register" />;
    }

    return (
      <div class="container">
        {this.state.alert1 && (
          <div class="alert alert-primary" role="alert">
            Cannot Submit empty Fields
          </div>
        )}
        {this.state.alert2 && (
          <div class="alert alert-primary" role="alert">
            Invalid Email or Password
          </div>
        )}
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
                <input onClick={this.signup} type="submit" value="SignUp" />
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
