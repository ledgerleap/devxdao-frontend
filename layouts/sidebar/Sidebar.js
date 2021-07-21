import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Icon from "react-feather";
import Helper from "../../utils/Helper";
import { saveUser, hideSidebar } from "../../redux/actions";

import "./sidebar.scss";

const mapStateToProps = () => {
  return {};
};

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {
        link: "/dashboard",
        label: "Admin Dashboard",
        tabs: [
          {
            link: "/dashboard",
            label: "Menu Item 1",
            icon: <Icon.FileText size={16} color="#ffffff" />,
          },
          {
            link: "/dashboard",
            label: "Menu Item 2",
            icon: <Icon.CheckSquare size={16} color="#ffffff" />,
          },
          {
            link: "/dashboard",
            label: "Menu Item 3",
            icon: <Icon.Plus size={16} color="#ffffff" />,
          },
          {
            link: "/dashboard",
            label: "Settings",
            icon: <Icon.Settings size={16} color="#ffffff" />,
          },
        ],
      },
    ];
  }

  logout = (e) => {
    e.preventDefault();
    Helper.storeUser({});
    this.props.dispatch(saveUser({}));
  };

  hideSidebar = () => {
    this.props.dispatch(hideSidebar());
  };

  clickTab(e, link) {
    e.preventDefault();
    this.hideSidebar();
    const { history } = this.props;
    history.push(link);
  }

  renderTabs() {
    const { history } = this.props;

    let path = "/dashboard";
    if (history && history.location && history.location.pathname)
      path = history.location.pathname;

    const items = [];

    this.tabs.forEach((tab, index) => {
      const subItems = [];

      if (tab.tabs && tab.tabs.length) {
        tab.tabs.forEach((subTab, subIndex) => {
          subItems.push(
            <li
              key={`subTabItem_${subIndex}`}
              className={path == subTab.link ? "active" : ""}
            >
              <a onClick={(e) => this.clickTab(e, subTab.link)}>
                {subTab.icon}
                <span>{subTab.label}</span>
              </a>
            </li>
          );
        });
      }

      items.push(
        <li
          key={`tabItem_${index}`}
          className={path == tab.link ? "active" : ""}
        >
          {tab.link ? (
            <a onClick={(e) => this.clickTab(e, tab.link)}>{tab.label}</a>
          ) : (
            <a>{tab.label}</a>
          )}

          <ul>{subItems}</ul>
        </li>
      );
    });

    items.push(
      <li key="tabItem_logout">
        <a onClick={this.logout}>Sign Out</a>
      </li>
    );

    return <ul>{items}</ul>;
  }

  render() {
    return (
      <div className="dashboard-sidebar-wrap">
        <div id="dashboard-sidebar-logo">
          <a onClick={(e) => this.clickTab(e, "/dashboard")}>
            <img src="/logo-min.png" alt="" />
          </a>

          <Icon.X onClick={this.hideSidebar} />
        </div>

        <div id="dashboard-sidebar-tabs">{this.renderTabs()}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Sidebar));
