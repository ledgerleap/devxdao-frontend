/* eslint-disable react/no-unknown-property */
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Head from "next/head";
import { GlobalLayout } from "../layouts";
import { Routes } from "../routes";

const mapStateToProps = (state) => {
  return {
    sidebarShown: state.global.sidebarShown,
  };
};

class App extends Component {
  render() {
    const { sidebarShown } = this.props;

    let className = "app";
    if (sidebarShown) className += " sidebar-open";

    return (
      <div className={className}>
        <Head>
          <title>DevDao</title>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-ExtraLightItalic.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-RegularItalic.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-SemiBoldItalic.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-BlackItalic.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-ThinItalic.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-SemiBold.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-MediumItalic.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-LightItalic.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-Light.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-Black.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-Thin.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-ExtraLight.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-Bold.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-Regular.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/metropolis/Metropolis-BoldItalic.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
        </Head>

        <GlobalLayout />

        <Router>
          <Switch>
            <Route path="/" component={Routes} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
