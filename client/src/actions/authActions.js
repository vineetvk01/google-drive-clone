import { LOGOUT_USER, AUTH_REQUEST, SET_USER, LOGOUT_REQUEST, AUTH_FAILED, SIGNUP_REQUEST, SIGNUP_ERROR, SIGNUP_SUCCESS } from './types';

export const authRequestAction = (user = { username: '', password: '' }) => ({
    type: AUTH_REQUEST,
    payload: user,
});

export const setUserAction = (user) => ({
  type: SET_USER,
  payload: { isLoggedIn:true, user},
});

export const logoutRequestAction = () => ({
  type: LOGOUT_REQUEST,
})

export const authFailedAction = (error) => ({
  type: AUTH_FAILED,
  payload: { error }
})

export const unsetUserAction = () => ({
  type: LOGOUT_USER,
})

export const signupAction = (user) => ({
  type: SIGNUP_REQUEST,
  payload: user
})

export const setSignupErrorAction = (error) => ({
  type: SIGNUP_ERROR,
  payload: { error }
})

export const setSignupSuccessAction = () => ({
  type: SIGNUP_SUCCESS,
})


