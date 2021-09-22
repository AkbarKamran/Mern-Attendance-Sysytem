import React from "react";
import { Redirect, Link } from "react-router-dom";

import Axios from "axios";
import "../App.css";

export default class Report extends React.Component {
  constructor() {
    super();
    let loggedIn = false;
    let submit1 = false;

    const token = localStorage.getItem("token");
    if (token) loggedIn = true;
    this.logout = this.logout.bind(this);
    this.state = {
      loggedIn,
      todayReport: "",
      tomorroeTask: "",
      dependency: "",
      submit1,
    };
    this.onChange = this.onChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }
  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }
  submit() {
    this.setState({
      submit1: true,
    });
  }

  async formSubmit(ev) {
    ev.preventDefault();
    const { todayReport, tomorroeTask, dependency } = this.state;
    try {
      Axios.post("/report", { todayReport, tomorroeTask, dependency }).then(
        (window.location = "http://localhost:3000/user")
      );
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.setState({
      loggedIn: false,
    });
  }

  render() {
    if (this.state.submit1 === true) {
      return <Redirect to="/user" />;
    }
    if (this.state.loggedIn === false) {
      return <Redirect to="/logout" />;
    }

    return (
      <>
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
          <div class="main-panel">
            <nav
              class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top "
              id="navigation-example"
            >
              <div class="container-fluid">
                <div class="navbar-wrapper">
                  <a class="navbar-brand" href="javascript:void(0)">
                    Report
                  </a>
                </div>
              </div>
            </nav>

            <div class="content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-8">
                    <div class="card">
                      <div class="card-header card-header-primary">
                        <h4 class="card-title">Report</h4>
                      </div>
                      <div class="card-body">
                        <form onSubmit={this.formSubmit}>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">
                              Today Task
                            </label>
                            <textarea
                              value={this.state.todayReport}
                              onChange={this.onChange}
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="5"
                              name="todayReport"
                            ></textarea>
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">
                              Tomorrow Task
                            </label>
                            <textarea
                              value={this.state.tomorroeTask}
                              onChange={this.onChange}
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="8"
                              name="tomorroeTask"
                            ></textarea>
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">
                              Any Dependency
                            </label>
                            <textarea
                              value={this.state.dependency}
                              onChange={this.onChange}
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="2"
                              name="dependency"
                            ></textarea>
                          </div>
                          <div class="col-md-12 text-center">
                            <button
                              onSubmit={this.submit}
                              type="submit"
                              class="btn btn-primary"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div class="ak1">
                    <h1 class="btn btn-primary">
                      <b> Check In</b>
                    </h1>
                    <div class="card card-stats">
                      <div class="card-header card-header-danger card-header-icon">
                        <p class="card-category">Check In</p>
                        <h1 class="card-title">00:00:00</h1>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons">local_offer</i> Tracked from
                          Github
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="ak">
                    <h1 class="btn btn-primary">
                      <b> Check Out</b>
                    </h1>
                    <div class="card card-stats">
                      <div class="card-header card-header-danger card-header-icon">
                        <p class="card-category">Check Out</p>
                        <h1 class="card-title">00:00:00</h1>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons">local_offer</i> Tracked from
                          Github
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
