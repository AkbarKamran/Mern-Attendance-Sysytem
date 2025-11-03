import React from "react";
import { Redirect } from "react-router-dom";

export default class Logout extends React.Component {
  constructor() {
    super();
    // token remove
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
  }

  render() {
    return <Redirect to="/" />;
  }
}
