import React from 'react';
import FormError from './FormError';

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  rows = 3,
}) => {
  const textareaId = `textarea-${name}`;
  const errorId = `${textareaId}-error`;

  return (
    <div className="form-field">
      <label htmlFor={textareaId} className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`form-textarea ${error ? 'input-error' : ''}`}
      />
      <FormError message={error} />
    </div>
  );
};

export default FormTextarea;
