import { LOADING_SESSION, SET_SESSION, RESET_SESSION } from "./actions";

const initialState = {
  loading: true,
  user: {},
};

const session = (state = initialState, { payload, type }) => {
  switch (type) {
    case LOADING_SESSION:
      return {
        loading: true,
        user: {},
      };
    case SET_SESSION:
      localStorage.setItem("session", JSON.stringify(payload));
      return {
        loading: false,
        user: payload,
      };
    case RESET_SESSION:
      localStorage.setItem("session", JSON.stringify(payload));
      return {
        loading: false,
        user: payload,
      };
    default:
      return state;
  }
};

export default session;
