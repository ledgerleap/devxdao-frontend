import API from "./API";
import { saveUser, showAlert } from "../redux/actions";
import Helper from "./Helper";

export function login(email, password, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.login(email, password).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function register(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.register(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function getUsersByAdmin(params, start, completion) {
  return function () {
    if (start) start();
    API.getUsersByAdmin(params).then((res) => {
      if (completion) completion(res);
    });
  };
}

export function getMe(start, completion, returnOnly = false) {
  return function (dispatch) {
    if (start) start();
    API.getMe().then((res) => {
      if (!returnOnly && res.me) {
        let userData = Helper.fetchUser();
        if (userData && userData.id) {
          userData = {
            ...res.me,
            accessTokenAPI: userData.accessTokenAPI,
          };

          Helper.storeUser(userData);
          dispatch(saveUser(userData));
        }
      }
      if (completion) completion(res);
    });
  };
}

export function verifyCode(code, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.verifyCode(code).then((res) => {
      if (!res.success)
        dispatch(
          showAlert(
            "The code is incorrect. Please check the code and enter it again"
          )
        );
      if (completion) completion(res);
    });
  };
}

export function completeStepReview(start, completion) {
  return function () {
    if (start) start();
    API.completeStepReview().then((res) => {
      if (completion) completion(res);
    });
  };
}

export function completeStepKYC(start, completion) {
  return function () {
    if (start) start();
    API.completeStepKYC().then((res) => {
      if (completion) completion(res);
    });
  };
}

export function activateUser(userId, start, completion) {
  return function () {
    if (start) start();
    API.activateUser(userId).then(() => {
      if (completion) completion();
    });
  };
}

export function rejectUser(userId, start, completion) {
  return function () {
    if (start) start();
    API.rejectUser(userId).then(() => {
      if (completion) completion();
    });
  };
}
