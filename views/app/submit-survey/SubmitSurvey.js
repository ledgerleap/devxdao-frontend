import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Fade } from "react-reveal";
import {
  GlobalRelativeCanvasComponent,
  PageHeaderComponent,
} from "../../../components";
import "./style.scss";
import {
  getActiveDiscussions,
  getCurrentSurvey,
  submitSurvey,
} from "../../../utils/Thunk";
import {
  hideCanvas,
  saveUser,
  showAlert,
  showCanvas,
} from "../../../redux/actions";
import DiscussionProposalsTable from "../surveys/components/tables/discussion-proposals";
import Helper from "../../../utils/Helper";
import { TimeClock } from "../shared/time-clock/TimeClock";
import moment from "moment";

const mapStateToProps = (state) => {
  return {
    authUser: state.global.authUser,
  };
};

class SubmitSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
      currentSurvey: null,
      discussions: [],
      responses: [],
      downvoteResponses: [],
      noSurvey: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(
      getCurrentSurvey(
        () => {
          this.setState({ showLoading: true });
        },
        (res) => {
          this.setState({ showLoading: false });
          if (res.success) {
            this.setState({ currentSurvey: res.survey });
          } else {
            this.setState({ noSurvey: true });
          }
        }
      )
    );
    this.props.dispatch(
      getActiveDiscussions(
        { limit: 9999, ignore_previous_winner: 1 },
        () => {},
        (res) => {
          const discussions = res.proposals || [];
          this.setState({ discussions });
        }
      )
    );
  }

  checkSkip = (i) => {
    if (i === 0) return null;
    return true;
  };

  renderDiscussions = (i, status) => {
    const { responses, downvoteResponses, discussions } = this.state;
    let otherIds;
    let ids;
    let currentIds;
    if (status === "up") {
      otherIds = downvoteResponses.filter((x) => !!x).map((x) => x.proposal_id);
      ids = responses.filter((x) => !!x).map((x) => x.proposal_id);
      currentIds = ids.filter((x) => x !== responses[i]?.proposal_id);
    } else {
      otherIds = responses.filter((x) => !!x).map((x) => x.proposal_id);
      ids = downvoteResponses.filter((x) => !!x).map((x) => x.proposal_id);
      currentIds = ids.filter((x) => x !== downvoteResponses[i]?.proposal_id);
    }
    const temp = discussions
      .filter((x) => !otherIds.includes(x.id))
      .filter((x) => !currentIds.includes(x.id));
    return temp;
  };

  setResponse = (e, i) => {
    const { responses } = this.state;
    if (e.target.value === "skip") {
      responses[i] = null;
    } else {
      responses[i] = {
        proposal_id: +e.target.value,
        place_choice: i + 1,
      };
    }
    this.setState({ responses });
  };

  setDownvoteResponse = (e, i) => {
    const { downvoteResponses } = this.state;
    if (e.target.value === "skip") {
      downvoteResponses[i] = null;
    } else {
      downvoteResponses[i] = {
        proposal_id: +e.target.value,
        place_choice: i + 1,
      };
    }
    this.setState({ downvoteResponses });
  };

  submitResponse = () => {
    const { authUser } = this.props;
    const { currentSurvey, responses, downvoteResponses } = this.state;
    let body = {
      upvote_responses: responses.filter((x) => !!x),
    };
    if (+currentSurvey.downvote === 1) {
      body.downvote_responses = downvoteResponses.filter((x) => !!x);
    }
    this.props.dispatch(
      submitSurvey(
        currentSurvey.id,
        body,
        () => {
          this.props.dispatch(showCanvas());
        },
        (res) => {
          this.props.dispatch(hideCanvas());
          if (res.success) {
            currentSurvey.is_submitted = true;
            this.setState({ currentSurvey });
            authUser.has_survey = 0;
            this.props.dispatch(saveUser({ ...authUser }));
            this.props.dispatch(
              showAlert("Submit Responses successfully!", "success")
            );
          }
        }
      )
    );
    // if (+currentSurvey.downvote === 1) {
    //   this.props.dispatch(
    //     submitDownvoteSurvey(
    //       currentSurvey.id,
    //       { responses: downvoteResponses.filter((x) => !!x) },
    //       () => {
    //         this.props.dispatch(showCanvas());
    //       },
    //       (res) => {
    //         this.props.dispatch(hideCanvas());
    //         if (res.success) {
    //           currentSurvey.is_submitted = true;
    //           this.setState({ currentSurvey });
    //           authUser.has_survey = 0;
    //           this.props.dispatch(saveUser({ ...authUser }));
    //           this.props.dispatch(
    //             showAlert("Submit Responses successfully!", "success")
    //           );
    //         }
    //       }
    //     )
    //   );
    // }
  };

  checkUserInput = () => {
    const { responses, downvoteResponses, currentSurvey } = this.state;
    if (currentSurvey?.downvote) {
      return (
        +responses.length === +currentSurvey?.number_response &&
        +downvoteResponses.length === +currentSurvey?.number_response
      );
    } else {
      return +responses.length === +currentSurvey?.number_response;
    }
  };

  render() {
    const { authUser } = this.props;
    const {
      currentSurvey,
      showLoading,
      responses,
      noSurvey,
      downvoteResponses,
    } = this.state;

    if (!authUser || !authUser.id) return null;
    if (!authUser.is_member) return <Redirect to="/" />;

    return (
      <div id="app-submit-survey-page">
        <Fade distance={"20px"} bottom duration={300} delay={600}>
          <PageHeaderComponent title="" />
          <section className="app-infinite-box mb-4">
            {showLoading && <GlobalRelativeCanvasComponent />}
            {!showLoading && (
              <>
                <div className="app-infinite-search-wrap">
                  {currentSurvey?.status === "active" &&
                    !currentSurvey?.is_submitted && (
                      <h4>Welcome to Survey #S{currentSurvey?.id}</h4>
                    )}
                  {currentSurvey?.status === "active" &&
                    currentSurvey?.is_submitted && (
                      <h4>Thank you for submitting</h4>
                    )}
                  {currentSurvey?.status === "completed" && (
                    <h4>Survey #S{currentSurvey?.id} has ended</h4>
                  )}
                  {currentSurvey?.status === "cancel" && (
                    <h4>Survey #S{currentSurvey?.id} has cancelled</h4>
                  )}
                  {noSurvey && (
                    <div>
                      <h6>
                        There are no active surveys at this time. Please check
                        back again later.
                      </h6>
                      <div className="py-3">
                        <Link to="/app" className="btn btn-primary less-small">
                          Back to dashboard
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                {currentSurvey?.status === "active" &&
                  !currentSurvey?.is_submitted && (
                    <>
                      <div className="pb-3 pl-5 pr-3">
                        <div className="c-form-row">
                          <h5 className="my-2 text-bold">UPVOTES</h5>
                          <label>
                            Please select your favorite
                            {currentSurvey?.number_response} proposals from the
                            pool of proposals that have not yet begun their
                            informal vote.
                          </label>
                          <div className="flex box-vote">
                            {Array(+currentSurvey?.number_response || 0)
                              .fill(1)
                              .map((choice, i) => (
                                <select
                                  key={i}
                                  defaultValue=""
                                  value={responses[i]?.proposal_id}
                                  onChange={(e) => this.setResponse(e, i)}
                                >
                                  <option value="" disabled>
                                    Select your {Helper.ordinalSuffixOf(i + 1)}{" "}
                                    place choice
                                  </option>
                                  {this.checkSkip(i) && (
                                    <option value="skip">Skip</option>
                                  )}
                                  {this.renderDiscussions(i, "up").map(
                                    (item) => (
                                      <option key={item.id} value={item.id}>
                                        {item.id} - {item.title}
                                      </option>
                                    )
                                  )}
                                </select>
                              ))}
                          </div>
                        </div>
                        {+currentSurvey?.downvote === 1 && (
                          <div className="mt-4 c-form-row">
                            <h5 className="my-2 text-bold">DOWNVOTES</h5>
                            <label>
                              {`Please select the ${currentSurvey?.number_response}
                              grants that you DO NOT think should move forward.
                              The ${currentSurvey?.number_response} of grants with
                              the most DOWNVOTES will have their discussion ended
                              and NOT move forward to become a grant. You may skip
                              responses if you choose.`}
                            </label>
                            <div className="flex box-vote">
                              {Array(+currentSurvey?.number_response || 0)
                                .fill(1)
                                .map((choice, i) => (
                                  <select
                                    key={i}
                                    defaultValue=""
                                    value={downvoteResponses[i]?.proposal_id}
                                    onChange={(e) =>
                                      this.setDownvoteResponse(e, i)
                                    }
                                  >
                                    <option value="" disabled>
                                      {`Select your ${Helper.ordinalSuffixOf(
                                        i + 1
                                      )} place choice`}
                                    </option>
                                    {this.checkSkip(i) && (
                                      <option value="skip">Skip</option>
                                    )}
                                    {this.renderDiscussions(i, "down").map(
                                      (item) => (
                                        <option key={item.id} value={item.id}>
                                          {item.id} - {item.title}
                                        </option>
                                      )
                                    )}
                                  </select>
                                ))}
                            </div>
                          </div>
                        )}
                        <button
                          className="mt-3 btn btn-primary less-small"
                          onClick={this.submitResponse}
                          disabled={!this.checkUserInput()}
                        >
                          Submit responses
                        </button>
                        <div className="d-flex pt-2 pl-2">
                          Time remaining:
                          <b className="pl-2">
                            <TimeClock
                              lastTime={moment(currentSurvey?.end_time)}
                            />
                          </b>
                        </div>
                        <p className="py-5">
                          Click any proposal in the table below to see more
                          details. All proposals here have not yet won a ranking
                          position in a prior survey and are still in the
                          discussion phase.
                        </p>
                      </div>
                      <DiscussionProposalsTable
                        hideWonColumn
                        hideFilterWinner
                      />
                    </>
                  )}
                {currentSurvey?.status === "active" &&
                  currentSurvey?.is_submitted && (
                    <div className="pb-3 pl-3 pr-3">
                      <p className="pb-5">
                        We are still collecting responses from all other voting
                        associates and will update you with the winners on the
                        next public call.
                      </p>
                      <Link to="/app" className="btn btn-primary less-small">
                        Back to dashboard
                      </Link>
                    </div>
                  )}
                {currentSurvey?.status === "completed" && (
                  <div className="pb-3 pl-3 pr-3">
                    <p>The winners are listed below.</p>
                    <div className="my-3">
                      {currentSurvey?.survey_ranks
                        ?.filter((x) => x.is_winner)
                        .map((x, i) => (
                          <p className="py-2" key={i}>
                            {Helper.ordinalSuffixOf(i + 1)} Place -{" "}
                            <Link to={`/app/proposal/${x.proposal?.id}`}>
                              {x.proposal?.title}
                            </Link>
                          </p>
                        ))}
                    </div>
                    {+currentSurvey?.downvote === 1 && (
                      <>
                        <p>The downvotes are listed below.</p>
                        <div className="my-3">
                          {currentSurvey?.survey_downvote_ranks
                            ?.filter((x) => x.is_winner)
                            .map((x, i) => (
                              <p className="py-2" key={i}>
                                {Helper.ordinalSuffixOf(i + 1)} Place -{" "}
                                <Link to={`/app/proposal/${x.proposal?.id}`}>
                                  {x.proposal?.title}
                                </Link>
                              </p>
                            ))}
                        </div>
                      </>
                    )}
                    <Link to="/app" className="btn btn-primary less-small">
                      Back to dashboard
                    </Link>
                  </div>
                )}
                {currentSurvey?.status === "cancel" && (
                  <div className="pb-3 pl-3 pr-3">
                    <Link to="/app" className="btn btn-primary less-small">
                      Back to dashboard
                    </Link>
                  </div>
                )}
              </>
            )}
          </section>
        </Fade>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(SubmitSurvey));
