import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { hideCanvas, removeActiveModal, showCanvas } from "../../redux/actions";
import Helper from "../../utils/Helper";
import { getVoterResponse } from "../../utils/Thunk";

import "./style.scss";

const mapStateToProps = () => {
  return {};
};

class ShowSurveyVoterAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
    };
  }

  componentDidMount() {
    const { surveyId, user } = this.props.data;
    this.props.dispatch(
      getVoterResponse(
        surveyId,
        user?.user_id,
        {},
        () => {
          this.props.dispatch(showCanvas());
        },
        (res) => {
          this.props.dispatch(hideCanvas());
          if (res.success) {
            this.setState({ proposals: res.proposals });
          }
        }
      )
    );
  }

  hideModal = () => {
    this.props.dispatch(removeActiveModal());
  };

  // Render Content
  render() {
    const { user } = this.props.data;
    const { proposals } = this.state;
    return (
      <div id="show-survey-voter-answer-modal">
        <p className="pb-4">{`User ${user?.email} survey answers for survey #S4`}</p>
        <ul>
          {proposals.map((item) => (
            <li key={item.id}>
              {Helper.ordinalSuffixOf(item.place_choice)} Place -{" "}
              <Link to={`/app/proposal/${item.id}`} onClick={this.hideModal}>
                <b>{item.title}</b>
              </Link>
            </li>
          ))}
        </ul>
        <div className="actions">
          <button className="btn btn-primary small" onClick={this.hideModal}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(ShowSurveyVoterAnswer));
