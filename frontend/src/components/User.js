import React from "react";
import { Redirect, Link } from "react-router-dom";
import CheckIn from "./CheckIn";

export default class User extends React.Component {
  constructor() {
    super();
    let loggedIn = false;

    const token = localStorage.getItem("token");
    if (token) loggedIn = true;
    this.logout = this.logout.bind(this);
    this.state = {
      loggedIn,
    };
  }

  logout() {
    this.setState({
      loggedIn: false,
    });
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/logout" />;
    }
    return (
      <>
        <div>
          <CheckIn />
        </div>
        <div>
          <div class="wrapper ">
            <div
              class="sidebar"
              data-color="purple"
              data-background-color="black"
            >
              <div class="logo">
                <a
                  href="http://www.creative-tim.com"
                  class="simple-text logo-normal"
                >
                  Neeo Pal
                </a>
              </div>
              <div class="sidebar-wrapper">
                <ul class="nav">
                  <li class="nav-item  ">
                    <a class="nav-link">
                      <Link to="/">
                        <p>Dashboard</p>
                      </Link>
                    </a>
                  </li>
                  <li class="nav-item  ">
                    <a class="nav-link">
                      <Link to="/report">
                        <p>Report</p>
                      </Link>
                    </a>
                  </li>
                  <li class="nav-item ">
                    <a class="nav-link">
                      <Link to="/report">
                        <p>Request Leave Form</p>
                      </Link>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="container1">
          <button class="btn btn-primary btn-lg" onClick={this.logout}>
            Logout
          </button>
        </div>
      </>
    );
  }
}
