import * as React from "react";

// TODO: Fix the weird prop inference here.
interface IProfileInfoFormProps extends React.Props<any> {
  fields?: any;
  actions?: any;
  handleSubmit?: (x) => boolean;
  submitting?: boolean;
  isUpdating?: boolean;
  didUpdate?: boolean;
}

class ProfileInfoForm extends React.Component<IProfileInfoFormProps, any> {
  _handleSubmit = () => {
    const attributes = {
      email: this.props.fields.email.value,
      currentPassword: this.props.fields.currentPassword.value,
      newPassword: this.props.fields.newPassword.value,
      birthday: this.props.fields.birthday.value,
    };

    this.props.actions.updateUserProfile(attributes);
  };

  render () {
    const {
      fields,
      handleSubmit,
      actions,
      isUpdating,
      didUpdate
    } = this.props;

    const {
      email,
      currentPassword,
      newPassword,
      birthday
    } = fields;

    return (
      <form onSubmit={handleSubmit(this._handleSubmit)}>
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
  }
};

export default ProfileInfoForm;


// const ProfileInfoForm = (props: IProfileInfoFormProps) => {
//   const {
//     fields,
//     handleSubmit,
//     actions,
//     isUpdating,
//     didUpdate,
//   } = props;
//
//   const {
//     email,
//     currentPassword,
//     newPassword,
//     birthday,
//   } = fields;
//
//   const _handleSubmit = () => {
//     const attributes = {
//       email: fields.email.value,
//       currentPassword: fields.currentPassword.value,
//       newPassword: fields.newPassword.value,
//       birthday: fields.birthday.value,
//     };
//
//     actions.updateUserProfile(attributes);
//   };
//
//   return (
//     <form onSubmit={handleSubmit(_handleSubmit)}>
//       {
//         didUpdate ? <div>Profile Updated</div> : null
//       }
//       <div>
//         <label>Email</label>
//         <div>
//           <input type="email" placeholder="john@doe.com" {...email} />
//           {
//             email.touched &&
//             email.error &&
//             <span>{email.error}</span>
//           }
//         </div>
//       </div>
//       <div>
//         <label>Existing Password</label>
//         <div>
//           <input type="password" placeholder="hunter2" {...currentPassword} />
//           {
//             currentPassword.touched &&
//             currentPassword.error &&
//             <span>{currentPassword.error}</span>
//           }
//         </div>
//       </div>
//       <div>
//         <label>New Password</label>
//         <div>
//           <input type="password" placeholder="hunter2" {...newPassword} />
//           {
//             newPassword.touched &&
//             newPassword.error &&
//             <span>{newPassword.error}</span>
//           }
//         </div>
//       </div>
//       <div>
//         <label>Birthday</label>
//         <div>
//           <input type="date" {...birthday} />
//           {
//             birthday.touched &&
//             birthday.error &&
//             <span>{birthday.error}</span>
//           }
//         </div>
//       </div>
//       <div>
//         <button type="submit" className="" disabled={isUpdating}>
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };
