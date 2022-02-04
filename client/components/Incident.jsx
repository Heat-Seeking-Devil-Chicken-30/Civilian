import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { useDispatch, connect } from 'react-redux';
import {FlyToInterpolator} from 'react-map-gl';
import * as actions from '../actions/actions';
// 3rd-party easing functions
// import d3 from 'd3-ease';

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const Incident = (props) => {

const dispatch = useDispatch()
  
const handleClick = () => {
  
  props.setMap({
    longitude : props.pinLocation.longitude,
    latitude : props.pinLocation.latitude,
    bearing: 0,
    pitch: 1,
    zoom: 13,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  })
}  

  return (
    <div className='incident-container' onClick={handleClick}>
    <img src={props.incident.image_url}/>

    <div className='incident-details-container'>
    <h4 className='incident-container-header'>{props.incident.title}</h4>
      {/* <p className='post-details'> {props.incident.details} </p> */} 
      <p className='post-location'> {props.incident.street_name} </p>
      <p className='post-pinLocation'> {props.pinLocation.latitude} </p>
      {/* {props.incident.video_url  && 
      <div className='post-video'>
        <iframe id="yt-vid" src={props.incident.video_url + YT_EMBED_OPTIONS} frameBorder="0">
        </iframe>
      </div>} */}
    <p className='time_created_fromNow'>{moment(props.incident.time).fromNow()}</p>
    </div>
    
    <div className='time_created'>{moment(props.incident.time).format('DD MMM YYYY h:mm: ss A')}
    <button id='verified-button'>✓ VERIFIED</button>
    </div>

    </div>
  )
}

// export default Incident;
export default connect(null, mapDispatchToProps)(Incident);
