import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import User from "../../components/user/User"

import * as Actions from '../../actions';

class UserListPage extends Component {
  componentDidMount() {
    this.props.actions.usersGet();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userPasswordReset) {
      this.props.actions.showModal("パスワードリセット", "パスワードをリセットしました。")
    }
  }

  handlePasswordReset(user) {
    this.props.actions.userPasswordReset({id: user.id, password: ''})
  }

  renderUser(user) {
    return (
      <User user={user} key={user.id} onPasswordReset={this.handlePasswordReset.bind(this)} />
    );
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        { users.map(this.renderUser.bind(this)) }
      </div>
    );
  }
}

UserListPage.propTypes = {
  users: PropTypes.array.isRequired,
  userPasswordResetResult: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    users: state.users,
    userPasswordReset: state.userPasswordReset
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListPage);
