import merge from 'lodash/object/merge';
import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import { handleActions } from 'redux-actions'

import * as ActionTypes from '../actions';

function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  }

  if (error) {
    return error;
  }

  return state;
}


const messageModalInitial = {
  visibility: "hide"
};

const messageModal = handleActions({
  SHOW_MODAL: (state, action) => ({
    visibility: "show",
    title: action.payload.title,
    message: action.payload.message
  }),

  HIDE_MODAL: (state, action) => ({
    visibility: "hide"
  })

}, messageModalInitial);

let auth = handleActions({
  SIGN_UP: (state, action) => (
    action.payload.token ? action.payload.token : state
  ),

  LOG_IN: (state, action) => (
    action.payload.token ? action.payload.token : state
  ),

  LOG_OUT: (state, action) => (
    ""
  )
}, "");

let users = handleActions({
  USERS_GET: (state, action) => (
    action.payload ? action.payload : state
  )
},  []);

let userPasswordReset = handleActions({
  USER_PASSWORD_RESET: (state, action) => (
    !!action.payload
  ),

  SHOW_MODAL: (state, action) => (
    null
  )
}, null);

const rootReducer = combineReducers({
  auth,
  users,
  userPasswordReset,
  messageModal,
  errorMessage,
  router
});

export default rootReducer;
