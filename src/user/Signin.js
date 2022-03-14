import React, { useState } from "react";
import {Redirect } from "react-router-dom";

import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

import {
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBInput,
} from "mdb-react-ui-kit";

const Signin = () => {
  const [values, setValues] = useState({
    email: "idk@g.in",
    password: "12345",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token) {
          //let sessionToken = data.token;
          authenticate(data, () => {
            console.log("TOKKEN ADDED");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check all fields again
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-3">
              <label className="text-light">Email</label>
              <MDBInputGroup
                name="email"
                value={email}
                onChange={handleChange("email")}
              >
                <MDBInputGroupText>@</MDBInputGroupText>
                <MDBInputGroupElement
                  type="text"
                  placeholder="Recipient's username"
                />
              </MDBInputGroup>
            </div>
            <div className="form-group mb-3">
              <label className="text-light">Password</label>
              <MDBInput
                id="typePassword"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>

            <button
              onClick={onSubmit}
              className="btn btn-success"
              style={{ background: "#00C853", color: "white" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Login Page" description="Login to shop">
      {errorMessage()}
      {loadingMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
