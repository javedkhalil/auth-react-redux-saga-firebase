import axios from 'axios';
import * as types from "./authActionTypes"
import { call, put } from 'redux-saga/effects';

export function* processSignUp(data) {
  yield put({ type: types.LOADING })
  try {
    yield call(axios.post, 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7BXfCDlD4XUpkzbbBcSYYhlkiJI_SiYg', { email: data.email, password: data.password, returnSecureToken: true }
    );
    // const response = yield call(axios.post, 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7BXfCDlD4XUpkzbbBcSYYhlkiJI_SiYg', { email: data.email, password: data.password, returnSecureToken: true }
    // );    
    // console.log(response.data);
    // signup success
    yield put({
      type: types.SIGNUP_PROCESS,
      payload: {
        msgSuccess: 'Account created successfully... Please login',
        msgError: ''
      }
    })
    // fire loaded
  } catch(error) {
      // Signup failure
      console.log("Signup Failed", error); //////// console //////
      yield put({
        type: types.ERROR,
        payload: {
          msgSuccess: '',
          msgError: 'Signup failed. Please try again!'
        }
      })
    }
  yield put({ type: types.LOADED })
}



export function* processLogin(data) {
  yield put({ type: types.LOADING })
  // this 'authData' is not acceptable below in call for some reason //////
  // const authData = {
  //   email: data.email,
  //   password: data.password,
  //   returnSecureToken: true
  // }
  try {
    // that (data) above has got two parameters in it /// Daemmm !!!
    // console.log(data, "/////////////////////")
    // console.log(data.email, "/////////////////////")
    // console.log(data.password, "/////////////////////")
    const response = yield call(axios.post, 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7BXfCDlD4XUpkzbbBcSYYhlkiJI_SiYg', { email: data.email, password: data.password, returnSecureToken: true }
    );
    // console.log(response)
    // add expiry seconds in current date time and store that too
    let expirationDateTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    // fire another action
    yield put({
      type: types.SIGNIN_PROCESS,
      payload: {
        msgError: '',
        msgSuccess: 'Signin successful...',
        isAuthenticated: true,
        token: response.data.idToken,
        userID: response.data.localId,
        userEmail: response.data.email,
        expirySeconds: response.data.expiresIn,
        expiryDateTime: expirationDateTime
      }
    })
    // fill up local storage
    localStorage.setItem("isAuthenticated", true);	
    localStorage.setItem("token", response.data.idToken);	
    localStorage.setItem("expirySeconds", response.data.expiresIn);
    localStorage.setItem("userID", response.data.localId);
    localStorage.setItem("userEmail", response.data.email);
    localStorage.setItem("expiryDateTime", expirationDateTime);
  }
  catch(error) {
    // console.log("Login failed", error); //////// console //////
    yield put({
      type: types.ERROR,
      payload: {
        msgSuccess: '',
        msgError: 'Login failed. Please try again!'
      }
    })
  }
  yield put({ type: types.LOADED })
}

////////////////////////////////////////////////////////////////////////////////
export function* clearMessages() {
  try {
    yield put({
      type: types.FIRE_CLEAR_MESSAGES,
      payload: {
        msgSuccess: '',
        msgError: ''
      }
    })
  } catch(error) {
    // console.log(error)
  }
}

////////////////////////////////////////////////////////////////////////////////
export function* processLogOut() {
  yield put({ type: types.LOADING });
  try {
    yield put({
      type: types.LOGOUT_PROCESS
    })
    // remove local storage
    localStorage.removeItem("isAuthenticated");	
    localStorage.removeItem("token");	
    localStorage.removeItem("expirySeconds");
    localStorage.removeItem("userID");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("expiryDateTime");
  } catch(error) {
    // console.log(error)
  }
  yield put({ type: types.LOADED })
}

///////////////////////////////////////////////////////////////////////////////
export function* relogin() {
  yield put({ type: types.LOADING });
  try {
    yield put({
      type: types.RELOGIN_PROCESS,
      payload: {
        isAuthenticated: true,
        token: localStorage.token,
        userID: localStorage.userID,
        userEmail: localStorage.userEmail,
        expirySeconds: localStorage.expirySeconds,
        expiryDateTime: localStorage.expiryDateTime
      }
    })
  } catch(error) {
    // console.log(error)
  }
  yield put({ type: types.LOADED })
}
