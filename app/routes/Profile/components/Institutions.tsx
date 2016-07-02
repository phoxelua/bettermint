import * as React from "react";

interface IInstitutionProps extends React.Props<any> {
    institution: string;
    onDelete: (institution: string) => void;
}

const Institution = ({ institution, onDelete }: IInstitutionProps) => {
  const _onDelete = () => {
    onDelete(institution);
  };

  return (
    <div>
      <button onClick={_onDelete}>Remove {institution}</button>
    </div>
  );
};

interface IInstitutionsProps extends React.Props<any> {
    actions: any;
    institutions: string[];
}

const Institutions = ({ actions, institutions }: IInstitutionsProps) => {
  const handleOnDelete = (institution) => {
    actions.deleteInstitution(institution);
  };

  return (
    <div>
      {!!institutions.length &&
        <div>
          {institutions.map(institution => (
            <div key={institution}>
              <Institution institution={institution} onDelete={handleOnDelete} />
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Institutions;
