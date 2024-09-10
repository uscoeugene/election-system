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
  
  const initialState = {
    organizations: [],
    loading: true,
    error: null,
    success: null,
  };
  
  export default function organizationReducer(state = initialState, action) {
    switch (action.type) {
      case ORGANIZATION_CREATE_REQUEST:
      case ORGANIZATION_GET_REQUEST:
      case ORGANIZATION_UPDATE_REQUEST:
      case ORGANIZATION_DELETE_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case ORGANIZATION_CREATE_SUCCESS:
        return {
          ...state,
          organizations: [...state.organizations, action.payload],
          loading: false,
          error: null,
          success: true,
        };
      case ORGANIZATION_GET_SUCCESS:
        return {
          ...state,
          organizations: action.payload,
          loading: false,
          error: null,
          //success: true,
        };
      case ORGANIZATION_UPDATE_SUCCESS:
        return {
          ...state,
          organizations: state.organizations.map(org =>
            org._id === action.payload._id ? action.payload : org
          ),
          loading: false,
          error: null,
          success: true,
        };
      case ORGANIZATION_DELETE_SUCCESS:
        return {
          ...state,
          organizations: state.organizations.filter(org => org._id !== action.payload),
          loading: false,
          error: null,
          success: true,
        };
      case ORGANIZATION_CREATE_FAIL:
      case ORGANIZATION_GET_FAIL:
      case ORGANIZATION_UPDATE_FAIL:
      case ORGANIZATION_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  