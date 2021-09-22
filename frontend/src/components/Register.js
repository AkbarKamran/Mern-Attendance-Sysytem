import React from "react";
import Axios from "axios";
import "./box.css";
import { useHistory } from "react-router-dom";

import { Redirect } from "react-router";

export default function Register() {
  let emailInput = React.createRef();
  let passwordInput = React.createRef();
  let firstName = React.createRef();
  let lastName = React.createRef();
  const history = useHistory();

  function onclick1() {
    const username = emailInput.current.value;
    const password = passwordInput.current.value;
    const firstName1 = firstName.current.value;
    const lastName1 = lastName.current.value;
    if (username && password && firstName1 && lastName1) {
      Axios.post("/register", { username, password, firstName1, lastName1 })
        .then((res) => {
          console.log(res);

          alert("data Saved");
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          alert("Email alrady Exist");
          window.location.reload();
        });
    }
  }
  function onclick2() {
    history.push("/");
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div onSubmit={<Redirect to="/login" />} class="box">
              <h1>NeooPal Login</h1>
              <p class="text-muted">Please enter your login and password!</p>
              <input
                type="text"
                placeholder="First Name"
                ref={firstName}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                ref={lastName}
                required
              />
              <input
                type="text"
                placeholder="Username"
                ref={emailInput}
                required
              />
              <input
                type="password"
                placeholder="Password"
                ref={passwordInput}
                required
              />
              <input onClick={onclick1} type="submit" value="SignUp" />
              <input onClick={onclick2} type="submit" value="Login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
