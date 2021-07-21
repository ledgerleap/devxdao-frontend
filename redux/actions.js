// General
export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";
export const SHOW_CANVAS = "SHOW_CANVAS";
export const HIDE_CANVAS = "HIDE_CANVAS";
export const SHOW_SIDEBAR = "SHOW_SIDEBAR";
export const HIDE_SIDEBAR = "HIDE_SIDEBAR";

// Modal
export const SET_ACTIVE_MODAL = "SET_ACTIVE_MODAL";
export const REMOVE_ACTIVE_MODAL = "REMOVE_ACTIVE_MODAL";

// Auth
export const SAVE_USER = "SAVE_USER";

// Admin Actions
export const SET_REVIEW_USER = "SET_REVIEW_USER";

// Table Actions
export const SET_ADMIN_USER_TABLE_STATUS = "SET_ADMIN_USER_TABLE_STATUS";

export const showAlert = (message, type = "warning") => ({
  type: SHOW_ALERT,
  payload: {
    showAlertMessage: message,
    showAlertType: type,
  },
});

export const hideAlert = () => ({
  type: HIDE_ALERT,
  payload: {},
});

export const showCanvas = () => ({
  type: SHOW_CANVAS,
  payload: {},
});

export const hideCanvas = () => ({
  type: HIDE_CANVAS,
  payload: {},
});

export const showSidebar = () => ({
  type: SHOW_SIDEBAR,
  payload: {},
});

export const hideSidebar = () => ({
  type: HIDE_SIDEBAR,
  payload: {},
});

export const setActiveModal = (activeModal) => ({
  type: SET_ACTIVE_MODAL,
  payload: {
    activeModal,
  },
});

export const removeActiveModal = () => ({
  type: REMOVE_ACTIVE_MODAL,
  payload: {},
});

export const saveUser = (message) => ({
  type: SAVE_USER,
  payload: {
    authUser: message,
  },
});

export const setAdminUserTableStatus = (message) => ({
  type: SET_ADMIN_USER_TABLE_STATUS,
  payload: {
    userTableStatus: message,
  },
});

export const setReviewUser = (message) => ({
  type: SET_REVIEW_USER,
  payload: {
    reviewUser: message,
  },
});
