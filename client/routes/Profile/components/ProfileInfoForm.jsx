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
    currentPassword,
    newPassword,
    birthday,
  } = fields;

  const _handleSubmit = () => {
    const attributes = {
      email: fields.email.value,
      currentPassword: fields.currentPassword.value,
      newPassword: fields.newPassword.value,
      birthday: fields.birthday.value,
    };

    actions.updateUserProfile(attributes, token);
  };

  return (
    <form onSubmit={handleSubmit(_handleSubmit)}>
      {
        didUpdate ? <div>Profile Updated</div> : null
      }
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
        <label>Existing Password</label>
        <div>
          <input type="password" placeholder="hunter2" {...currentPassword} />
          {
            currentPassword.touched &&
            currentPassword.error &&
            <span>{currentPassword.error}</span>
          }
        </div>
      </div>
      <div>
        <label>New Password</label>
        <div>
          <input type="password" placeholder="hunter2" {...newPassword} />
          {
            newPassword.touched &&
            newPassword.error &&
            <span>{newPassword.error}</span>
          }
        </div>
      </div>
      <div>
        <label>Birthday</label>
        <div>
          <input type="date" {...birthday} />
          {
            birthday.touched &&
            birthday.error &&
            <span>{birthday.error}</span>
          }
        </div>
      </div>
      <div>
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
