/* global require */
import Helper from "./Helper";

const axios = require("axios");

const sendRequest = (
  url,
  params = {},
  method = "POST",
  requireAuth = false
) => {
  let headers = { "Content-Type": "application/json" };
  if (requireAuth) {
    const userData = Helper.fetchUser();
    const accessToken = userData.accessTokenAPI || "";

    headers = {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // eslint-disable-next-line no-undef
  let apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "api" + url;
  if (method == "GET") {
    const urlParams = [];
    for (let key in params) {
      if (key && params[key]) {
        urlParams.push(`${key}=${params[key]}`);
      }
    }
    if (urlParams.length) {
      apiUrl += `?${urlParams.join("&")}`;
    }
  }

  return new Promise((resolve) => {
    axios({
      method,
      headers,
      data: JSON.stringify(params),
      url: apiUrl,
    })
      .then((res) => {
        if (res.data) {
          let data = res.data;

          if (!data.success && !data.message) {
            data = {
              ...data,
              message: "Please try again later",
            };
          }

          resolve(data);
        } else {
          resolve({
            success: false,
            message: "Please try again later",
          });
        }
      })
      .catch(() => {
        // Needs to login again
        Helper.removeUser();

        resolve({
          success: false,
          message: "Please try again later",
        });
      });
  });
};

class API {
  static login(email, password) {
    const params = {
      email,
      password,
    };
    return sendRequest("/login", params, "POST");
  }

  static register(params) {
    return sendRequest("/register", params, "POST");
  }

  static getMe() {
    return sendRequest("/me", {}, "GET", true);
  }

  static verifyCode(code) {
    const params = { code };
    return sendRequest("/verify-code", params, "POST", true);
  }

  static completeStepReview() {
    return sendRequest("/complete-step-review", {}, "POST", true);
  }

  static completeStepKYC() {
    return sendRequest("/complete-step-kyc", {}, "POST", true);
  }

  static activateUser(userId) {
    return sendRequest(`/admin/user/${userId}/activate`, {}, "PUT", true);
  }

  static rejectUser(userId) {
    return sendRequest(`/admin/user/${userId}/reject`, {}, "PUT", true);
  }

  static getUsersByAdmin(params = {}) {
    return sendRequest("/admin/users", params, "GET", true);
  }
}

export default API;
