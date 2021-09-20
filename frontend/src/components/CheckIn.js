import React, { Component } from "react";
import Axios from "axios";

export default class CheckIn extends Component {
  buttonHide1() {
    var time = new Date();

    const ak = time.toLocaleString("en-US", { hour: "numeric", hour12: true });

    Axios.post("/checkin", { ak });
  }
  render() {
    return (
      <>
        <button onClick={this.buttonHide1} class="btn btn-primary btn-lg">
          Check In
        </button>
      </>
    );
  }
}
