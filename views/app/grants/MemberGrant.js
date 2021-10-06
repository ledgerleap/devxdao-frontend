import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GlobalRelativeCanvasComponent } from "../../../components";
import {
  checkUserActiveGrant,
  getGrantsShared,
  startFormalMilestoneVotingUser,
} from "../../../utils/Thunk";
import {
  hideCanvas,
  saveUser,
  setActiveModal,
  setCustomModalData,
  setGrantTableStatus,
  setMilestoneVoteData,
  showAlert,
  showCanvas,
} from "../../../redux/actions";

import "./member-grant.scss";
// eslint-disable-next-line no-undef
const moment = require("moment");

const mapStateToProps = (state) => {
  return {
    authUser: state.global.authUser,
    grantTableStatus: state.table.grantTableStatus,
  };
};

class MemberGrant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      proposals: [],
      sort_key: "final_grant.id",
      sort_direction: "desc",
      search: "",
      page_id: 1,
      calling: false,
      finished: false,
    };

    this.$elem = null;
    this.timer = null;
  }

  componentDidMount() {
    const { authUser } = this.props;
    if (authUser && authUser.id) this.startTracking();

    this.getProposals();

    this.props.dispatch(
      checkUserActiveGrant(
        () => {},
        (res) => {
          if (res.success) {
            authUser.check_active_grant = 0;
            this.props.dispatch(saveUser({ ...authUser }));
          }
        }
      )
    );
  }

  componentWillUnmount() {
    if (this.$elem) this.$elem.removeEventListener("scroll", this.trackScroll);
  }

  componentDidUpdate(prevProps) {
    const { authUser, grantTableStatus } = this.props;

    // Start Tracking
    if (
      (!prevProps.authUser || !prevProps.authUser.id) &&
      authUser &&
      authUser.id
    )
      this.startTracking();

    if (!prevProps.grantTableStatus && grantTableStatus) {
      this.reloadTable();
      this.props.dispatch(setGrantTableStatus(false));
    }
  }

  startTracking() {
    // IntersectionObserver - We can consider using it later
    this.$elem = document.getElementById("app-grants-sectionBody");
    if (this.$elem) this.$elem.addEventListener("scroll", this.trackScroll);
  }

  // Track Scroll
  trackScroll = () => {
    if (!this.$elem) return;
    if (
      this.$elem.scrollTop + this.$elem.clientHeight >=
      this.$elem.scrollHeight
    )
      this.runNextPage();
  };

  // Handle Search
  handleSearch = (e) => {
    this.setState({ search: e.target.value }, () => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        this.reloadTable();
      }, 500);
    });
  };

  // Reload Full Table
  reloadTable() {
    this.setState({ page_id: 1, proposals: [], finished: false }, () => {
      this.getProposals();
    });
  }

  runNextPage() {
    const { calling, loading, finished, page_id } = this.state;
    if (calling || loading || finished) return;

    this.setState({ page_id: page_id + 1 }, () => {
      this.getProposals(false);
    });
  }

  getProposals(showLoading = true) {
    let {
      calling,
      loading,
      finished,
      sort_key,
      sort_direction,
      search,
      page_id,
      proposals,
    } = this.state;
    if (loading || calling || finished) return;

    const params = {
      sort_key,
      sort_direction,
      search,
      page_id,
      limit: 20,
    };

    this.props.dispatch(
      getGrantsShared(
        params,
        () => {
          if (showLoading) this.setState({ loading: true, calling: true });
          else this.setState({ loading: false, calling: true });
        },
        (res) => {
          const result = res.proposals || [];
          const finished = res.finished || false;
          this.setState({
            loading: false,
            calling: false,
            finished,
            proposals: [...proposals, ...result],
          });
        }
      )
    );
  }

  clickActivate(item) {
    this.props.dispatch(
      setCustomModalData({
        "activate-grant": {
          render: true,
          title:
            "Please upload the grant document with the association President's signature approving and activating this grant.",
          data: item,
        },
      })
    );
    this.props.dispatch(setActiveModal("custom-global-modal"));
  }

  async clickReSubmit(item, finalVote) {
    const milestones = item.proposal.milestones;
    const milestoneId = finalVote.milestone_id;
    let milestone = {};
    for (let i = 0; i < milestones.length; i++) {
      if (milestones[i].id == milestoneId) {
        milestone = milestones[i];
        break;
      }
    }
    if (!milestone || !milestone.id) return;

    const data = {
      index: item.milestones_submitted - 1,
      proposal: item.proposal,
      milestone,
    };

    await this.props.dispatch(setMilestoneVoteData(data));
    await this.props.dispatch(setActiveModal("milestone-vote"));
  }

  async clickSubmit(item) {
    const milestones = item.proposal.milestones;
    const index = item.milestones_submitted;
    if (!milestones[index]) return;

    const milestone = {
      index,
      proposal: item.proposal,
      milestone: milestones[index],
    };

    await this.props.dispatch(setMilestoneVoteData(milestone));
    await this.props.dispatch(setActiveModal("milestone-vote"));
  }

  startFormalMilestoneVote(grant) {
    const lastVote = grant.proposal?.votes[grant.proposal.votes.length - 1];
    this.props.dispatch(
      startFormalMilestoneVotingUser(
        grant.proposal_id,
        lastVote.id,
        () => {
          this.props.dispatch(showCanvas());
        },
        (res) => {
          this.props.dispatch(hideCanvas());
          if (res.success) {
            this.props.dispatch(
              showAlert(
                "Formal voting process has been started successfully",
                "success"
              )
            );
          }
        }
      )
    );
  }

  renderAction(item) {
    // Voting Associate, Associate
    if (item.status == "active") {
      if (item.milestones_submitted == 0) {
        return !item.in_review ? (
          <a
            className="btn btn-primary extra-small btn-fluid-small"
            onClick={() => this.clickSubmit(item)}
          >
            Submit Next Milestone
          </a>
        ) : (
          <button
            className="btn btn-primary extra-small btn-fluid-small"
            onClick={(e) => e.stopPropagation()}
          >
            In review with Admin
          </button>
        );
      } else {
        // We need to check vote result and decide proceed/wait/restart.
        const votes = item.proposal.votes;
        const finalVote = votes[votes.length - 1];
        if (finalVote.content_type == "milestone") {
          if (finalVote.result == "success") {
            if (finalVote.type == "formal") {
              return !item.in_review ? (
                <a
                  className="btn btn-primary extra-small btn-fluid-small"
                  onClick={() => this.clickSubmit(item)}
                >
                  Submit Next Milestone
                </a>
              ) : (
                <button
                  className="btn btn-primary extra-small btn-fluid-small"
                  onClick={(e) => e.stopPropagation()}
                >
                  In review with Admin
                </button>
              );
            }
            if (finalVote.type == "informal") {
              return (
                <a
                  className="btn btn-primary extra-small btn-fluid-small"
                  onClick={() => this.startFormalMilestoneVote(item)}
                >
                  Start Formal Milestone Vote
                </a>
              );
            }
          } else if (finalVote.result == "fail") {
            return (
              <a
                className="btn btn-primary extra-small btn-fluid-small"
                onClick={() => this.clickReSubmit(item, finalVote)}
              >
                Re-Submit Milestone
              </a>
            );
          }
        }
      }
    }
    return <label>-</label>;
  }

  showSignDialog(item) {
    if (
      !item.proposal ||
      !item.signture_grants ||
      !item.signture_grants.length
    ) {
      return null;
    }
    this.props.dispatch(
      setCustomModalData({
        signatures: {
          render: true,
          title: "Grant Agreement Signatures",
          data: item.signture_grants,
        },
      })
    );
    this.props.dispatch(setActiveModal("custom-global-modal"));
  }

  renderStatus(item) {
    if (item.status == "pending")
      return <p className="font-size-14 color-primary">Pending</p>;
    else if (item.status == "active")
      return <p className="font-size-14 color-info">Active</p>;
    return <p className="font-size-14 color-success">Completed</p>;
  }

  renderMilestonesComplete(item) {
    if (item.milestones_complete) {
      return <p className="font-size-14">{item.milestones_complete}</p>;
      /*
      return (
        <Link to={`/app/proposal/${item.proposal_id}/milestones`}>
          <u>{item.milestones_complete}</u>
        </Link>
      );
      */
    }
    return <p className="font-size-14">0</p>;
  }

  clickRow(item) {
    const { history, authUser } = this.props;
    if (authUser.is_admin || authUser.is_member)
      history.push(`/app/proposal/${item.proposal_id}`);
    else if (authUser.is_participant) {
      if (item.user_id == authUser.id) {
        // OP
        history.push(`/app/proposal/${item.proposal_id}`);
      } else {
        // Not OP & Not Vote
        if (!item.votes || !item.votes.length)
          history.push(`/app/proposal/${item.proposal_id}`);
      }
    }
  }

  renderProposals() {
    const { proposals } = this.state;
    const items = [];

    if (!proposals || !proposals.length) {
      return (
        <div id="infinite-no-result">
          <label className="font-size-14">No Results Found</label>
        </div>
      );
    }

    proposals.forEach((item) => {
      items.push(
        <li key={`proposal_${item.id}`}>
          <div className="infinite-row" onClick={() => this.clickRow(item)}>
            <div className="c-col-1 c-cols">
              <label className="font-size-14 font-weight-700">
                {item.proposal_id}
              </label>
            </div>
            <div className="c-col-2 c-cols">
              <label className="font-size-14 font-weight-700">
                {this.renderTitle(item)}
              </label>
            </div>
            <div className="c-col-3 c-cols">{this.renderStatus(item)}</div>
            <div className="c-col-4 c-cols">
              <label className="font-size-14">
                {moment(item.created_at).local().format("M/D/YYYY")}{" "}
                {moment(item.created_at).local().format("h:mm A")}
              </label>
            </div>
            <div className="c-col-5 c-cols">
              {this.renderMilestonesComplete(item)}
            </div>
            <div className="c-col-6 c-cols">
              <label className="font-size-14">
                {item.milestones_total || 0}
              </label>
            </div>
            <div className="c-col-7 c-cols">{this.renderAction(item)}</div>
          </div>
        </li>
      );
    });
    return <ul>{items}</ul>;
  }

  renderTitle(item) {
    return item.proposal.title;
  }

  renderTriangle(key) {
    const { sort_key, sort_direction } = this.state;
    if (sort_key != key) return <span className="inactive">&#9650;</span>;
    else {
      if (sort_direction == "asc") return <span>&#9650;</span>;
      else return <span>&#9660;</span>;
    }
  }

  clickHeader(key) {
    let { sort_key, sort_direction } = this.state;
    if (sort_key == key)
      sort_direction = sort_direction == "asc" ? "desc" : "asc";
    else {
      sort_key = key;
      sort_direction = "desc";
    }

    this.setState({ sort_key, sort_direction }, () => {
      this.reloadTable();
    });
  }

  renderHeader() {
    return (
      <div className="infinite-header">
        <div className="infinite-headerInner">
          <div className="c-col-1 c-cols">
            <label className="font-size-14">Proposal #</label>
          </div>
          <div className="c-col-2 c-cols">
            <label className="font-size-14">Title</label>
          </div>
          <div
            className="c-col-3 c-cols"
            onClick={() => this.clickHeader("final_grant.status")}
          >
            <label className="font-size-14">Status</label>
            {this.renderTriangle("final_grant.status")}
          </div>
          <div
            className="c-col-4 c-cols"
            onClick={() => this.clickHeader("final_grant.created_at")}
          >
            <label className="font-size-14">Start Date</label>
            {this.renderTriangle("final_grant.created_at")}
          </div>
          <div className="c-col-5 c-cols">
            <label className="font-size-14">Milestones Complete</label>
          </div>
          <div className="c-col-6 c-cols">
            <label className="font-size-14">Milestones Total</label>
          </div>
          <div className="c-col-7 c-cols">
            <label className="font-size-14">Action</label>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { loading, search } = this.state;
    const { authUser } = this.props;
    if (!authUser || !authUser.id) return null;

    return (
      <section
        id="app-grants-section"
        className="app-infinite-box member-grant"
      >
        <div className="app-infinite-search-wrap">
          <label>Grants</label>

          <input
            type="text"
            value={search}
            onChange={this.handleSearch}
            placeholder="Search..."
          />
        </div>

        <div className="infinite-content">
          <div className="infinite-contentInner">
            {this.renderHeader()}

            <div className="infinite-body" id="app-grants-sectionBody">
              {loading ? (
                <GlobalRelativeCanvasComponent />
              ) : (
                this.renderProposals()
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps)(withRouter(MemberGrant));
