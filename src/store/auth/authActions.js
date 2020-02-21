import axios from 'axios';
import * as types from "./authActionTypes"
import { call, put } from 'redux-saga/effects';

export const processSignUp = (email, password) => {
  return function(dispatch) {

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7BXfCDlD4XUpkzbbBcSYYhlkiJI_SiYg', authData)
      .then(response => {

        // console.log(response);
        // console.log(response.data);

        // signup success
        dispatch({
          type: types.SIGNUP,
          payload: {
            msgSuccess: 'Account created successfully... Please login',
            msgError: ''
          }
        })
        dispatch({ type: types.LOADED })

      })
      .catch(error => {
        // signup failure
        console.log("Signup Failed", error); //////// console //////
        // dispatch signup failed
        dispatch({
          type: types.ERROR,
          payload: 'Signup failed'
        })
      })
  }
}



// export const api = (url, authData) => axios.post(url, authData).then(response => response.json());

export function* processLogin(data) {
  const authData = {
    email: data.email,
    password: data.password,
    returnSecureToken: true
  }

  try {
    
    console.log(data, "/////////////////////")
    console.log(data.email, "/////////////////////")
    console.log(data.password, "/////////////////////")

    // const response = yield call(api('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7BXfCDlD4XUpkzbbBcSYYhlkiJI_SiYg', authData));

    // const response = yield call(axios.post, 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7BXfCDlD4XUpkzbbBcSYYhlkiJI_SiYg', { authData });

    const response = yield call(axios.post, 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7BXfCDlD4XUpkzbbBcSYYhlkiJI_SiYg', { 
      email: 'test@test.com',
      password: '12345678',
      returnSecureToken: true }
    );

    yield console.log(response)

    // add expiry seconds in current date time and store that too
    let expirationDateTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);

    yield put({
      type: types.SIGNIN_PROCESS,
      payload: {
        msgError: '',
        msgSuccess: 'Signin Successful',
        isAuthenticated: true,
        token: response.data.idToken,
        userID: response.data.localId,
        userEmail: response.data.email,
        expirySeconds: response.data.expiresIn,
        expiryDateTime: expirationDateTime
      }
    })
    
    yield setTimeout(() => {
      put({ type: types.LOADED })
    }, 1000)
    
    yield localStorage.setItem("isAuthenticated", true);	
    yield localStorage.setItem("token", response.data.idToken);	
    yield localStorage.setItem("expirySeconds", response.data.expiresIn);
    yield localStorage.setItem("userID", response.data.localId);
    yield localStorage.setItem("userEmail", response.data.email);
    yield localStorage.setItem("expiryDateTime", expirationDateTime);

  }
  catch(error) {
  
    yield console.log("Login Failed", error); //////// console //////
    yield put({
      type: types.ERROR,
      payload:  'Sigin failed'
    })
  
  }

  // return function(dispatch) {
  //   // get credentials from state
    
  //   axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7BXfCDlD4XUpkzbbBcSYYhlkiJI_SiYg', authData)
  //     .then(response => {

  //       // console.log(response);
  //       // console.log(response.data);

  //       // add expiry seconds in current date time and store that too
  //       let expirationDateTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);

  //       dispatch({
  //         type: types.SIGNIN,
  //         payload: {
  //           msgError: '',
  //           msgSuccess: 'Signin Successful',
  //           isAuthenticated: true,
  //           token: response.data.idToken,
  //           userID: response.data.localId,
  //           userEmail: response.data.email,
  //           expirySeconds: response.data.expiresIn,
  //           expiryDateTime: expirationDateTime
  //         }
  //       })
  //       setTimeout(() => {
  //         dispatch({ type: types.LOADED })
  //       }, 1000)
        
  //       // fill up local storage
        
  //       localStorage.setItem("isAuthenticated", true);	
  //       localStorage.setItem("token", response.data.idToken);	
  //       localStorage.setItem("expirySeconds", response.data.expiresIn);
  //       localStorage.setItem("userID", response.data.localId);
  //       localStorage.setItem("userEmail", response.data.email);
  //       localStorage.setItem("expiryDateTime", expirationDateTime);

  //     })
  //     .catch(error => {
  //       console.log("Login Failed", error); //////// console //////

  //       dispatch({
  //         type: types.ERROR,
  //         payload:  'Sigin failed'
  //       })

  //     })
  // }    
}

export const processLogOut = () => {
  
  // remove local storage
  localStorage.removeItem("isAuthenticated");	
  localStorage.removeItem("token");	
  localStorage.removeItem("expirySeconds");
  localStorage.removeItem("userID");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("expiryDateTime");

  return function(dispatch) {
    dispatch({
      type: types.LOGOUT,
      payload: {
        authenticated: false,
        token: '',
        userID: '',
        userEmail: '',
        expirySeconds: '',
        expiryDateTime: '',
        msgSuccess: 'You have been logged out successfully',
        msgError: '',
      }
    })
    setTimeout(() => {
      dispatch({ type: types.LOADED })
    }, 1000)
  }

}

export const relogin = () => {
  return function(dispatch) {
    dispatch({
      type: types.RELOGIN,
      payload: {
        isAuthenticated: true,
        token: localStorage.token,
        userID: localStorage.userID,
        userEmail: localStorage.userEmail,
        expirySeconds: localStorage.expirySeconds,
        expiryDateTime: localStorage.expiryDateTime
      }
    })
    setTimeout(() => {
      dispatch({ type: types.LOADED })
    }, 1000)
  }
}