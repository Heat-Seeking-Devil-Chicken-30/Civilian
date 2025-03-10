import React, { useState } from 'react';
import Map from './components/Map';

import { connect } from 'react-redux';
import './stylesheets/styles.css';
import logo from '../assets/danger-pin.png'
import { BsPersonCircle } from 'react-icons/bs'
import { IconContext } from 'react-icons';

import Post from './components/Post';
import { CSSTransition } from 'react-transition-group';
import ExpandedPost from './components/ExpandedPost';
import FormModal from './components/FormModal'
import IncidentModal from './components/IncidentModal'
import SearchPanel from './components/SearchPanel'


const mapStateToProps = ({posts: { expandedPost }, user: {isLoggedIn, username, photo}}) => ({
  expandedPost,
  isLoggedIn, username, photo
})

const App = (props) => {

  const [showFormModal, setShowFormModal] = useState(true);
  const [showIncidentModal, setShowIncidentModal] = useState(false);

  return (
    <div id='app'>
      {!props.isLoggedIn && <IconContext.Provider value={{className: 'login-button', size:'2em'}}>
        <BsPersonCircle onClick={() => {setShowFormModal(true)}}/>
      </IconContext.Provider>}
      {props.isLoggedIn && <div id="user-container"><img id='user-image' src={props.photo}/> <span id="welcome-text">Hello <b>{props.username.toUpperCase()}</b></span></div>}
      
      <div id="logo-wrapper">
        <span id="civ">CIV</span>
        <img id="logo" src={logo}/>
        <span id="lian">LIAN</span>
      </div>
      
      <div id="main-content">
      <SearchPanel/>
        <div id="map">
          {/* Map Component is rendered here */}
          <Map onOpenIncidentFormClick={() => {setShowIncidentModal(true)}} />
        </div>
      </div>
      <Post />
      <CSSTransition in={props.expandedPost} timeout={500} classNames="expanded-transition" unmountOnExit appear>
        <ExpandedPost key={1000}/>
      </CSSTransition>
      {showFormModal && (
        <FormModal
          onCloseButtonClick={() => {setShowFormModal(false)}}
        />
      )}
      {showIncidentModal && (
        <IncidentModal
          onCloseButtonClick={() => {setShowIncidentModal(false)}}
        />
      )}

    <div class='footer'>
    © CIVILIAN 2022
    </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(App);