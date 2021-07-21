import React, { Component } from "react";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import {
  setActiveModal,
  setReviewUser,
  showCanvas,
  hideCanvas,
  setAdminUserTableStatus,
} from "../../redux/actions";
import { activateUser, rejectUser } from "../../utils/Thunk";

import "./user-review.scss";

// eslint-disable-next-line no-undef
const moment = require("moment");

const mapStateToProps = (state) => {
  return {
    reviewUser: state.admin.reviewUser,
  };
};

class UserReview extends Component {
  hideModal = () => {
    this.props.dispatch(setActiveModal(""));
    this.props.dispatch(setReviewUser({}));
  };

  activate = (e) => {
    const { reviewUser } = this.props;
    if (!reviewUser || !reviewUser.id) return;

    e.preventDefault();
    if (!confirm("Are you sure you are going to activate this user?")) return;

    this.props.dispatch(
      activateUser(
        reviewUser.id,
        () => {
          this.props.dispatch(showCanvas());
        },
        () => {
          this.props.dispatch(hideCanvas());
          this.props.dispatch(setActiveModal(""));
          this.props.dispatch(setReviewUser({}));
          this.props.dispatch(setAdminUserTableStatus(true));
        }
      )
    );
  };

  reject = (e) => {
    const { reviewUser } = this.props;
    if (!reviewUser || !reviewUser.id) return;

    e.preventDefault();
    if (!confirm("Are you sure you are going to reject this user?")) return;

    this.props.dispatch(
      rejectUser(
        reviewUser.id,
        () => {
          this.props.dispatch(showCanvas());
        },
        () => {
          this.props.dispatch(hideCanvas());
          this.props.dispatch(setActiveModal(""));
          this.props.dispatch(setReviewUser({}));
          this.props.dispatch(setAdminUserTableStatus(true));
        }
      )
    );
  };

  render() {
    const { reviewUser } = this.props;

    if (!reviewUser || !reviewUser.id) return;

    return (
      <div id="user-review-modal">
        <div className="custom-modal-close" onClick={this.hideModal}>
          <Icon.X />
          <label>Close Window</label>
        </div>

        <h2>{reviewUser.email}</h2>

        <ul>
          <li>
            <label>Name:</label>
            <span>
              {reviewUser.first_name} {reviewUser.last_name}
            </span>
          </li>
          <li>
            <label>DOB:</label>
            <span>
              {reviewUser.dob ? moment(reviewUser.dob).format("M/D/YYYY") : ""}
            </span>
          </li>
          <li>
            <label>Address:</label>
            <span>
              {reviewUser.address} {reviewUser.city}, {reviewUser.zip}
            </span>
          </li>
          <li>
            <label>Member Type:</label>
            <span>Full Member</span>
          </li>
          <li>
            <label>Country:</label>
            <span>{reviewUser.country_residence}</span>
          </li>
          <li>
            <label>Country of Citizenship:</label>
            <span>{reviewUser.country_citizenship}</span>
          </li>
        </ul>

        <div id="user-review-modal__buttons">
          <a className="btn btn-primary" onClick={this.activate}>
            Activate User
          </a>
          <a className="btn btn-danger" onClick={this.reject}>
            Reject User
          </a>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserReview);
