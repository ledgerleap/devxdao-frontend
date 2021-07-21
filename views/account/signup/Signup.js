/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import {
  BackButtonComponent,
  FormInputComponent,
  FormSelectComponent,
  HiddenFieldComponent,
} from "../../../components";
import { COUNTRYLIST } from "../../../utils/Constant";
import Helper from "../../../utils/Helper";
import {
  saveUser,
  showAlert,
  showCanvas,
  hideCanvas,
} from "../../../redux/actions";
import { register } from "../../../utils/Thunk";

import "./signup.scss";

const moment = require("moment");

const mapStateToProps = () => {
  return {};
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      company: "",
      dob: "",
      country_citizenship: "",
      address: "",
      city: "",
      zip: "",
      country_residence: "",
      email: "",
      email_confirm: "",
      password: "",
      password_confirm: "",
    };

    this.minDate = moment().set("year", 1900).set("month", 0).set("date", 1);
    this.maxDate = moment();
  }

  inputFormField(e, key) {
    let value = "";
    if (e && e.target && e.target.value) value = e.target.value;

    this.setState({ [key]: value });
  }

  setDOB = (dob) => {
    this.setState({ dob });
  };

  save = (e) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      company,
      dob,
      country_citizenship,
      address,
      city,
      zip,
      country_residence,
      email,
      email_confirm,
      password,
      password_confirm,
    } = this.state;

    if (!first_name.trim()) {
      this.props.dispatch(showAlert("Input first name"));
      return;
    }

    if (!last_name.trim()) {
      this.props.dispatch(showAlert("Input last name"));
      return;
    }

    if (!dob) {
      this.props.dispatch(showAlert("Input date of birth"));
      return;
    }

    if (!country_citizenship.trim()) {
      this.props.dispatch(showAlert("Input country of citizenship"));
      return;
    }

    if (!address.trim()) {
      this.props.dispatch(showAlert("Input address"));
      return;
    }

    if (!city.trim()) {
      this.props.dispatch(showAlert("Input town / city"));
      return;
    }

    if (!zip.trim()) {
      this.props.dispatch(showAlert("Input postal code"));
      return;
    }

    if (!country_residence.trim()) {
      this.props.dispatch(showAlert("Input country of residence"));
      return;
    }

    if (!email.trim() || !email_confirm.trim()) {
      this.props.dispatch(showAlert("Input email address"));
      return;
    }

    if (!password || !password_confirm) {
      this.props.dispatch(showAlert("Input password"));
      return;
    }

    if (email.trim() != email_confirm.trim()) {
      this.props.dispatch(showAlert("Email doesn't match"));
      return;
    }

    if (password != password_confirm) {
      this.props.dispatch(showAlert("Password doesn't match"));
      return;
    }

    if (!Helper.validateEmail(email.trim())) {
      this.props.dispatch(showAlert("Input valid email address"));
      return;
    }

    if (!Helper.checkPassword(password)) {
      this.props.dispatch(
        showAlert(
          "Please use a password with at least 8 characters including at least one number, one letter and one symbol"
        )
      );
      return;
    }

    const params = {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      company: company.trim(),
      email: email.trim(),
      password,
      dob: moment(dob).format("YYYY-MM-DD"),
      country_citizenship: country_citizenship.trim(),
      country_residence: country_residence.trim(),
      address: address.trim(),
      city: city.trim(),
      zip: zip.trim(),
    };

    this.props.dispatch(
      register(
        params,
        () => {
          this.props.dispatch(showCanvas());
        },
        (res) => {
          this.props.dispatch(hideCanvas());
          if (res.success && res.user) {
            Helper.storeUser(res.user);
            this.props.dispatch(saveUser(res.user));
          }
        }
      )
    );
  };

  render() {
    const {
      first_name,
      last_name,
      company,
      dob,
      country_citizenship,
      address,
      city,
      zip,
      country_residence,
      email,
      email_confirm,
      password,
      password_confirm,
    } = this.state;

    return (
      <div id="signup-page">
        <div className="custom-container">
          <form action="" method="POST" onSubmit={this.save}>
            <div id="back-btn-wrap">
              <BackButtonComponent link="/register" />
            </div>

            <h1>New User</h1>
            <h5>Fill out the form to register</h5>

            <HiddenFieldComponent type="text" />
            <HiddenFieldComponent type="password" />

            <div className="row">
              <div className="col-md-4">
                <FormInputComponent
                  placeholder="First Name *"
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={(e) => this.inputFormField(e, "first_name")}
                  underlined
                  required
                />
              </div>
              <div className="col-md-4">
                <FormInputComponent
                  placeholder="Last Name *"
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={(e) => this.inputFormField(e, "last_name")}
                  underlined
                  required
                />
              </div>
              <div className="col-md-4">
                <FormInputComponent
                  placeholder="Company/Organization"
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => this.inputFormField(e, "company")}
                  underlined
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="custom-form-control underlined dob-picker-wrap">
                  <label>DOB:</label>
                  <DatePicker
                    className="dob-picker"
                    value={dob}
                    onChange={this.setDOB}
                    onCalendarClose={() => {}}
                    calendarIcon={""}
                    clearIcon={""}
                    minDate={this.minDate.toDate()}
                    maxDate={this.maxDate.toDate()}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <FormSelectComponent
                  name="country_citizenship"
                  onChange={(e) =>
                    this.inputFormField(e, "country_citizenship")
                  }
                  value={country_citizenship}
                  required={true}
                  placeholder="Country of Citizenship *"
                  options={COUNTRYLIST}
                  underlined
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <FormInputComponent
                  placeholder="Address *"
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => this.inputFormField(e, "address")}
                  underlined
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <FormInputComponent
                  placeholder="Town / City *"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => this.inputFormField(e, "city")}
                  underlined
                  required
                />
              </div>
              <div className="col-md-4">
                <FormInputComponent
                  placeholder="Postal Code *"
                  type="text"
                  name="zip"
                  value={zip}
                  onChange={(e) => this.inputFormField(e, "zip")}
                  underlined
                  required
                />
              </div>
              <div className="col-md-4">
                <FormSelectComponent
                  name="country_residence"
                  onChange={(e) => this.inputFormField(e, "country_residence")}
                  value={country_residence}
                  required={true}
                  placeholder="Country of Residence *"
                  options={COUNTRYLIST}
                  underlined
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <FormInputComponent
                  placeholder="Email *"
                  type="email"
                  value={email}
                  onChange={(e) => this.inputFormField(e, "email")}
                  underlined
                  required
                />
              </div>
              <div className="col-md-4">
                <FormInputComponent
                  placeholder="Confirm Email *"
                  type="email"
                  value={email_confirm}
                  onChange={(e) => this.inputFormField(e, "email_confirm")}
                  underlined
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <FormInputComponent
                  placeholder="Password *"
                  type="password"
                  value={password}
                  onChange={(e) => this.inputFormField(e, "password")}
                  underlined
                  required
                />
              </div>
              <div className="col-md-4">
                <FormInputComponent
                  placeholder="Confirm Password *"
                  type="password"
                  value={password_confirm}
                  onChange={(e) => this.inputFormField(e, "password_confirm")}
                  underlined
                  required
                />
              </div>
            </div>

            <div id="btn-wrap">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Signup);
