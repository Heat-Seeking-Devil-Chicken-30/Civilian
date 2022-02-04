import * as types from '../constants/actionTypes';
import axios from 'axios';

const allIncidents = [];
axios.get(`api/incidents`)
.then(({data}) => {

    for(let incident of data){
        allIncidents.push(incident)
    }
})
.catch(console.error);

const initialState = {
  viewport: {
    latitude: 40.70617922637974,
    longitude: -74.01159717806478,
    zoom: 15.555539479916682,
    width: '100%', 
    height: '100%',
    pitch: 70.87993690488268,
    bearing: -2.814086284670796,
  },
  pinLocations: [],
  allIncidents: allIncidents
}

const mapReducer = (state = initialState, action) => {

  switch (action.type){
    case types.SET_MAP:
      const newState = Object.assign(state, action.payload)
    return {
      ...state,
      viewport: action.payload
      
    };
    case types.GET_COORDINATES: 

      const newPins = [...action.payload];
      return {
        ...state,
        pinLocations: newPins
      }
    case types.POST_EVENT:
      const newIncidents = [...state.allIncidents];
      newIncidents.push(action.payload);

      return{
        ...state,
        allIncidents : [...newIncidents]
      }
    default:
      return state;

      }
}
export default mapReducer;