import React, { PropTypes } from 'react';

const EmailSignInForm = (props) => {
  const { fields: { email, password }, handleSubmit, submitting, redirectRoute } = props;

  const _handleSubmit = () => {
    const _redirectRoute = redirectRoute || '/';
    props.actions.signInUserWithCredentials(email.value, password.value, _redirectRoute);
  };

  return (
    <form
      className="EmailSignUpForm"
      onSubmit={handleSubmit(_handleSubmit)}
    >
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
          Submit
        </button>
      </div>
    </form>
  );
};

EmailSignInForm.propTypes = {
  redirectRoute: PropTypes.string,
  actions: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};



export default EmailSignInForm;
