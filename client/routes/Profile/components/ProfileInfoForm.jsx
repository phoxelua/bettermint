import React, { PropTypes } from 'react';

const ProfileInfoForm = (props) => {
  const {
    fields,
    handleSubmit,
    actions,
    token,
    isUpdating,
    didUpdate,
  } = props;

  const {
    email,
    password,
    birthday,
  } = fields;

  const _handleSubmit = () => {
    const attributes = {
      email: fields.email.value,
      password: fields.password.value,
      birthday: fields.birthday.value,
    };

    actions.updateUserProfile(attributes, token);
  };

  return (
    <form
      className="ProfileInfoForm"
      onSubmit={handleSubmit(_handleSubmit)}
    >
      {
        didUpdate ? <div>Profile Updated</div> : null
      }
      <div className="ProfileInfoForm__input-group">
        <label>Email</label>
        <div className="ProfileInfoForm__input-wrapper">
          <input type="email" placeholder="john@doe.com" {...email} />
          {
            email.touched &&
            email.error &&
            <span className="ProfileInfoForm__input-wrapper__error">{email.error}</span>
          }
        </div>
      </div>
      <div className="ProfileInfoForm__input-group">
        <label>Password</label>
        <div className="ProfileInfoForm__input-wrapper">
          <input type="password" placeholder="hunter2" {...password} />
          {
            password.touched &&
            password.error &&
            <span className="ProfileInfoForm__input-wrapper__error">{password.error}</span>
          }
        </div>
      </div>
      <div className="ProfileInfoForm__input-group">
        <label>Birthday</label>
        <div className="ProfileInfoForm__input-wrapper">
          <input type="date" {...birthday} />
          {
            birthday.touched &&
            birthday.error &&
            <span className="ProfileInfoForm__input-wrapper__error">{birthday.error}</span>
          }
        </div>
      </div>
      <div className="ProfileInfoForm__input-group ProfileInfoForm__submit">
        <button type="submit" className="" disabled={isUpdating}>
          Submit
        </button>
      </div>
    </form>
  );
};

ProfileInfoForm.propTypes = {
  fields: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  token: PropTypes.string,
  isUpdating: PropTypes.bool.isRequired,
  didUpdate: PropTypes.bool.isRequired,
};

export default ProfileInfoForm;
