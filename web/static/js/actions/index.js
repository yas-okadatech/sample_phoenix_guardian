import { createAction } from 'redux-actions'

import { empty } from "./empty"
import { METHOD_GET, METHOD_POST, METHOD_PUT, createApiMeta } from "./api";
import * as Error from './error'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export let resetErrorMessage = createAction(RESET_ERROR_MESSAGE);
export let createErrorMeta = Error.createErrorMeta;

// modal dialog
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export let showModal = createAction(SHOW_MODAL, (title, message) => ({title: title, message: message}));
export let hideModal = createAction(HIDE_MODAL);


// auth
export const SIGN_UP = "SIGN_UP";
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const signUp = createAction(SIGN_UP,
  undefined,
  user => createApiMeta("/api/v1/users", user, METHOD_POST));


export const logIn = createAction(LOG_IN,
  undefined,
  user => createApiMeta("/api/v1/login", user, METHOD_POST));

export const logOut = createAction(LOG_OUT);


// user
export const USERS_GET = "USERS_GET";

export const usersGet = createAction(USERS_GET,
  undefined,
  () => createApiMeta("/api/v1/users", null, METHOD_GET));

export const USER_PASSWORD_RESET = "USER_PASSWORD_RESET";

export const userPasswordReset = createAction(USER_PASSWORD_RESET,
  undefined,
  (user) => createApiMeta("/api/v1/users/" + user.id, {user: user}, METHOD_PUT));
