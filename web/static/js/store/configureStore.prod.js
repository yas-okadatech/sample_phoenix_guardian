import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import routes from '../routes.jsx';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import {api} from '../middleware/api'

const finalCreateStore = compose(
  applyMiddleware(thunk, api),
  reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
