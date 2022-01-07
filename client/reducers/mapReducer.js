import * as types from '../constants/actionTypes';
import axios from 'axios';
import { defaultMaxListeners } from 'events';


const allIncidents = [];
axios.get(`api/incidents`)
.then(({data}) => {
    console.log('data', data);
    for(let incident of data){
        allIncidents.push(incident)
    }
})
.catch(console.error);
console.log('allIncidents', allIncidents)


const initialState = {
  viewport: {
    latitude: 40.70617922637974,
    longitude: -74.01159717806478,
    zoom: 15.555539479916682,
    width: '100%', // TODO: remove height and width 
    height: '100%',
    pitch: 70.87993690488268,
    bearing: -2.814086284670796,
  },
  pinLocations: [],
  allIncidents: allIncidents
}

/* 
// * 		width(pin):1598.546875
// * 		height(pin):903.625
// * 		latitude(pin):40.70617922637974
// * 		longitude(pin):-74.01159717806478
// * 		zoom(pin):15.555539479916682
// * 		bearing(pin):-2.814086284670796
// * 		pitch(pin):70.87993690488268
// * 		altitude(pin):1.5
// * 		maxZoom(pin):24
// * 		minZoom(pin):0
// * 		maxPitch(pin):85
// * 		minPitch(pin):0
// * 		transitionDuration(pin):300
// * 		transitionInterpolator(pin):{…}
// * 		
// * 		transitionInterruption(pin):1

*/


const mapReducer = (state = initialState, action) => {
    // console.log(state)
  switch (action.type){
    case types.SET_MAP:
      const newState = Object.assign(state, action.payload)
    return {
      ...state,
      viewport: action.payload
      
    };
    case types.GET_COORDINATES: 
      console.log('in get coords mapreducer')
      const newPins = [...action.payload];
      return {
        ...state,
        pinLocations: newPins
      }
    case types.POST_EVENT:
      const newIncidents = [...state.allIncidents];//.push(action.payload);
      newIncidents.push(action.payload);
      // const newPins = [...state.pinLocations];
      // newPins.push(action.payload)
      return{
        ...state,
        allIncidents : [...newIncidents]
      }
    default:
      return state;

      }
}
export default mapReducer;