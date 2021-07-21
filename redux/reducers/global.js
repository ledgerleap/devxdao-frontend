import {
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_CANVAS,
  HIDE_CANVAS,
  SET_ACTIVE_MODAL,
  REMOVE_ACTIVE_MODAL,
  SAVE_USER,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
} from "../actions";

const initialState = {
  showAlert: false,
  showAlertMessage: "",
  showAlertType: "",
  showCanvas: false,
  sidebarShown: false,
  activeModal: "",
  authUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return {
        ...state,
        sidebarShown: true,
      };
    case HIDE_SIDEBAR:
      return {
        ...state,
        sidebarShown: false,
      };
    case SHOW_ALERT: {
      const { showAlertMessage, showAlertType } = action.payload;
      return {
        ...state,
        showAlert: true,
        showAlertMessage,
        showAlertType,
      };
    }
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        showAlertMessage: "",
        showAlertType: "",
      };
    case SHOW_CANVAS:
      return {
        ...state,
        showCanvas: true,
      };
    case HIDE_CANVAS:
      return {
        ...state,
        showCanvas: false,
      };
    case SAVE_USER: {
      const { authUser } = action.payload;
      return {
        ...state,
        authUser,
      };
    }
    case SET_ACTIVE_MODAL: {
      const { activeModal } = action.payload;
      return {
        ...state,
        activeModal,
      };
    }
    case REMOVE_ACTIVE_MODAL:
      return {
        ...state,
        activeModal: "",
      };
    default:
      return state;
  }
}
