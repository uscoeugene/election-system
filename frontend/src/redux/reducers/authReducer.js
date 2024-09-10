import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
  } from '../constants/authConstants';
  
  const initialState = {
    loading: false,
    user: null,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
      case USER_SIGNUP_REQUEST:
        return { ...state, loading: true, error:null };
      case USER_LOGIN_SUCCESS:
        return { ...state, loading: false, user: action.payload, error:null};
      case USER_SIGNUP_SUCCESS:
        return { ...state, loading: false, user: action.payload, error:null };
      case USER_LOGIN_FAIL:
      case USER_SIGNUP_FAIL:
        return { ...state, loading: false, user:null, error: action.payload };
      case USER_LOGOUT:
        return { ...state, user: null, error:null };
      default:
        return state;
    }
  };
  
  export default authReducer;