import React, { Component } from "react";
import Axios from "axios";
import Timer1 from "./Stopwatch.";
import Break from "./Break";
import "../App.css";

export default class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      initialTime: "00:00:00",
      initialTime1: "00:00:00",
      initialTime2: "00:00:00",
      initialTime3: "00:00:00",
      hide1: false,
      hide2: true,
      hide3: true,
      timer1: false,
      akb: false,
    };
    this.buttonHide1 = this.buttonHide1.bind(this);
    this.buttonHide2 = this.buttonHide2.bind(this);
    this.buttonHide3 = this.buttonHide3.bind(this);
  }
  buttonHide2() {
    // var time = new Date();
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var sce = date.getSeconds();
    var strTime = hours + ":" + minutes + ":" + sce + " " + ampm;
    const checkOutTime = strTime;

    this.setState({
      initialTime1: `${strTime}`,
      hide2: true,
      hide1: true,
      hide3: false,
    });

    Axios.post("/checkout", { checkOutTime });
  }
  buttonHide1() {
    // var time = new Date();
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var sce = date.getSeconds();
    var strTime = hours + ":" + minutes + ":" + sce + " " + ampm;
    const checkInTime = strTime;

    this.setState({
      hide2: false,
      hide1: true,
      initialTime: `${strTime}`,
      timer1: true,
    });

    Axios.post("/checkin", { checkInTime });
  }
  buttonHide3() {
    this.setState({
      initialTime: "00:00",
      initialTime1: "00:00",
      hide3: true,
      hide1: false,
      timer1: false,
      akb: true,
    });
  }
  render() {
    return (
      <>
        <div class="center1">
          <button
            hidden={this.state.hide1}
            onClick={this.buttonHide1}
            class="btn btn-primary btn-lg"
          >
            Check In
          </button>
        </div>
        <div class="center1">
          <button
            hidden={this.state.hide2}
            onClick={this.buttonHide2}
            class="btn btn-primary btn-lg"
          >
            Check Out
          </button>
        </div>
        <div class="center1">
          <button
            hidden={this.state.hide3}
            onClick={this.buttonHide3}
            class="btn btn-primary btn-lg"
          >
            Reset
          </button>
        </div>
        <div class="arrange">
          <div class="row">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Check In Time</p>
                  <div class="react-time-box">
                    <h1 class="card-title">{this.state.initialTime}</h1>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="stats">Check IN Time</div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-success card-header-icon">
                  <p class="card-category">Time After Arival</p>
                  <div class="react-time-box">
                    <h1 class="card-title">
                      {this.state.timer1 ? <Timer1 /> : "00:00:00"}
                    </h1>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="stats">Time After Arival</div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-danger card-header-icon">
                  <p class="card-category">Break Time</p>
                  <h6 class="card-title">
                    <Break akbar={this.state.akb} />
                  </h6>
                </div>
                <div class="card-footer">
                  <div class="stats">Break Time</div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                  <p class="card-category">Check Out Time</p>
                  <div class="react-time-box">
                    <h1 class="card-title">{this.state.initialTime1}</h1>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="stats">Check Out Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
