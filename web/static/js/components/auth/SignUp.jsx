import React, { Component, PropTypes } from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    var name = this.refs.name.value.trim();
    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    if (!name || !email || !password) {
      alert('empty!');
      return;
    }

    this.props.onClickSignUp({user: {name: name, email: email, password: password}});
  }

  render() {
    return (
      <div>
        <div className="col-xs-2"></div>
        <form className="col-xs-4 signUpForm" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" className="form-control" ref="name"/>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="text" placeholder="Your email" className="form-control" ref="email"/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Your password" className="form-control" ref="password"/>
          </div>

          <div className="form-group">
            <input type="submit" value="Sign up" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    );
  }
};

SignUp.propTypes = {
  onClickSignUp: PropTypes.func.isRequired
};
