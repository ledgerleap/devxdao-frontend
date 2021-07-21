import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import EmailVerifyView from "./email-verify/EmailVerify";
import ThankYouView from "../thank-you/ThankYou";

const mapStateToProps = (state) => {
  return {
    authUser: state.global.authUser,
  };
};

class Auth extends Component {
  render() {
    const { authUser } = this.props;

    if (!authUser || !authUser.id || !authUser.profile || !authUser.profile.id)
      return null;

    const { profile } = authUser;

    // Admin Redirect
    if (authUser.is_admin) return <Redirect to="/dashboard" />;

    // User Redirect
    if (!authUser.email_verified) return <EmailVerifyView />;
    else if (!authUser.is_admin && !profile.step_review)
      return <Redirect to="/review-terms" />;
    else if (!authUser.is_admin && !profile.step_kyc)
      return <Redirect to="/verify-kyc" />;

    return <ThankYouView />;
  }
}

export default connect(mapStateToProps)(withRouter(Auth));
