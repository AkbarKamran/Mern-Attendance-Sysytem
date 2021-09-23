import React from "react";
import { Redirect, Link } from "react-router-dom";
import "./Calender.css";
import Axios from "axios";

export default class RequestLeave extends React.Component {
  constructor() {
    super();
    let loggedIn = false;
    let submit1 = false;
    let holiday1 = false;
    let halfday = false;
    let hardware = false;
    let anything = false;
    var alert1 = false;

    const token = localStorage.getItem("token");
    if (token) loggedIn = true;
    this.logout = this.logout.bind(this);
    this.state = {
      loggedIn,
      fromTime: "",
      toTime: "",
      reason: "",
      submit1,
      holiday1,
      halfday,
      hardware,
      anything,
      alert1,
    };
    this.onChange = this.onChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.formSubmit1 = this.formSubmit1.bind(this);
    this.formSubmit2 = this.formSubmit2.bind(this);
    this.formSubmit3 = this.formSubmit3.bind(this);
    this.submit = this.submit.bind(this);
    this.holiday = this.holiday.bind(this);
    this.halfday = this.halfday.bind(this);
    this.hardware1 = this.hardware1.bind(this);
    this.anything = this.anything.bind(this);
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
  holiday() {
    this.setState({
      holiday1: true,
    });
  }
  halfday() {
    this.setState({
      holiday1: false,
      halfday: true,
    });
  }
  hardware1() {
    this.setState({
      holiday1: false,
      halfday: false,
      hardware1: true,
    });
  }
  anything() {
    this.setState({
      holiday1: false,
      halfday: false,
      hardware1: false,
      anything: true,
    });
  }
  async formSubmit(ev) {
    ev.preventDefault();
    const { fromTime, toTime, reason } = this.state;
    const holidayleave = "Holiday Request";
    if (fromTime && toTime && reason) {
      try {
        Axios.post("/request", { holidayleave, fromTime, toTime, reason }).then(
          (window.location = "http://localhost:3000/user")
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setState({
        alert1: true,
      });
      setTimeout(() => {
        this.setState({
          alert1: false,
        });
      }, 1000);
    }
  }
  async formSubmit1(ev) {
    ev.preventDefault();
    const { fromTime, toTime, reason } = this.state;
    const short = "Short Leave";
    if (fromTime && toTime && reason) {
      try {
        Axios.post("/request", { short, fromTime, toTime, reason }).then(
          (window.location = "http://localhost:3000/user")
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setState({
        alert1: true,
      });
      setTimeout(() => {
        this.setState({
          alert1: false,
        });
      }, 1000);
    }
  }
  async formSubmit2(ev) {
    ev.preventDefault();
    const { toTime, reason } = this.state;
    const hardwareRequest = "Hardware Request";
    if (toTime && hardwareRequest) {
      try {
        Axios.post("/request", { hardwareRequest, toTime, reason }).then(
          (window.location = "http://localhost:3000/user")
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setState({
        alert1: true,
      });
      setTimeout(() => {
        this.setState({
          alert1: false,
        });
      }, 1000);
    }
  }

  async formSubmit3(ev) {
    ev.preventDefault();
    const { toTime, reason } = this.state;
    const anyOtherRequest = "Any Other Requests";
    if (toTime && reason) {
      try {
        Axios.post("/request", { anyOtherRequest, toTime, reason }).then(
          (window.location = "http://localhost:3000/user")
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setState({
        alert1: true,
      });
      setTimeout(() => {
        this.setState({
          alert1: false,
        });
      }, 1000);
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
                    <Link to="/request">
                      <p>Request Form</p>
                    </Link>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-md-12 text-center">
            <button
              onClick={this.holiday}
              type="submit"
              class="btn btn-primary"
            >
              Request Holiday
            </button>

            <button
              onClick={this.halfday}
              type="submit"
              class="btn btn-primary"
            >
              Request Half Day
            </button>
            <button
              onClick={this.hardware1}
              type="submit"
              class="btn btn-primary"
            >
              Request Hardware
            </button>
            <button
              onClick={this.anything}
              type="submit"
              class="btn btn-primary"
            >
              Request Anything
            </button>
          </div>

          <div class="main-panel">
            {this.state.holiday1 && (
              <div class="content">
                {this.state.alert1 && (
                  <div class="alert alert-primary" role="alert">
                    Cannot Submit empty Fields
                  </div>
                )}
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="card">
                        <div class="card-header card-header-primary">
                          <h4 class="card-title">Request Form</h4>
                        </div>
                        <form onSubmit={this.formSubmit}>
                          <div class="card-body">
                            <div>
                              <label>From</label>
                              <br />
                              <input
                                name="fromTime"
                                onChange={this.onChange}
                                value={this.state.fromTime}
                                type="date"
                              />
                            </div>
                            <div className="calender1">
                              <label>To</label>
                              <br />
                              <input
                                name="toTime"
                                onChange={this.onChange}
                                value={this.state.toTime}
                                type="date"
                              />
                            </div>
                            <div>
                              <label className="height">Reason</label>
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                name="dependency"
                                onChange={this.onChange}
                                value={this.state.reason}
                                rows="4"
                                name="reason"
                              ></textarea>
                            </div>
                            <div class="col-md-12 text-center">
                              <button type="submit" class="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {this.state.halfday && (
              <div class="content">
                {this.state.alert1 && (
                  <div class="alert alert-primary" role="alert">
                    Cannot Submit empty Fields
                  </div>
                )}
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="card">
                        <div class="card-header card-header-primary">
                          <h4 class="card-title">Request Form</h4>
                        </div>
                        <form onSubmit={this.formSubmit1}>
                          <div class="card-body">
                            <div>
                              <label>From</label>
                              <br />
                              <input
                                name="fromTime"
                                onChange={this.onChange}
                                value={this.state.fromTime}
                                type="time"
                              />
                            </div>
                            <div className="calender1">
                              <label>To</label>
                              <br />
                              <input
                                name="toTime"
                                onChange={this.onChange}
                                value={this.state.toTime}
                                type="time"
                              />
                            </div>
                            <div>
                              <label>Date</label>
                              <br />
                              <input
                                name="toTime"
                                onChange={this.onChange}
                                value={this.state.toTime}
                                type="date"
                              />
                            </div>
                            <div>
                              <label className="height">Reason</label>
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                name="dependency"
                                onChange={this.onChange}
                                value={this.state.reason}
                                rows="4"
                                name="reason"
                              ></textarea>
                            </div>
                            <div class="col-md-12 text-center">
                              <button type="submit" class="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {this.state.hardware1 && (
              <div class="content">
                {this.state.alert1 && (
                  <div class="alert alert-primary" role="alert">
                    Cannot Submit empty Fields
                  </div>
                )}
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="card">
                        <div class="card-header card-header-primary">
                          <h4 class="card-title">Request Form</h4>
                        </div>
                        <form onSubmit={this.formSubmit2}>
                          <div class="card-body">
                            <div className="calender1">
                              <label>Request Hardware</label>
                              <br />
                              <br />
                              <input
                                name="toTime"
                                onChange={this.onChange}
                                value={this.state.toTime}
                                type="date"
                              />
                            </div>
                            <div>
                              <label className="height">Reason</label>
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                name="dependency"
                                onChange={this.onChange}
                                value={this.state.reason}
                                rows="4"
                                name="reason"
                              ></textarea>
                            </div>
                            <div class="col-md-12 text-center">
                              <button type="submit" class="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.state.anything && (
              <div class="content">
                {this.state.alert1 && (
                  <div class="alert alert-primary" role="alert">
                    Cannot Submit empty Fields
                  </div>
                )}
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="card">
                        <div class="card-header card-header-primary">
                          <h4 class="card-title">Request Form</h4>
                        </div>
                        <form onSubmit={this.formSubmit3}>
                          <div class="card-body">
                            <div className="calender1">
                              <label>Request Hardware</label>
                              <br />
                              <br />
                              <input
                                name="toTime"
                                onChange={this.onChange}
                                value={this.state.toTime}
                                type="date"
                              />
                            </div>
                            <div>
                              <label className="height">
                                Anything You want to Request for
                              </label>
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                name="dependency"
                                onChange={this.onChange}
                                value={this.state.reason}
                                rows="4"
                                name="reason"
                              ></textarea>
                            </div>
                            <div class="col-md-12 text-center">
                              <button type="submit" class="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
