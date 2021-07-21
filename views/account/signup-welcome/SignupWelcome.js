import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./signup-welcome.scss";

const mapStateToProps = () => {
  return {};
};

class SignupWelcome extends Component {
  render() {
    return (
      <div id="signup-welcome-page">
        <div className="custom-container">
          <h1>Registration</h1>
          <p className="text-center font-weight-500 font-size-18">
            Thank you for your interest in the DevDao. Please fill out the form
            to register and create an account.
          </p>

          <Link to="/register/form" className="btn btn-primary">
            Begin Registration
          </Link>

          <p className="text-center font-size-12">
            Already have an account?
            <br />
            <Link to="/login" className="link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SignupWelcome);
