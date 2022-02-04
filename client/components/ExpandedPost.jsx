import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import { BsBoxArrowRight } from 'react-icons/bs'
import { IconContext } from 'react-icons';

const YT_EMBED_OPTIONS = '?loop=1&autoplay=1&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0';

// destructure the state to get the title, loc, details, time
// and place them into the props object
// The Post component "subscribes to" the changes seen in the state
const mapStateToProps = ({posts:{ title, street_name, details, time, video_url }}) => ({
  title,
  street_name,
  details,
  time,
  video_url
})

// mapDispatchToProps allows us to directly invoke the action in the actions.js 
// file even though they were not created in this page
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const ExpandedPost = (props) => {
  return (
    <div className='expanded-post'>
      <IconContext.Provider value={{className: 'minimize-expanded', size:'1.5em'}}>
        <BsBoxArrowRight onClick={() => props.setExpandedPost(false)}/>
      </IconContext.Provider>
      <div id='expanded-header' className='post-header'>
        <p className='post-title'> {props.title} </p>
        <p className='post-location'> {props.street_name} </p>
        <p className='post-details'> {props.details} </p>
        <p className='post-time'> {props.time} </p>
      </div> 
      {props.video_url  && 
      <div className='post-video'>
        <iframe id="yt-vid" src={props.video_url + YT_EMBED_OPTIONS}  allow="autoplay" frameBorder="0">
        </iframe>
      </div>}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedPost);