import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactMapGL, { FullscreenControl, NavigationControl, Marker } from 'react-map-gl';
import * as actions from '../actions/actions';
import CustomMapController from './CustomMapController';
import logo from '../../assets/danger-pin.png'

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

  const navControlStyle= {
    right: 10,
    top: 10,
  };
  const fullscreenControlStyle = {
    right: 10, 
    top: 70
  }
  
  return (
    
    <ReactMapGL
      {...props.viewport} 
      height='100%'
      width='100%' 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} 
      showCompass={false} // removes compass from navigationControl
      mapStyle='mapbox://styles/rainlewis/cky3cjldx94pc14pefok2ej35'
      doubleClickZoom={false}
      attributionControl={false}

      // on dbl click => get coordinates, open incident modal, create a pin and send off to reducer 
      onDblClick={({ lngLat }) => {console.log(lngLat);props.saveUserCoords(lngLat);props.onOpenIncidentFormClick()}}
      // onViewportChange={handleViewportChange}
      onViewportChange={(newViewport) => {props.setMap(newViewport)}
    }>

        {props.pinLocations.map((el, key) => {
          return (
            
          <Marker key={key + 1} latitude={el.latitude} longitude={el.longitude} address={el.address} id={el.id}>

            <button className='map-pin' onClick={(e) => {props.changeActivePost(el.id)}} style={{backgroundColor: 'transparent', border: 'none'}}>
              <img src={logo} alt='pin' className='incident-pin' style={{backgroundColor: 'transparent', height: '50px', width: 'auto'}}/>
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