import * as types from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  username: '',
  photo: '',
  lngLat: []
};

const userReducer = (state=initialState, action) => {

  switch (action.type){

    case types.GET_USERNAME:

    return {
      ...state,
      isLoggedIn: true,
      username: action.payload.name,
      photo: action.payload.photo
    };

    case types.SAVE_USER_COORDS:

    return {
      ...state,
      lngLat : [...action.payload]
    };

    default:
      return state;
  }

}

export default userReducer;