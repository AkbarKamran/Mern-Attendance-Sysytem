import React from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import "../App.css";

export default class AttendanceHistory extends React.Component {
  constructor() {
    super();
    let loggedIn = false;
    const token = localStorage.getItem("token");
    if (token) loggedIn = true;

    this.state = {
      loggedIn,
      attendance: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchAttendanceHistory();
  }

  fetchAttendanceHistory = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        this.setState({ loading: false, error: "User email not found" });
        return;
      }

      const response = await Axios.get(`/attendance/${userEmail}`);
      this.setState({
        attendance: response.data.attendance || [],
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching attendance:", error);
      this.setState({
        loading: false,
        error: "Failed to load attendance history",
      });
    }
  };

  calculateWorkHours = (checkInTime, checkOutTime) => {
    if (!checkInTime || !checkOutTime) return "N/A";
    
    try {
      // Parse time strings (format: "12:30:45 pm")
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
        // Overnight shift (unlikely but handle it)
        const totalMinutes = (24 * 60) - checkInMinutes + checkOutMinutes;
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

  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/logout" />;
    }

    const { attendance, loading, error } = this.state;

    return (
      <>
        <nav
          class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top"
          id="navigation-example"
        >
          <div class="container-fluid">
            <div class="navbar-wrapper">
              <a class="navbar-brand" href="javascript:void(0)">
                Attendance History
              </a>
            </div>
          </div>
        </nav>

        <div class="wrapper">
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
                <li class="nav-item">
                  <a class="nav-link">
                    <Link to="/user">
                      <p>Dashboard</p>
                    </Link>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link">
                    <Link to="/attendance-history">
                      <p>Attendance History</p>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">
                    <Link to="/report">
                      <p>Report</p>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">
                    <Link to="/request">
                      <p>Request Form</p>
                    </Link>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="main-panel">
            <div class="content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card">
                      <div class="card-header card-header-primary">
                        <h4 class="card-title">My Attendance History</h4>
                        <p class="card-category">
                          View your past check-in and check-out records
                        </p>
                      </div>
                      <div class="card-body">
                        {loading ? (
                          <div class="text-center">
                            <p>Loading attendance history...</p>
                          </div>
                        ) : error ? (
                          <div class="alert alert-danger" role="alert">
                            {error}
                          </div>
                        ) : attendance.length === 0 ? (
                          <div class="alert alert-info" role="alert">
                            No attendance records found. Start checking in to see
                            your history here.
                          </div>
                        ) : (
                          <div class="table-responsive">
                            <table class="table table-hover">
                              <thead class="text-primary">
                                <tr>
                                  <th>Date</th>
                                  <th>Check In</th>
                                  <th>Check Out</th>
                                  <th>Work Hours</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {attendance
                                  .slice()
                                  .reverse()
                                  .map((record, index) => (
                                    <tr key={index}>
                                      <td>{this.formatDate(record.date)}</td>
                                      <td>{record.checkInTime || "N/A"}</td>
                                      <td>
                                        {record.checkOutTime || "Not checked out"}
                                      </td>
                                      <td>
                                        {this.calculateWorkHours(
                                          record.checkInTime,
                                          record.checkOutTime
                                        )}
                                      </td>
                                      <td>
                                        {record.checkOutTime ? (
                                          <span class="badge badge-success">
                                            Complete
                                          </span>
                                        ) : (
                                          <span class="badge badge-warning">
                                            Active
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        )}
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



