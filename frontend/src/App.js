import React from "react";

import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import User from "./components/User";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Report from "./components/Report";
import RequestLeave from "./components/RequestLeave";
import AttendanceHistory from "./components/AttendanceHistory";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/user" component={User} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/report" component={Report} />
      <Route path="/request" component={RequestLeave} />
      <Route path="/attendance-history" component={AttendanceHistory} />
    </Switch>
  );
}

export default App;
