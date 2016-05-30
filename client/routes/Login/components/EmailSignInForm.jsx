import React, { PropTypes } from 'react';

const EmailSignInForm = (props) => {
  const { fields: { email, password }, handleSubmit, submitting, redirectRoute } = props;

  const _handleSubmit = () => {
    const _redirectRoute = redirectRoute || '/';
    props.actions.signInUserWithCredentials(email.value, password.value, _redirectRoute);
  };

  return (
    <form onSubmit={handleSubmit(_handleSubmit)}>
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
