import { SET_REVIEW_USER, SET_ADMIN_USER_TABLE_STATUS } from "../actions";

const initialState = {
  reviewUser: {},
  userTableStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN_USER_TABLE_STATUS: {
      const { userTableStatus } = action.payload;
      return {
        ...state,
        userTableStatus,
      };
    }
    case SET_REVIEW_USER: {
      const { reviewUser } = action.payload;
      return {
        ...state,
        reviewUser,
      };
    }
    default:
      return state;
  }
}
