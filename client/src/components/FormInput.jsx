/* eslint-disable react/prop-types */
const FormInput = ({ name, label, type, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ''}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
