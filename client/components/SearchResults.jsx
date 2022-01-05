import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = ({posts: { title, street_name, details, time, image_url }}) => ({
  title,
  street_name,
  details,
  time,
  image_url
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


const Searchresults = (props) => {

  return (
    <>
    <div className='Searchresults' id='searchresults'>
      <div className='search-header'>
        <p className='search-time'>Last updated at {props.time} </p>
        <p className='search-title'> {props.title} </p>
        <p className='search-location'> {props.street_name} </p>
        <p className='search-details'> {props.details} </p>
      </div> 
      {props.image_url && <div className='post-image'>
        <img id='thumbnail' src={props.image_url} alt="thumbnail-image" />
      </div>}
    </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchresults);