import React from "react";

import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import User from "./components/User";
import Logout from "./components/Logout";
import Register from "./components/Register";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/user" component={User} />

      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
    </Switch>
  );
}

export default App;
