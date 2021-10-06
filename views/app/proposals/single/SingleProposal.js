import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import {
  showCanvas,
  hideCanvas,
  startInformalAdminTools,
} from "../../../../redux/actions";
import {
  getSingleProposal,
  getTimelineProposal,
} from "../../../../utils/Thunk";
import SingleProposalDetailView from "../../shared/single-proposal-detail/SingleProposalDetail";
import ProposalChangeFormView from "../../shared/proposal-change-form/ProposalChangeForm";
import ProposalChangesView from "../../shared/proposal-changes/ProposalChanges";
import VoteAlertView from "../../shared/vote-alert/VoteAlert";
import { PageHeaderComponent } from "../../../../components";
import IconDot from "../../../../public/icons/dot.svg";
import IconEmptyDot from "../../../../public/icons/empty-dot.svg";
import IconCheckDot from "../../../../public/icons/check-dot.svg";
import "./single-proposal.scss";

const mapStateToProps = (state) => {
  return {
    authUser: state.global.authUser,
    settings: state.global.settings,
    startInformalAdmin: state.admin.startInformalAdmin,
  };
};

const findTrackingItem = (trackings, key) => {
  const item = trackings.find((x) => x.key === key);
  return {
    status: !!item,
    datetime: item
      ? moment(item.created_at).local().format("M/D/YYYY")
      : "--/--/----",
  };
};

const showWinner = (trackings, key) => {
  const item = trackings.find((x) => x.key === key);
  if (item) {
    return {
      title: item.event,
      status: !!item,
      datetime: item
        ? moment(item.created_at).local().format("M/D/YYYY")
        : "--/--/----",
    };
  }
  return null;
};

const showCompliance = (trackings, key, title) => {
  const isPassInformalVote = trackings.find(
    (x) => x.key === "informal_vote_started"
  );
  const item = trackings.find((x) => x.key === key);
  if (isPassInformalVote) {
    if (!item) {
      return null;
    } else {
      return {
        title: title,
        status: true,
        datetime: item
          ? moment(item.created_at).local().format("M/D/YYYY")
          : "--/--/----",
      };
    }
  } else {
    return {
      title: title,
      status: !!item,
      datetime: item
        ? moment(item.created_at).local().format("M/D/YYYY")
        : "--/--/----",
    };
  }
};

const generateTimelineMilestones = (proposal, trackings) => {
  const milestones = [];
  proposal?.milestones.forEach((x, index) => {
    milestones.push(
      ...[
        {
          title: `Milestone ${index + 1} submitted`,
          ...findTrackingItem(trackings, `milestone_${index + 1}_submitted`),
        },
        {
          title: `Milestone ${index + 1} approved by CRDAO`,
          ...findTrackingItem(
            trackings,
            `milestone_${index + 1}_approved_crdao`
          ),
        },
        {
          title: `Milestone ${index + 1} approved by Proj. Mngmt.`,
          ...findTrackingItem(
            trackings,
            `milestone_${index + 1}_approved_proj`
          ),
        },
        {
          title: `Milestone ${index + 1} started informal vote`,
          ...findTrackingItem(
            trackings,
            `milestone_${index + 1}_started_informal_vote`
          ),
        },
        {
          title: `Milestone ${index + 1} passed informal vote`,
          ...findTrackingItem(
            trackings,
            `milestone_${index + 1}_passed_informal_vote`
          ),
        },
        {
          title: `Milestone ${index + 1} started formal vote`,
          ...findTrackingItem(
            trackings,
            `milestone_${index + 1}_started_formal_vote`
          ),
        },
        {
          title: `Milestone ${index + 1} passed formal vote`,
          ...findTrackingItem(
            trackings,
            `milestone_${index + 1}_passed_formal_vote`
          ),
        },
      ]
    );
  });
  return milestones;
};

const generateTimeline = (proposal, trackings) => {
  const baseArr = [
    {
      title: `Proposal ${proposal.id} submitted`,
      datetime: moment(proposal.created_at).local().format("M/D/YYYY"),
    },
    {
      title: `Approved by admin`,
      ...findTrackingItem(trackings, "approved_by_admin"),
    },
    {
      title: `Entered discussion phase`,
      ...findTrackingItem(trackings, "discussion_phase"),
    },
    showWinner(trackings, "passed_survey_spot"),
    showCompliance(trackings, "kyc_checks_complete", "KYC checks complete"),
    showCompliance(
      trackings,
      "eta_compliance_complete",
      "ETA compliance complete"
    ),
    {
      title: `Informal vote started`,
      ...findTrackingItem(trackings, "informal_vote_started"),
    },
    {
      title: `Informal vote passed`,
      ...findTrackingItem(trackings, "informal_vote_passed"),
    },
    {
      title: `Entered Formal vote`,
      ...findTrackingItem(trackings, "entered_formal_vote"),
    },
    {
      title: `Passed Formal vote`,
      ...findTrackingItem(trackings, "passed_formal_vote"),
    },
    {
      title: `Grant activated by ETA`,
      ...findTrackingItem(trackings, "grant_activated"),
    },
    ...generateTimelineMilestones(proposal, trackings),
    {
      title: `Grant 100% complete`,
      ...findTrackingItem(trackings, "grant_completed"),
    },
  ];
  return baseArr.filter((x) => !!x);
};

class SingleProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposal: {},
      proposalId: 0,
      loading: false,
      showForm: false,
      isShowLogs: true,
      expandTimeline: true,
      timelineList: [],
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const proposalId = params.proposalId;
    this.setState({ proposalId }, () => {
      this.getProposal();
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.startInformalAdmin &&
      this.props.startInformalAdmin !== prevProps.startInformalAdmin
    ) {
      this.props.dispatch(startInformalAdminTools(false));
      this.getProposal();
    }
  }

  // Get Proposal
  getProposal() {
    const { proposalId } = this.state;

    this.props.dispatch(
      getSingleProposal(
        proposalId,
        () => {
          this.setState({ loading: true });
          this.props.dispatch(showCanvas());
        },
        (res) => {
          const proposal = res.proposal || {};
          proposal.milestones = proposal.milestones.map((x) => ({
            ...x,
            checked: true,
          }));
          this.props.dispatch(
            getTimelineProposal(
              proposalId,
              {},
              () => {},
              (res) => {
                if (res.success) {
                  this.setState({
                    loading: false,
                    proposalId,
                    proposal,
                    timelineList: generateTimeline(proposal, res.trackings),
                  });
                }
              }
            )
          );
          this.props.dispatch(hideCanvas());
        }
      )
    );
  }

  // Cancel Form
  cancelForm = () => {
    this.setState({ showForm: false });
  };

  // Show Form
  showForm = () => {
    this.setState({ showForm: true });
  };

  // Render Header
  renderHeader() {
    const { authUser } = this.props;
    const { proposal } = this.state;
    if (!authUser || !authUser.id || !proposal || !proposal.id) return null;

    const title = proposal.title;
    if (authUser.is_admin) {
      // Admin
      if (proposal.status == "pending") {
        if (proposal.type == "grant") {
          return (
            <PageHeaderComponent
              title={title}
              buttonData={{
                link: `/app/proposal/${proposal.id}/edit`,
                text: "Edit Proposal",
              }}
            />
          );
        } else if (proposal.type == "simple") {
          return (
            <PageHeaderComponent
              title={title}
              buttonData={{
                link: `/app/simple-proposal/${proposal.id}/edit`,
                text: "Edit Simple Proposal",
              }}
            />
          );
        }
      }
    }

    // Not Admin
    return <PageHeaderComponent title={title} />;
  }

  // Render Detail
  renderDetail() {
    const { proposal } = this.state;
    return (
      <SingleProposalDetailView
        isAutoExpand={
          proposal.status === "approved" &&
          !(proposal.votes && proposal.votes.length)
        }
        proposal={proposal}
        refreshLogs={this.handleRefreshLogs}
        allowEdit
      />
    );
  }

  handleRefreshLogs = () => {
    this.setState({
      ...this.state,
      isShowLogs: false,
    });
    setTimeout(() => {
      this.setState({
        ...this.state,
        isShowLogs: true,
      });
    }, 200);
  };

  // Render Change Content
  renderChangeContent() {
    const { showForm, proposal } = this.state;

    if (showForm) {
      return (
        <ProposalChangeFormView proposal={proposal} onClose={this.cancelForm} />
      );
    }

    return (
      this.state.isShowLogs && (
        <ProposalChangesView
          isAutoExpand={
            proposal.status === "approved" &&
            !(proposal.votes && proposal.votes.length)
          }
          proposal={proposal}
          onShow={this.showForm}
        />
      )
    );
  }

  // Render Content
  render() {
    const { authUser } = this.props;
    const { loading, proposal, expandTimeline } = this.state;

    if (!authUser || !authUser.id || loading) return null;
    if (!proposal || !proposal.id)
      return <div>{`We can't find any details`}</div>;

    // Access Check
    if (authUser.is_admin) {
      // Admin
    } else if (authUser.is_member) {
      // VA
      if (authUser.id == proposal.user_id) {
        // OP
      } else {
        // Not OP
        if (proposal.status != "approved" && proposal.status != "completed")
          return <Redirect to="/app" />;
      }
    } else {
      // Associate or Guest
      if (authUser.id == proposal.user_id) {
        // OP
      } else {
        // Not OP
        if (proposal.status != "approved" && proposal.status != "completed")
          return <Redirect to="/app" />;
        // if (proposal.votes && proposal.votes.length)
        //   return <Redirect to="/app" />;
      }
    }

    return (
      <div id="app-single-proposal-page">
        {this.renderHeader()}
        <VoteAlertView
          proposal={proposal}
          onRefresh={() => this.getProposal()}
        />
        <div className="d-flex gap-box">
          <div className="proposal-detail-box">
            {this.renderDetail()}
            {this.renderChangeContent()}
          </div>
          {proposal.type === "grant" && (
            <div
              className={classNames(
                "sidebar-timeline",
                expandTimeline ? "expand" : ""
              )}
            >
              <div className="app-simple-section">
                <div
                  className="d-flex"
                  // onClick={() =>
                  //   this.setState({ expandTimeline: !expandTimeline })
                  // }
                  style={{ cursor: "pointer" }}
                >
                  <b className="title-timeline pl-2">Proposal Timeline</b>
                </div>
                <ul className="h-100 content-timeline">
                  {this.state.timelineList.map((x, index) => (
                    <li className="timeline-item" key={index}>
                      <div className="preview d-flex align-items-center">
                        <div className="pb-3 dot">
                          {index === 0 && <IconDot />}
                          {index !== 0 && !x.status && <IconEmptyDot />}
                          {index !== 0 && x.status && <IconCheckDot />}
                          <div className="line" />
                        </div>
                        <p className="date-timeline pb-3 pl-2">{x.datetime}</p>
                      </div>
                      <div className="full d-flex">
                        <p className="date-timeline">{x.datetime}</p>
                        <div className="pb-3 dot">
                          {index === 0 && <IconDot />}
                          {index !== 0 && !x.status && <IconEmptyDot />}
                          {index !== 0 && x.status && <IconCheckDot />}
                          <div className="line" />
                        </div>
                        <p>{x.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(SingleProposal));