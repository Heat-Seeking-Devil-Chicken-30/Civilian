import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import ReactMapGL, {FullscreenControl, NavigationControl, FlyToInterpolator, Marker} from 'react-map-gl';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import CustomMapController from './CustomMapController';
import logo from '../../assets/danger-pin.png'
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

console.log('in Map.jsx')
//destructuring the state to get lng, lat, zoom from redux state and put them into prop obj 

const mapStateToProps = ({map: {viewport, pinLocations, allIncidents}}) => ({
  viewport,
  pinLocations,
  allIncidents
})

// allows us to use the actions in actions.js without having to wrap them so that we can invoke those functions
// directly even though they were not created in this page
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapController = new CustomMapController();

const Map = (props) => {
  useEffect(() => {
    props.getCoordinates();
  }, [])

  useEffect(() => {
    props.getCoordinates();
  }, [props.allIncidents])

  // useEffect(() => {
  //   props.getCoordinates();
  // }, [props.pinLocations])
  //console.log(props.pinLocations)

  const navControlStyle= {
    right: 10,
    top: 10,
  };
  const fullscreenControlStyle = {
    right: 10, 
    bottom: 10
  }

  // const handleGeocoderViewportChange = useCallback(
  //   (newViewport) => {
  //     const geocoderDefaultOverrides = { transitionDuration: 1000 };

  //     return handleViewportChange({
  //       ...newViewport,
  //       ...geocoderDefaultOverrides
  //     });
  //   },
  //   [handleViewportChange]
  // );

  
  return (
    
    <ReactMapGL
      {...props.viewport} 
      height='100%'
      width='100%' 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} 
      showCompass={false} // removes compass from navigationControl
      mapStyle='mapbox://styles/rainlewis/cky0soy9upy3p17peegj7lacj'
      doubleClickZoom={false}
      attributionControl={false}

      // implementing FlyToInterpolator 
      // transitionDuration={1000}
      // transitionInterpolator={new FlyToInterpolator()} 

      // on dbl click => get coordinates, open incident modal, create a pin and send off to reducer 
      onDblClick={({ lngLat }) => {console.log(lngLat);props.saveUserCoords(lngLat);props.onOpenIncidentFormClick()}}
      // onViewportChange={handleViewportChange}
      onViewportChange={(newViewport) => {props.setMap(newViewport)}
    }>
     {/* <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} 
          position="top-left"
        /> */}

        {props.pinLocations.map((el, key) => {
          return (
            
          <Marker key={key + 1} latitude={el.latitude} longitude={el.longitude} address={el.address} id={el.id}>

            <button className='map-pin' onClick={(e) => {props.changeActivePost(el.id)}} style={{backgroundColor: 'transparent', border: 'none'}}>
              <img src={logo} alt='pin' className='incident-pin' style={{backgroundColor: 'transparent', height: '20px', width: 'auto'}}/>
            </button>
          </Marker>
          )
        })}

      <NavigationControl style={navControlStyle} showCompass={false} />
      <FullscreenControl style={fullscreenControlStyle} />
    </ReactMapGL>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);