import React from 'react';
import FormError from './FormError';

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Select an option',
  icon: Icon,
  error,
  required = false,
  disabled = false,
}) => {
  const selectId = `select-${name}`;
  const errorId = `${selectId}-error`;

  return (
    <div className="form-field">
      <label htmlFor={selectId} className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <div className={`select-wrapper ${error ? 'input-error' : ''}`}>
        {Icon && <span className="select-icon"><Icon size={16} /></span>}
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="form-select"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="select-arrow">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      <FormError message={error} />
    </div>
  );
};

export default FormSelect;
