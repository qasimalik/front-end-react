import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import {
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBInput,
} from "mdb-react-ui-kit";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    phone: "",
    gender: "",
    success: false,
  });

  const { name, email, password, phone, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, phone })
      .then((data) => {
        console.log("DATA", data);
        if (data.email === email) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            phone: "",
            success: true,
          });
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account created successfully. Please{" "}
            <Link to="/signin">login now.</Link>
          </div>
        </div>
      </div>
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

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-3">
              <label className="text-light">Name</label>
              <MDBInput
                id="typeText"
                value={name}
                onChange={handleChange("name")}
                type="text"
              />
            </div>
            <div className="form-group mb-3">
              <label className="text-light">Email</label>
              <MDBInputGroup value={email} onChange={handleChange("email")}>
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
            <div className="form-group mb-3">
              <label className="text-light">Phone</label>
              <MDBInput
                value={phone}
                onChange={handleChange("phone")}
                id="typePhone"
                type="number"
              />
            </div>
            {/* <MDBBtn outline rounded color="success" onClick={onSubmit}>
              Success
            </MDBBtn> */}
            <button
              rounded
              onClick={onSubmit}
              className="btn btn-block"
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
    <Base title="Sign Up Page" description="Sign up to shop">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
