import React from 'react';
import { Route, IndexRoute} from 'react-router';

import App from './containers/App.jsx';

import IndexPage from './containers/IndexPage.jsx'
import DefaultPage from './containers/DefaultPage.jsx'

import SignUpPage from "./containers/auth/SignUpPage.jsx";
import SignInPage from "./containers/auth/SignInPage.jsx";
import SignOutPage from "./containers/auth/SignOutPage.jsx";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage}/>

    <Route path="sign_up" component={SignUpPage}/>
    <Route path="sign_in" component={SignInPage}/>
    <Route path="sign_out" component={SignOutPage}/>

    <Route path="*" component={DefaultPage}/>

  </Route>
)
