/* eslint-disable no-unreachable */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { GlobalCanvasComponent, PopupAlertComponent } from "../components";
import { hideAlert } from "../redux/actions";
import { UserReviewModal } from "../modals";

const mapStateToProps = (state) => {
  return {
    showAlert: state.global.showAlert,
    showAlertMessage: state.global.showAlertMessage,
    showAlertType: state.global.showAlertType,
    showCanvas: state.global.showCanvas,
    authUser: state.global.authUser,
    activeModal: state.global.activeModal,
  };
};

class Global extends Component {
  hideAlert = () => {
    this.props.dispatch(hideAlert());
  };

  render() {
    const {
      showCanvas,
      showAlert,
      showAlertMessage,
      showAlertType,
      activeModal,
    } = this.props;

    return (
      <Fragment>
        {showCanvas ? <GlobalCanvasComponent /> : null}

        <PopupAlertComponent
          onClose={this.hideAlert}
          shown={showAlert}
          message={showAlertMessage}
          type={showAlertType}
        />

        {activeModal ? (
          <div className="custom-modals">
            {activeModal == "user-review-modal" ? <UserReviewModal /> : null}
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Global);
