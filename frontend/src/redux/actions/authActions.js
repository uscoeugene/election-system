import api from '../../services/api'

import { USER_LOGIN_REQUEST,  USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
    USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL,} from '../constants/authConstants';


    export const fetchUserFromToken = () => async (dispatch, getState) => {
        console.log("about to fetch tokens")
        try {
          const { auth: { token } } = getState();
      
          if (token) {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
      
            const { data } = await api.get('/users/profile');
            // const { data } = await api.get('/users/profile', config);
      
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: data,
            });
      
            localStorage.setItem('user', JSON.stringify(data));
            console.log("User Token has been feetcjed");
          }
        } catch (error) {
            console.log("could not fetch tokens again oo");
            console.log(error);
          dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
          });
          
        }
      };

// Sign Up Action
export const signup = (userData) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
  
      const { data } = await api.post('/auth/signup', userData);
  
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };


// Login Action
export const login = (credentials) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const { data } = await api.post('/auth/login', credentials);
    
      // Save token to local storage
      localStorage.setItem('token', data.token);
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      
      return data; // Return data to be used in .then()
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      
      throw error; // Rethrow error to be caught in .catch()
    }
  };
  

export const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: USER_LOGOUT });
  };