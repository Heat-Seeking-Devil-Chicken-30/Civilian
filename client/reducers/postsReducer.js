import * as types from '../constants/actionTypes';

const initialState = {

  title: null,
  street_name: null,
  details: null,
  time: null,
  image_url: null,
  video_url: null,
  expandedPost: false
  
};

const postsReducer = (state=initialState, action) => {

  switch (action.type){
    case types.SET_EXPANDED_POST:
      return {
        ...state,
        expandedPost: action.payload
      };

    case types.CHANGE_ACTIVE_POST:

      for (let incident of action.allIncidents){

        if (incident.incident_id === action.payload){
          
          return {
            ...state,
            ...incident
          };
        }
        
      }
      return {
        ...state,
      };
      

    default:
      return state;
  }
  
}

export default postsReducer;