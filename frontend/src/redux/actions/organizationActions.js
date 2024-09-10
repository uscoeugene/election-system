import api from '../../services/api';
import { 
  ORGANIZATION_CREATE_REQUEST, 
  ORGANIZATION_CREATE_SUCCESS, 
  ORGANIZATION_CREATE_FAIL,
  ORGANIZATION_GET_REQUEST, 
  ORGANIZATION_GET_SUCCESS, 
  ORGANIZATION_GET_FAIL,
  ORGANIZATION_UPDATE_REQUEST, 
  ORGANIZATION_UPDATE_SUCCESS, 
  ORGANIZATION_UPDATE_FAIL,
  ORGANIZATION_DELETE_REQUEST, 
  ORGANIZATION_DELETE_SUCCESS, 
  ORGANIZATION_DELETE_FAIL
} from '../constants/organizationConstants';

// Create an organization
export const createOrganization = (orgData) => async (dispatch) => {
  try {
    dispatch({ type: ORGANIZATION_CREATE_REQUEST });
    const { data } = await api.post('/organizations', orgData);
    dispatch({ type: ORGANIZATION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORGANIZATION_CREATE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Get all organizations
export const getOrganizations = () => async (dispatch) => {
  try {
    dispatch({ type: ORGANIZATION_GET_REQUEST });
    const { data } = await api.get('/organizations');
    dispatch({ type: ORGANIZATION_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORGANIZATION_GET_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Update an organization
export const updateOrganization = (id, orgData) => async (dispatch) => {
  try {
    dispatch({ type: ORGANIZATION_UPDATE_REQUEST });
    const { data } = await api.put(`/organizations/${id}`, orgData);
    dispatch({ type: ORGANIZATION_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORGANIZATION_UPDATE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete an organization
export const deleteOrganization = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORGANIZATION_DELETE_REQUEST });
    await api.delete(`/organizations/${id}`);
    dispatch({ type: ORGANIZATION_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: ORGANIZATION_DELETE_FAIL, payload: error.response?.data?.message || error.message });
  }
};
