import React from 'react';

import { LoginContext } from '../context/loginContext';
import Show from './show.js';


class SignUP extends React.Component {

  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      role: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.context.sigup(this.state.username, this.state.password, this.state.email, this.state.role);
  }

  render() {
    return (
      <>
        <Show condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit} >
            <input
              placeholder="userName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />

            <input
              placeholder="email"
              name="email"
              onChange={this.handleChange}
            />

            <input
              placeholder="role"
              name="role"
              onChange={this.handleChange}
            />

            <button>SignUP</button>
          </form>
        </Show>
      </>
    )
  }

}

export default SignUP;