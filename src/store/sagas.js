import { takeLatest } from 'redux-saga/effects';
import * as types from "./auth/authActionTypes";

import { processSignUp, processLogin, clearMessages, processLogOut, relogin } from './auth/authActions';

// watcher for actions

function* sagas() {
  yield takeLatest(types.SIGNUP, processSignUp);
  yield takeLatest(types.SIGNIN, processLogin);
  yield takeLatest(types.CLEAR_MESSAGES, clearMessages);
  yield takeLatest(types.LOGOUT, processLogOut);
  yield takeLatest(types.RELOGIN, relogin);
}

export default sagas;
