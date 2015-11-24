import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import * as Actions from '../actions';

import SideMenu from '../components/SideMenu.jsx'
import NaviBar from '../components/NaviBar.jsx'
import MessageModal from '../components/MessageModal'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.buildSidebar();
  }

  buildSidebar() {
    // http://bootsnipp.com/snippets/featured/fancy-sidebar-navigation
    var trigger = $('.hamburger');
    var sideMenu = this.refs.sideMenu;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {
      if (sideMenu.isClosed()) {
        sideMenu.close();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
      } else {
        sideMenu.open();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
      }
    }

    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    });
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
  }

  handleChange(nextValue) {
    this.props.pushState(null, `/${nextValue}`);
  }

  handleModalPrimaryButton() {
    this.props.actions.hideModal();
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick.bind(this)}>
        Dismiss
      </a>)
      </p>
    );
  }

  renderModal() {
    const { messageModal } = this.props;

    return (
      <div>
        <MessageModal modal={messageModal} onPrimaryButton={this.handleModalPrimaryButton.bind(this)}/>
      </div>

    );
  }

  render() {
    const { children, inputValue } = this.props;
    return (
      <div id="wrapper">
        {this.renderModal()}
        <SideMenu ref="sideMenu"/>

        <div id="page-content-wrapper">
          <button type="button" className="hamburger is-closed" data-toggle="offcanvas">
            <span className="hamb-top"></span>
            <span className="hamb-middle"></span>
            <span className="hamb-bottom"></span>
          </button>

          <div className="container">
            <NaviBar loggedIn={this.props.loggedIn} />
            {this.renderErrorMessage()}

            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  loggedIn: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  messageModal: PropTypes.object.isRequired,
  pushState: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    loggedIn: !(state.auth == ""),
    messageModal: state.messageModal,
    errorMessage: state.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushState,
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
