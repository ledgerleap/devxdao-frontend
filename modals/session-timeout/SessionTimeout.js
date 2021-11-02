import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  removeActiveModal,
  saveDraftBeforeLogout,
  saveUser,
} from "../../redux/actions";
import "./style.scss";
import Helper from "../../utils/Helper";

const mapStateToProps = () => {
  return {};
};

class SessionTimeout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
      intervalId: null,
    };
  }

  componentDidMount() {
    const intervalIdTemp = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 });
    }, 1000);
    this.setState({ intervalId: intervalIdTemp });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  logout = () => {
    this.props.dispatch(saveDraftBeforeLogout(true));
    Helper.storeUser({});
    this.props.dispatch(saveUser({}));
    this.hideModal();
  };

  hideModal = () => {
    this.props.dispatch(removeActiveModal());
  };

  render() {
    return (
      <div id="session-timeout-modal">
        <h3 className="pb-3">Session Timeout</h3>
        <p>{`You are being timeout in ${this.state.timer} sec due to inactivity. Please choose to stay signed in or to log off. Otherwise, you will be logged off automatically.`}</p>
        <div className="actions">
          <button className="btn btn-primary-outline" onClick={this.logout}>
            Log off
          </button>
          <button className="btn btn-primary" onClick={this.hideModal}>
            Stay Logged in ({this.state.timer})
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(SessionTimeout));
