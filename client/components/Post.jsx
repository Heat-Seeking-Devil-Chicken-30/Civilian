import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';

// we are destructuring the state to get the title, loc, details, time from
// the redux state and placing them into the props object
// The Post component "subscribes to" the changes seen in the state
const mapStateToProps = ({posts: { title, street_name, details, time, image_url }}) => ({
  title,
  street_name,
  details,
  time,
  image_url
})

// allows us to use the actions in actions.js without having to wrap them so that we can invoke those functions
// directly even though they were not created in this page
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const Post = (props) => {
  console.log('this is props : ', props);
  return (
    <>
    {props.title !== null && (<div className='post' onClick={() => props.setExpandedPost(true)}>
      <div className='post-header'>
        <p className='post-time'>Last updated at {moment(props.time).format('DD MMM YYYY h:mm: ss A')} </p>
        <h3 className='post-title' style={{fontWeight: 700}}> {props.title} </h3>
        <p className='post-location'> {props.street_name} </p>
        <p className='post-details'> {props.details} </p>
      </div> 
      {props.image_url && <div className='post-image'>
        <img id='thumbnail' src={props.image_url} alt="thumbnail-image" />
      </div>}
    </div>)
    }
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);