import * as types from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  username: '',
  photo: '',
};

const userReducer = (state=initialState, action) => {

  switch (action.type){

    case types.GET_USERNAME:
    console.log('get user payload', action.payload);
    return {
      ...state,
      isLoggedIn: true,
      username: action.payload.name,
      photo: action.payload.photo
    };

    default:
      return state;
  }

  
}


export default userReducer;