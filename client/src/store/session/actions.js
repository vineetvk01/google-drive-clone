export const LOADING_SESSION = "LOADING_SESSION";
export const FETCH_SESSION = "FETCH_SESSION";
export const SET_SESSION = "SET_SESSION";
export const RESET_SESSION = "RESET_SESSION";

export const sessionLoading = () => ({
  type: LOADING_SESSION,
  payload: { session: {} },
});

export const setSession = (session) => ({
  type: SET_SESSION,
  payload: session,
});

export const fetchSession = () => ({
  type: FETCH_SESSION,
  payload: {},
});

export const resetSession = () => ({
  type: RESET_SESSION,
  payload: {},
});
