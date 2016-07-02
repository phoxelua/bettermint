import * as React from "react";

interface IEmailSignInFormProps {
  redirectRoute: string;
  actions?: any;
  fields?: any;
  handleSubmit?: (a) => void;
  submitting?: boolean;
};

class EmailSignInForm extends React.Component<IEmailSignInFormProps, any> {
  _handleSubmit = () => {
    const _redirectRoute = this.props.redirectRoute || "/";
    this.props.actions.signInUserWithCredentials(
      this.props.fields.email.value,
      this.props.fields.password.value,
      _redirectRoute
    );
  };

  render () {
    const { fields: { email, password }, handleSubmit, submitting, redirectRoute } = this.props;

    return (
      <form onSubmit={handleSubmit(this._handleSubmit)}>
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
  }
};

export default EmailSignInForm;
