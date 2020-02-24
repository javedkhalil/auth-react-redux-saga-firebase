import * as types from "./authActionTypes";

const initialState = {
  isAuthenticated: false,
  loading: false,
  token: '',
  userID: '',
  userEmail: '',
  expirySeconds: '',
  expiryDateTime: '',
  msgSuccess: '',
  msgError: ''
};

// counterState or counterReducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_PROCESS:
      return {
        ...state,
        msgSuccess: action.payload.msgSuccess,
        msgError: action.payload.msgError
      }
    case types.SIGNIN_PROCESS:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token,
        userID: action.payload.userID,
        userEmail: action.payload.userEmail,
        expirySeconds: action.payload.expirySeconds,
        expiryDateTime: action.payload.expiryDateTime,
        msgSuccess: action.payload.msgSuccess,
        msgError: action.payload.msgError,
      }
    case types.RELOGIN_PROCESS:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token,
        userID: action.payload.userID,
        userEmail: action.payload.userEmail,
        expirySeconds: action.payload.expirySeconds,
        expiryDateTime: action.payload.expiryDateTime,
        msgSuccess: '',
        msgError: ''
      }
    case types.LOGOUT_PROCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: '',
        userID: '',
        userEmail: '',
        expirySeconds: '',
        expiryDateTime: '',
        msgSuccess: '',
        msgError: ''
      }
    case types.LOADING:
      return {
        ...state,
        loading: true
      }
    case types.LOADED:
      return {
        ...state,
        loading: false
      }
    case types.ERROR:
      return {
        ...state,
        msgError: action.payload.msgError,
        msgSuccess: ''
      }
    case types.SUCCESS:
      return {
        ...state,
        msgSuccess: action.payload.msgSuccess,
        msgError: ''
      }
    case types.FIRE_CLEAR_MESSAGES:
      return {
        ...state,
        msgSuccess: '',
        msgError: ''
      }
    default:
      return state;
  }
}

export default authReducer;
