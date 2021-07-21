import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormInputComponent, HiddenFieldComponent } from "../../../components";
import {
  saveUser,
  showAlert,
  showCanvas,
  hideCanvas,
} from "../../../redux/actions";
import Helper from "../../../utils/Helper";
import { login } from "../../../utils/Thunk";

import "./login.scss";

const mapStateToProps = () => {
  return {};
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  inputEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  inputPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  login = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (!Helper.validateEmail(email)) {
      this.props.dispatch(showAlert("Input valid email address"));
      return;
    }

    if (!password) {
      this.props.dispatch(showAlert("Input password"));
      return;
    }

    this.props.dispatch(
      login(
        email,
        password,
        () => {
          this.props.dispatch(showCanvas());
        },
        (res) => {
          this.props.dispatch(hideCanvas());

          if (res.success && res.user) {
            const authUser = res.user;
            Helper.storeUser(authUser);
            this.props.dispatch(saveUser(authUser));
          }
        }
      )
    );
  };

  render() {
    const { email, password } = this.state;
    return (
      <div id="login-page">
        <div className="custom-container">
          <form action="" method="POST" onSubmit={this.login}>
            <h2 className="color-black">Sign In</h2>

            <HiddenFieldComponent type="text" />
            <HiddenFieldComponent type="password" />

            <FormInputComponent
              placeholder="Email"
              required={true}
              type="email"
              onChange={this.inputEmail}
              name="email"
              value={email}
            />

            <FormInputComponent
              placeholder="Password"
              type="password"
              required={true}
              onChange={this.inputPassword}
              name="password"
              value={password}
            />

            <button type="submit" className="btn btn-primary">
              {"Sign In"}
            </button>

            <p className="text-center color-dark">
              {"Don't have an account?"}
              <br />
              <Link className="link" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
