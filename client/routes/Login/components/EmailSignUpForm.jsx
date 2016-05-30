import React, { Component, PropTypes } from 'react';

class EmailSignUpForm extends Component {
  static propTypes = {
    redirectRoute: PropTypes.string,
    actions: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  handleSubmit({ firstName, lastName, email, password }) {
    const redirectRoute = this.props.redirectRoute || '/';
    this.props.actions.signUpUser(firstName, lastName, email, password, redirectRoute);
  }

  render() {
    const { fields: { firstName, lastName, email, password }, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <div>
          <label>First Name</label>
          <div>
            <input type="text" placeholder="John" {...firstName} />
            {
              firstName.touched &&
              firstName.error &&
              <span>{firstName.error}</span>
            }
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input type="text" placeholder="Doe" {...lastName} />
            {
              lastName.touched &&
              lastName.error &&
              <span>{lastName.error}</span>
            }
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <input type="email" placeholder="john@doe.com" {...email} />
            {
              email.touched &&
              email.error &&
              <span>{email.error}</span>
            }
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input type="password" placeholder="hunter2" {...password} />
            {
              password.touched &&
              password.error &&
              <span>{password.error}</span>
            }
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    );
  }
}

export default EmailSignUpForm;
