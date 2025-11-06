import React from "react";
import { Redirect, Link } from "react-router-dom";
import CheckIn from "./CheckIn";
import TodayStatus from "./TodayStatus";

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
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
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
        <nav
          class="
            navbar navbar-expand-lg navbar-transparent navbar-absolute
            fixed-top
          "
          id="navigation-example"
        >
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              data-target="#navigation-example"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="navbar-toggler-icon icon-bar"></span>
              <span class="navbar-toggler-icon icon-bar"></span>
              <span class="navbar-toggler-icon icon-bar"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end">
              <form class="navbar-form">
                <div class="input-group no-border">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                  <button
                    type="submit"
                    class="btn btn-default btn-round btn-just-icon"
                  >
                    <i class="material-icons">search</i>
                    <div class="ripple-container"></div>
                  </button>
                </div>
              </form>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="javascript:void(0)">
                    <i class="material-icons">dashboard</i>
                    <p class="d-lg-none d-md-block">Stats</p>
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link"
                    href="javscript:void(0)"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="material-icons">notifications</i>
                    <span class="notification">5</span>
                    <p class="d-lg-none d-md-block">Some Actions</p>
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a class="dropdown-item" href="javascript:void(0)">
                      Mike John responded to your email
                    </a>
                    <a class="dropdown-item" href="javascript:void(0)">
                      You have 5 new tasks
                    </a>
                    <a class="dropdown-item" href="javascript:void(0)">
                      You're now friend with Andrew
                    </a>
                    <a class="dropdown-item" href="javascript:void(0)">
                      Another Notification
                    </a>
                    <a class="dropdown-item" href="javascript:void(0)">
                      Another One
                    </a>
                  </div>
                </li>
                <li class="nav-item">
                  <img src="https://img.icons8.com/bubbles/50/000000/cloud-account-login-male.png" />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="main-panel">
          <div class="content">
            <div class="container-fluid">
              <div class="row" style={{ marginTop: "20px" }}>
                <TodayStatus />
              </div>
            </div>
          </div>
        </div>
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
                      <Link to="/user">
                        <p>Dashboard</p>
                      </Link>
                    </a>
                  </li>
                  <li class="nav-item  ">
                    <a class="nav-link">
                      <Link to="/attendance-history">
                        <p>Attendance History</p>
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
                      <Link to="/request">
                        <p>Request Form</p>
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
