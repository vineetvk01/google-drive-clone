import { takeLatest, put, call } from 'redux-saga/effects';

import { setUserAction, unsetUserAction, authFailedAction, setSignupErrorAction, setSignupSuccessAction } from '../actions/authActions';
import { AUTH_REQUEST, FETCH_USER, LOGOUT_REQUEST, SIGNUP_REQUEST } from '../actions/types';
import { authenticateUser, logoutUser, userAuthStatus, signupUser } from '../services/auth';


//Worker Saga
function* authRequestWorker({ type, payload = {} }) {
  if (type === AUTH_REQUEST) {
    const response = yield call(authenticateUser, payload);
    if (response.status === 'success') {
      yield put(setUserAction(response.user));
    } else {
      yield put(authFailedAction(response.error))
    }
  }else if(type === LOGOUT_REQUEST){
    yield call(logoutUser)
    yield put(unsetUserAction());
  }
}

function* fetchAuthenticatedUser({ type, payload = {} }) {
  const response = yield call(userAuthStatus, payload);
  if (response.status === 'success') {
    yield put(setUserAction(response.user));
  } else {
    yield put(unsetUserAction());
  }
}

function* signupWorker({ type, payload = {} }) {
  const response = yield call(signupUser, payload);
  if (response.user) {
    yield put(setSignupSuccessAction());
  } else {
    yield put(setSignupErrorAction(response.error))
  }
}

//Watcher Saga 
export function* watchAuthRequest() {
  yield takeLatest(AUTH_REQUEST, authRequestWorker);
  yield takeLatest(LOGOUT_REQUEST, authRequestWorker);
  yield takeLatest(FETCH_USER, fetchAuthenticatedUser);
  yield takeLatest(SIGNUP_REQUEST, signupWorker);
}
