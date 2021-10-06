/* eslint-disable no-undef */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { showAlert, showCanvas, hideCanvas } from "../../../redux/actions";
import * as Icon from "react-feather";
import {
  SHUFTI_API_URL,
  SHUFTI_CONST,
  SHUFTI_MODE,
} from "../../../utils/Constant";
import {
  getMe,
  saveShuftiproTemp,
  updateShuftiproTemp,
} from "../../../utils/Thunk";

import "./shuftipro.scss";

const sha256 = require("js-sha256").sha256;
const axios = require("axios");

const mapStateToProps = (state) => {
  return {
    authUser: state.global.authUser,
  };
};

class Shuftipro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      finalKYC: false,
    };
    this.referenceId = null;
  }

  componentDidMount() {
    this.init();
  }

  hideModal() {
    const { onCancel } = this.props;
    if (onCancel) onCancel();
  }

  init() {
    const { authUser } = this.props;
    if (!authUser || !authUser.id || !authUser.profile || !authUser.profile.id)
      return;

    this.referenceId = `SP_REQUEST_${authUser.id}_${Math.random()}`;

    let payload = {
      reference: this.referenceId,
      email: authUser.email,
      country: "",
      verification_mode: "image_only",
      allow_offline: 1,
      allow_online: 0,
      show_privacy_policy: 1,
      show_results: 0,
      show_feedback_form: 0,
      show_consent: 1,
      decline_on_single_step: 0,
      allow_retry: 1,
    };

    payload["document"] = {
      name: {
        first_name: authUser.first_name || "",
        last_name: authUser.last_name || "",
        fuzzy_match: 1,
      },
      dob: authUser.profile.dob || "",
      fetch_enhanced_data: "1",
      supported_types: ["id_card", "passport", "driving_license"],
    };

    payload["address"] = {
      name: {
        first_name: authUser.first_name || "",
        last_name: authUser.last_name || "",
        fuzzy_match: 1,
      },
      full_address: `${authUser.profile.address}, ${authUser.profile.city}`,
      address_fuzzy_match: "1",
      supported_types: ["utility_bill", "bank_statement"],
      verification_instructions: {
        allow_paper_based: "1",
        allow_photocopy: "1",
        allow_laminated: "1",
      },
    };

    payload["background_checks"] = {
      name: {
        first_name: authUser.first_name || "",
        last_name: authUser.last_name || "",
      },
      dob: authUser.profile.dob || "",
    };

    const clientId = SHUFTI_CONST[SHUFTI_MODE].clientId;
    const clientSecret = SHUFTI_CONST[SHUFTI_MODE].clientSecret;
    const token = btoa(clientId + ":" + clientSecret); // BASIC AUTH TOKEN

    this.props.dispatch(showCanvas());
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
      data: JSON.stringify(payload),
      url: SHUFTI_API_URL,
    })
      .then((response) => {
        let responsesignature = response.headers.signature;
        let data = response.data;

        this.props.dispatch(hideCanvas());

        if (this.validatesignature(data, responsesignature, clientSecret)) {
          // Valid
          this.setState({
            ...this.state,
            url: data.verification_url,
          });
          this.props.dispatch(
            saveShuftiproTemp(
              {
                reference_id: this.referenceId,
                user_id: authUser.id,
              },
              () => {},
              () => {}
            )
          );
        } else {
          // Invalid
          this.props.dispatch(
            showAlert("We can't start Shufti Pro. Please try again later!")
          );
          this.hideModal();
        }
      })
      .catch(() => {
        // Invalid
        this.props.dispatch(hideCanvas());
        this.props.dispatch(
          showAlert("We can't start Shufti Pro. Please try again later!")
        );
        this.hideModal();
      });
  }

  validatesignature(data, signature, SK) {
    data = JSON.stringify(data);
    data = data.replace(/\//g, "\\/");
    data = `${data}${SK}`;

    sha256(data);
    let hash = sha256.create();
    hash.update(data);

    if (hash.hex() == signature) return true;
    else return false;
  }

  clickContinue = (e) => {
    e.preventDefault();
    const { authUser } = this.props;

    if (!this.referenceId) {
      this.hideModal();
      return;
    }

    const clientId = SHUFTI_CONST[SHUFTI_MODE].clientId;
    const clientSecret = SHUFTI_CONST[SHUFTI_MODE].clientSecret;
    const token = btoa(clientId + ":" + clientSecret); // BASIC AUTH TOKEN

    this.props.dispatch(showCanvas());
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
      data: JSON.stringify({
        reference: this.referenceId,
      }),
      url: SHUFTI_API_URL + "/status",
    })
      .then((response) => {
        let isValid = false;
        if (response && response.data) {
          const { data } = response;

          const { event, proofs } = data;

          if (event && proofs && proofs.address && proofs.document)
            isValid = true;
        }

        if (isValid) {
          this.props.dispatch(
            updateShuftiproTemp(
              {
                reference_id: this.referenceId,
                user_id: authUser.id,
              },
              () => {},
              (res) => {
                if (res.success) {
                  this.props.dispatch(
                    showAlert(
                      "Please wait for a few minutes. We're verifying your documents.",
                      "success"
                    )
                  );
                  this.props.dispatch(
                    getMe(
                      () => {},
                      () => {}
                    )
                  );
                }
                this.props.dispatch(hideCanvas());
                this.hideModal();
              }
            )
          );
        } else {
          // Invalid
          this.props.dispatch(hideCanvas());
          this.hideModal();
        }
      })
      .catch(() => {
        // Invalid
        this.props.dispatch(hideCanvas());
        this.hideModal();
      });
  };

  toggleFinalKYC = () => {
    this.setState({
      ...this.state,
      finalKYC: !this.state.finalKYC,
    });
  };

  render() {
    const { authUser } = this.props;
    if (!authUser || !authUser.id) return null;

    const { url, finalKYC } = this.state;

    return (
      <div id="shuftipro-wrap">
        {url ? (
          <>
            <div className="shuftipro-iframe-wrap">
              <iframe src={url} id="shuftipro-iframe" frameBorder="0"></iframe>
            </div>
            <div>
              <div className="text-center c-checkbox-itemSymbol">
                {finalKYC ? (
                  <Icon.CheckSquare
                    color="#9B64E6"
                    onClick={() => this.toggleFinalKYC()}
                  />
                ) : (
                  <Icon.Square
                    color="#9B64E6"
                    onClick={() => this.toggleFinalKYC()}
                  />
                )}
                <label
                  className="pl-2 font-size-14"
                  onClick={() => this.toggleFinalKYC()}
                >
                  I have reached the final step of the above KYC process
                </label>
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                disabled={!finalKYC}
                className="btn btn-primary"
                onClick={this.clickContinue}
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <div className="shuftipro-loading text-center">
            <label>Shuftipro Loading...</label>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Shuftipro);
