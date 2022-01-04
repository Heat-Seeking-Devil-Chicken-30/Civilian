import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


// mapboxgl.accessToken = "pk.eyJ1IjoiY2hsb2VsdTI5IiwiYSI6ImNreHZld3N0aTZ4czIydHFoeG1lbXptOGYifQ.vZ7brhHmInbKGS3AtbdMCQ"
console.log('in Map.jsx')
//destructuring the state to get lng, lat, zoom from redux state and put them into prop obj 

const mapStateToProps = ({map: {viewport, pinLocations}}) => ({
    viewport,
    pinLocations
  })

// allows us to use the actions in actions.js without having to wrap them so that we can invoke those functions
// directly even though they were not created in this page
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const Map = (props) => {
    useEffect(() => {
        props.getCoordinates();

    }, [])

    // console.log('pinLocations are', props.pinLocations)
    return (

      <ReactMapGL
        {...props.viewport} 
        height='100%'
        width='100%'
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} 
        mapStyle='mapbox://styles/chloelu29/ckxwc6fdl24xz14phmw34jij0'
        onViewportChange={(newViewport) => {
            console.log(newViewport);
          // console.log(props.viewport)
          props.setMap(newViewport)
        }}>
          {props.pinLocations.map((el, key) => {
              console.log('el is', el)
            return (
            <Marker key={key + 1} latitude={el.latitude} longitude={el.longitude} address={el.address} id={el.id}>
            {/* button onclick post pops up */}
                <button onClick={(e) => {

                // console.log(e.target.value)
                props.changeActivePost(el.id)

                }}style={{backgroundColor: 'transparent'}}><img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCkP7QFhZEIqrhTgIxZIJKmW0zBB50L1Fc6xVI4T7U8cNaNHxEOjxu3Wl578bNT6DHmsY&usqp=CAU'} alt='pin' style={{backgroundColor: 'transparent', height: '50px', width: '50px'}}/></button>
            </Marker>
            )
          }
          )}
      </ReactMapGL>

    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);