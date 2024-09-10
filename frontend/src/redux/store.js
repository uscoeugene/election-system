import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from './reducers/authReducer';
import organizationReducer from './reducers/organizationReducer';
import electionReducer from './reducers/electionReducer';

const initialState = {
  auth: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null,
    // token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  },
};

const rootReducer = combineReducers({
  auth: authReducer,
  organizationsList: organizationReducer,
  elections: electionReducer,

  // other reducers
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
