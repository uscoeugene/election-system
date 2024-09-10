// redux/reducers/electionReducers.js
import {
    ELECTION_LIST_REQUEST,
    ELECTION_LIST_SUCCESS,
    ELECTION_LIST_FAIL,
    ELECTION_DETAILS_REQUEST,
    ELECTION_DETAILS_SUCCESS,
    ELECTION_DETAILS_FAIL,
    ELECTION_CREATE_REQUEST,
    ELECTION_CREATE_SUCCESS,
    ELECTION_CREATE_FAIL,
    ELECTION_UPDATE_REQUEST,
    ELECTION_UPDATE_SUCCESS,
    ELECTION_UPDATE_FAIL,
    ELECTION_DELETE_REQUEST,
    ELECTION_DELETE_SUCCESS,
    ELECTION_DELETE_FAIL,
  } from '../constants/electionConstants';
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
    elections: [],
    election: {},
  };
  
   const electionReducer = (state = initialState, action) => {
    switch (action.type) {
      case ELECTION_LIST_REQUEST:
      case ELECTION_DETAILS_REQUEST:
      case ELECTION_CREATE_REQUEST:
      case ELECTION_UPDATE_REQUEST:
      case ELECTION_DELETE_REQUEST:
        return { ...state, loading: true, error: null };
  
      case ELECTION_LIST_SUCCESS:
        return { ...state, loading: false, elections: action.payload };
  
      case ELECTION_DETAILS_SUCCESS:
        return { ...state, loading: false, election: action.payload };
  
      case ELECTION_CREATE_SUCCESS:
      case ELECTION_UPDATE_SUCCESS:
        return { ...state, loading: false, success: true, election: action.payload };
  
      case ELECTION_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          elections: state.elections.filter(election => election._id !== action.payload),
        };
  
      case ELECTION_LIST_FAIL:
      case ELECTION_DETAILS_FAIL:
      case ELECTION_CREATE_FAIL:
      case ELECTION_UPDATE_FAIL:
      case ELECTION_DELETE_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  export default electionReducer;