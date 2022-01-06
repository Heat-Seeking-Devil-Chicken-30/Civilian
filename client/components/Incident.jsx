import React from 'react';
import moment from 'moment';

const Incident = (props) => {

let today = moment();



  return (
    <div className='incident-container'>
    <img src={props.incident.image_url}/>

    <div className='incident-details-container'>
    <h4 className='incident-container-header'>{props.incident.title}</h4>
      {/* <p className='post-details'> {props.incident.details} </p> */}
      <p className='post-location'> {props.incident.street_name} </p>
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


export default Incident;
