import React from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import { Redirect } from "react-router";

export default function Register() {
  let emailInput = React.createRef();
  let passwordInput = React.createRef();
  const history = useHistory();

  function onclick1() {
    const username = emailInput.current.value;
    const password = passwordInput.current.value;
    if (username && password) {
      Axios.post("/register", { username, password })
        .then((res) => {
          console.log(res);

          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          alert("Email alrady Exist");
          window.location.reload();
        });
    }
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div onSubmit={<Redirect to="/login" />} class="box">
              <h1>NeooPal Login</h1>
              <p class="text-muted">Please enter your login and password!</p>
              <input type="text" placeholder="Username" ref={emailInput} />
              <input
                type="password"
                placeholder="Password"
                ref={passwordInput}
              />
              <input onClick={onclick1} type="submit" value="register" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
