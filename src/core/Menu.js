import React, { Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#00C853" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history, path }) => {
  return (
    <ul className="nav nav-tabs bg-dark">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <Container>
              <img
                src={require("./logo.png")}
                width="80"
                height="80"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Container>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link
                style={currentTab(history, "/")}
                className="fs-5 nav-link"
                to="/"
              >
                Home
              </Link>
              {isAuthenticated() && (
                <Link
                  style={currentTab(history, "/cart")}
                  className="fs-5 nav-link"
                  to="/cart"
                >
                  Cart
                </Link>
              )}

              {isAuthenticated() && (
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link fs-5"
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              )}
              {!isAuthenticated() && (
                <Fragment>
                  <Link
                    style={currentTab(history, "/signup")}
                    className="nav-link fs-5"
                    to="/signup"
                  >
                    Signup
                  </Link>

                  <Link
                    style={currentTab(history, "/signin")}
                    className="nav-link fs-5"
                    to="/signin"
                  >
                    Signin
                  </Link>
                </Fragment>
              )}

              {isAuthenticated() && (
                <span
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                  className="nav-link text-warning  fs-5"
                >
                  Signout
                </span>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </ul>
  );
};

export default withRouter(Menu);
