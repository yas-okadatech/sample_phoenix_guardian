import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/">home</Link></li>
              <li><Link to="/user_list">User List</Link></li>
            </ul>

            {this.props.loggedIn ? (
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/sign_out">Sign out</Link></li>
              </ul>
            ) : (
              <div>
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/sign_in">Log in</Link></li>
                  <li><Link to="/sign_up">Sign up</Link></li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </nav>
    );
  }

  _onChange() {
    $(location).attr('href', "/");
  }
};


NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};
