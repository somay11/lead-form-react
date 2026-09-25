import React from 'react';
import FormError from './FormError';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  icon: Icon,
  error,
  required = false,
  minLength,
  maxLength,
  min,
  max,
  readOnly = false,
  disabled = false,
  inputMode,
  ...rest
}) => {
  const inputId = `input-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="form-field">
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
        {Icon && <span className="input-icon"><Icon size={16} /></span>}
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          min={min}
          max={max}
          readOnly={readOnly}
          disabled={disabled}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="form-input"
          {...rest}
        />
      </div>
      <FormError message={error} />
    </div>
  );
};

export default FormInput;
