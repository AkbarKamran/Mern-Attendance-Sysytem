import React, { Component } from "react";
import Axios from "axios";
import "../App.css";

export default class TodayStatus extends Component {
  constructor() {
    super();
    this.state = {
      todayRecord: null,
      loading: true,
      currentTime: new Date(),
    };
  }

  componentDidMount() {
    this.fetchTodayStatus();
    // Update current time every second for live timer
    this.timer = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  fetchTodayStatus = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        this.setState({ loading: false });
        return;
      }

      const response = await Axios.get(`/attendance/${userEmail}`);
      const today = new Date().toISOString().split("T")[0];
      
      // Find today's record
      const todayRecord = response.data.attendance?.find(
        (record) => record.date === today
      );

      this.setState({
        todayRecord: todayRecord || null,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching today's status:", error);
      this.setState({ loading: false });
    }
  };

  calculateWorkHours = (checkInTime, checkOutTime) => {
    if (!checkInTime) return null;
    if (!checkOutTime) {
      // Calculate current work hours if still checked in
      return this.calculateCurrentWorkHours(checkInTime);
    }

    try {
      const parseTime = (timeStr) => {
        const [time, period] = timeStr.split(" ");
        const [hours, minutes, seconds] = time.split(":");
        let hour24 = parseInt(hours);
        if (period.toLowerCase() === "pm" && hour24 !== 12) {
          hour24 += 12;
        } else if (period.toLowerCase() === "am" && hour24 === 12) {
          hour24 = 0;
        }
        return hour24 * 60 + parseInt(minutes) + parseFloat(seconds) / 60;
      };

      const checkInMinutes = parseTime(checkInTime);
      const checkOutMinutes = parseTime(checkOutTime);

      if (checkOutMinutes < checkInMinutes) {
        const totalMinutes = 24 * 60 - checkInMinutes + checkOutMinutes;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.round(totalMinutes % 60);
        return `${hours}h ${minutes}m`;
      } else {
        const totalMinutes = checkOutMinutes - checkInMinutes;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.round(totalMinutes % 60);
        return `${hours}h ${minutes}m`;
      }
    } catch (error) {
      return "Error";
    }
  };

  calculateCurrentWorkHours = (checkInTime) => {
    try {
      const parseTime = (timeStr) => {
        const [time, period] = timeStr.split(" ");
        const [hours, minutes, seconds] = time.split(":");
        let hour24 = parseInt(hours);
        if (period.toLowerCase() === "pm" && hour24 !== 12) {
          hour24 += 12;
        } else if (period.toLowerCase() === "am" && hour24 === 12) {
          hour24 = 0;
        }
        return new Date().setHours(hour24, parseInt(minutes), parseInt(seconds));
      };

      const checkInDate = parseTime(checkInTime);
      const now = new Date();
      const diffMs = now - checkInDate;
      const diffMinutes = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return `${hours}h ${minutes}m`;
    } catch (error) {
      return "Calculating...";
    }
  };

  formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  render() {
    const { todayRecord, loading } = this.state;

    if (loading) {
      return (
        <div class="col-md-12">
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <p class="card-category">Today's Status</p>
              <h3 class="card-title">Loading...</h3>
            </div>
          </div>
        </div>
      );
    }

    const isCheckedIn = todayRecord && todayRecord.checkInTime;
    const isCheckedOut = todayRecord && todayRecord.checkOutTime;
    const workHours = isCheckedIn
      ? this.calculateWorkHours(
          todayRecord.checkInTime,
          todayRecord.checkOutTime
        )
      : null;

    return (
      <div class="col-md-12">
        <div class="card card-stats">
          <div class="card-header card-header-primary card-header-icon">
            <div class="card-icon">
              <i class="material-icons">today</i>
            </div>
            <p class="card-category">Today's Status</p>
            <h3 class="card-title">{this.formatDate()}</h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="statistics">
                  <div class="info">
                    <div class="icon icon-primary">
                      <i class="material-icons">login</i>
                    </div>
                    <div class="description">
                      <p class="card-category">Check In</p>
                      <h3 class="card-title">
                        {isCheckedIn ? todayRecord.checkInTime : "Not checked in"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="statistics">
                  <div class="info">
                    <div class="icon icon-success">
                      <i class="material-icons">logout</i>
                    </div>
                    <div class="description">
                      <p class="card-category">Check Out</p>
                      <h3 class="card-title">
                        {isCheckedOut
                          ? todayRecord.checkOutTime
                          : "Not checked out"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {workHours && (
              <div class="row" style={{ marginTop: "20px" }}>
                <div class="col-md-12">
                  <div class="statistics">
                    <div class="info">
                      <div class="icon icon-info">
                        <i class="material-icons">schedule</i>
                      </div>
                      <div class="description">
                        <p class="card-category">Work Hours</p>
                        <h3 class="card-title">{workHours}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div class="row" style={{ marginTop: "20px" }}>
              <div class="col-md-12 text-center">
                {!isCheckedIn ? (
                  <span class="badge badge-warning badge-lg">
                    Not Checked In
                  </span>
                ) : isCheckedOut ? (
                  <span class="badge badge-success badge-lg">
                    Day Complete
                  </span>
                ) : (
                  <span class="badge badge-info badge-lg">Active Session</span>
                )}
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="material-icons">update</i> Last updated:{" "}
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


