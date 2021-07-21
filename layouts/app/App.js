import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import { AppRoutes } from "../../routes";
import HeaderLayout from "../header/Header";

import "./app.scss";

const mapStateToProps = () => {
  return {};
};

class App extends Component {
  getLocation() {
    const { history } = this.props;
    if (history && history.location && history.location.pathname)
      return history.location.pathname;
    return "/";
  }

  render() {
    const { auth } = this.props;
    const location = this.getLocation();

    let className = "outer-page-wrap bg-1";
    let headerType = "default";

    // App Scheme
    switch (location) {
      case "/review-terms":
      case "/verify-kyc":
        className = "outer-page-wrap white-scheme bg-2";
        headerType = "blue";
        break;
      default:
        break;
    }

    // Render View
    return (
      <div className={className}>
        <img id="bg-narrow" src="/tc-min.png" alt="" />
        <img id="bg-wide" src="/bl-min.png" alt="" />
        <img id="bg-square" src="/cr-min.png" alt="" />
        <div id="bg-wave"></div>

        <HeaderLayout type={headerType} />

        <div className="page-wrap">
          <Switch>
            <AppRoutes auth={auth} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(App));
