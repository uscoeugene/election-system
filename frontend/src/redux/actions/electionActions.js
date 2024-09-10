// redux/actions/electionActions.js
import api from '../../services/api';
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

const handleErrors = (error) => error.response?.data?.message || error.message;

// Fetch all elections
export const listElections = () => async (dispatch) => {
  try {
    dispatch({ type: ELECTION_LIST_REQUEST });
    const { data } = await api.get('/elections');
    dispatch({ type: ELECTION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ELECTION_LIST_FAIL, payload: handleErrors(error) });
  }
};

// Get election details
export const getElectionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ELECTION_DETAILS_REQUEST });
    const { data } = await api.get(`/elections/${id}`);
    dispatch({ type: ELECTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ELECTION_DETAILS_FAIL, payload: handleErrors(error) });
  }
};

// Create a new election
export const createElection = (election) => async (dispatch) => {
  try {
    dispatch({ type: ELECTION_CREATE_REQUEST });
    const { data } = await api.post('/elections', election);
    dispatch({ type: ELECTION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ELECTION_CREATE_FAIL, payload: handleErrors(error) });
  }
};

// Update an election
export const updateElection = (election) => async (dispatch) => {
  try {
    dispatch({ type: ELECTION_UPDATE_REQUEST });
    const { data } = await api.put(`/elections/${election._id}`, election);
    dispatch({ type: ELECTION_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ELECTION_UPDATE_FAIL, payload: handleErrors(error) });
  }
};

// Delete an election
export const deleteElection = (id) => async (dispatch) => {
  try {
    dispatch({ type: ELECTION_DELETE_REQUEST });
    await api.delete(`/elections/${id}`);
    dispatch({ type: ELECTION_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: ELECTION_DELETE_FAIL, payload: handleErrors(error) });
  }
};
