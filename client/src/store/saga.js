import { all, fork } from "redux-saga/effects";
import sessionRequestWatcher from "./session/saga";

export default function* root() {
  yield all([fork(sessionRequestWatcher)]);
}
