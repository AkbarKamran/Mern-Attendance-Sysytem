import React, { Component } from "react";
import Axios from "axios";
import Moment from "moment";

export default class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      initialTime: "00:00",
      initialTime1: "00:00",
      hide1: false,
      hide2: true,
      hide3: true,
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
    var strTime = hours + ":" + minutes + " " + ampm;
    const ak = strTime;

    this.setState({
      initialTime1: `${strTime}`,
      hide2: true,
      hide1: true,
      hide3: false,
    });

    Axios.post("/checkin", { ak });
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
    var strTime = hours + ":" + minutes + " " + ampm;
    const ak = strTime;

    this.setState({
      hide2: false,
      hide1: true,
      initialTime: `${strTime}`,
    });

    Axios.post("/checkin", { ak });
  }
  buttonHide3() {
    this.setState({
      initialTime: "00:00",
      initialTime1: "00:00",
      hide3: true,
      hide1: false,
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
        <div class="center2">
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
                  <p class="card-category">Used Space</p>
                  <h1 class="card-title">{this.state.initialTime}</h1>
                </div>
                <div class="card-footer">
                  <div class="stats">Check IN Time</div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-success card-header-icon">
                  <p class="card-category">Revenue</p>
                  <h1 class="card-title">{Moment().format("LTS")}</h1>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">date_range</i> Last 24 Hours
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-danger card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">info_outline</i>
                  </div>
                  <p class="card-category">Fixed Issues</p>
                  <h3 class="card-title">75</h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">local_offer</i> Tracked from
                    Github
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                  <h1 class="card-title">{this.state.initialTime1}</h1>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">update</i> Just Updated
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
