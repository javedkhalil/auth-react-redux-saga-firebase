import React, { useState } from 'react';
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom';
import * as types from '../store/auth/authActionTypes';

function Account({ isAuth, __login, __signup, msgSuccess, msgError, __clearMessages }) {
  const [ form, setForm ] = useState('login');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ validationError, setValidationError ] = useState('');

  // switch form
  const changeForm = (type) => {
    if(type === 'login') {
      setForm('login');
      setEmail('');
      setPassword('');
      __clearMessages();
      setValidationError('');
    } else if (type === 'signup') {
      setForm('signup');
      setEmail('');
      setPassword('');
      __clearMessages();
      setValidationError('');
    } else {
      setForm('login');
      __clearMessages();
      setValidationError('');
    }
  }
  
  // onchange email and password
  const handleInput = (e, type) => {
    if(type === 'txtEmail') {
      setEmail(e.target.value);
    }
    if(type === 'txtPassword') {
      setPassword(e.target.value);
    }
  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    __clearMessages();
    if(email && password && email.length > 6 && password.length > 6) {
      if(form === 'login') {
        // handle login request
        // dispatch login action
        __login(email, password);
      }
      if(form === 'signup') {
        // handle signup request
        // dispatch signup action
        __signup(email, password);
      }
    } else {
      setValidationError('Use valid Email address and min 6 characters are required for each field');
    }
  }
  return (
    <div className="page-wrap">
      { isAuth ? <Redirect to="/" /> : null }
      <h4>Login or Create Account</h4>
        <form onSubmit={ handleSubmit }>
          <div className="account">
            { validationError ? <div className="error">{ validationError }</div> : null }
            { msgError ? <div className="error">{ msgError }</div> : null }
            { msgSuccess ? <div className="success">{ msgSuccess }</div> : null }
          { form === 'login' ? <h4>Login</h4> : <h4>Create Account</h4> }
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={ email } onChange={ (e) => handleInput(e, 'txtEmail') } />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={ password } onChange={ (e) => handleInput(e, 'txtPassword') } />
            </div>
            <div className="form-group">
              { form === 'login' ? <button className="btn">Login</button> : <button className="btn">Create Account</button> }
            </div>
            { form === 'login' ? (
              <div className="link" onClick={ () => changeForm('signup') }>Don't have account? Create New Account.</div>
            ) : (
              <div className="link" onClick={ () => changeForm('login') }>Already have account? Login.</div>
            ) }
          </div>
        </form>
      </div>
  )
}

const mapStateToProps = state => ({
  msgSuccess: state.getAuth.msgSuccess,
  msgError: state.getAuth.msgError
})

const mapDispatchToProps = dispatch => ({
  __login: (email, password) => dispatch({type: types.SIGNIN, email: email, password: password  }),
  __signup: (email, password) => dispatch({type: types.SIGNUP, email: email, password: password  }),
  __clearMessages: () => dispatch({ type: types.CLEAR_MESSAGES })
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);
