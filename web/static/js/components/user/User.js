import React, { Component, PropTypes } from 'react';

export default class User extends Component {
  handlePasswordReset(e) {
    e.preventDefault();
    this.props.onPasswordReset(this.props.user);
  }

  render() {
    const { user } = this.props;

    return (
      <div className="feed">
        <h2>
          {user.name}
        </h2>

        <div>
          {user.email}
        </div>
        <div>
          <button onClick={this.handlePasswordReset.bind(this)} className="btn btn-default">
          <span className="glyphicon glyphicon-refresh" /> Password Reset</button>
        </div>

        <hr />
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onPasswordReset: PropTypes.func.isRequired
};
