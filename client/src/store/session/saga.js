import { put, call, takeLatest } from "redux-saga/effects";
import { FETCH_SESSION, setSession } from "./actions";
import { fetchSession } from "./request";

export function* fetchUserSession() {
  try {
    const response = yield call(fetchSession, false);
    const { data = {}, error } = response.data;
    if (!error) {
      yield put(setSession(data));
    } else if (error) {
      yield put(setSession({ error }));
    }
  } catch (err) {
    yield put(setSession({ error: err.response.data }));
  }
}

export default function* sessionRequestWatcher() {
  yield takeLatest(FETCH_SESSION, fetchUserSession);
}
