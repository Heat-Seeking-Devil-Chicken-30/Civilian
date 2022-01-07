import React from "react";
import { connect } from 'react-redux';
import { getUsername, signUp } from '../actions/actions';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons';
import logo from '../../assets/danger-pin.png'

const mapDispatchToProps = dispatch => ({
  // create functions that will dispatch action creators
  login: (e) => {
    e.preventDefault();
    console.log(e.target.form[0].value, e.target.form[1].value);
    dispatch(getUsername(e.target.form[0].value, e.target.form[1].value));
  },
  signup: (e) => {
    e.preventDefault();
    console.log(e.target.form[0].value, e.target.form[1].value);
    dispatch(signUp(e.target.form[0].value, e.target.form[1].value));
  },
});

const FormModal = (props) => {
  return (
    <div id="modal-overlay">
      <form className='form-modal'>
        {/* <IconContext.Provider value={{className: 'exit-modal', size:'1.5em'}}>
          <AiOutlineCloseCircle onClick={(e) => props.onCloseButtonClick()}/>
        </IconContext.Provider> */}
        <div id="modal-logo-wrapper">
          <img id="logo" src={logo}/>
        </div>
        <div>
          <label htmlFor="username">USERNAME</label>
          <input className="form-input" type="text" name="username" placeholder="Enter your username"/>
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input className="form-input" type="password" name="password" placeholder="Enter your password"/>
        </div>
        <div id='button-container'>
          <button id="signup-button" className="form-button" onClick={(e) => {props.signup(e);props.onCloseButtonClick();}}>Sign Up</button>
          <button id="login-button" className="form-button" onClick={(e) => {props.login(e);props.onCloseButtonClick();}}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(FormModal);