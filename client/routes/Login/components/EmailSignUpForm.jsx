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
      <form className="EmailSignUpForm" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <div className="EmailSignUpForm__input-group">
          <label>First Name</label>
          <div className="EmailSignUpForm__input-wrapper">
            <input type="text" placeholder="John" {...firstName} />
            {
              firstName.touched &&
              firstName.error &&
              <span className="EmailSignUpForm__input-wrapper__error">{firstName.error}</span>
            }
          </div>
        </div>
        <div className="EmailSignUpForm__input-group">
          <label>Last Name</label>
          <div className="EmailSignUpForm__input-wrapper">
            <input type="text" placeholder="Doe" {...lastName} />
            {
              lastName.touched &&
              lastName.error &&
              <span className="EmailSignUpForm__input-wrapper__error">{lastName.error}</span>
            }
          </div>
        </div>
        <div className="EmailSignUpForm__input-group">
          <label>Email</label>
          <div className="EmailSignUpForm__input-wrapper">
            <input type="email" placeholder="john@doe.com" {...email} />
            {
              email.touched &&
              email.error &&
              <span className="EmailSignUpForm__input-wrapper__error">{email.error}</span>
            }
          </div>
        </div>
        <div className="EmailSignUpForm__input-group">
          <label>Password</label>
          <div className="EmailSignUpForm__input-wrapper">
            <input type="password" placeholder="hunter2" {...password} />
            {
              password.touched &&
              password.error &&
              <span className="EmailSignUpForm__input-wrapper__error">{password.error}</span>
            }
          </div>
        </div>
        <div className="EmailSignUpForm__input-group EmailSignUpForm__submit">
          <button type="submit" className="" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    );
  }
}

export default EmailSignUpForm;
