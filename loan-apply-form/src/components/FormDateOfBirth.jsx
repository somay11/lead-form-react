import React from 'react';
import FormError from './FormError';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const FormDateOfBirth = ({
  label,
  name,
  value = {},
  onChange,
  onBlur,
  error,
  required = false
}) => {
  const fieldId = `dob-${name}`;
  const errorId = `${fieldId}-error`;

  const year = value.year || '';
  const month = value.month || '';
  const day = value.day || '';

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  const getDaysInMonth = (monthIndex, yearValue) => {
    if (!monthIndex || !yearValue) return 31;
    return new Date(yearValue, monthIndex, 0).getDate();
  };

  const days = getDaysInMonth(month, year);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    onChange({
      ...value,
      year: newYear,
      day: newYear && month ? Math.min(day, getDaysInMonth(month, newYear)) || '' : day
    });
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    onChange({
      ...value,
      month: newMonth,
      day: newMonth && year ? Math.min(day, getDaysInMonth(newMonth, year)) || '' : day
    });
  };

  const handleDayChange = (e) => {
    onChange({ ...value, day: e.target.value });
  };

  const handleBlur = () => {
    onBlur({ target: { name: 'dob', value } });
  };

  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <div className="dob-wrapper">
        <div className={`dob-select-wrapper ${error ? 'input-error' : ''}`}>
          <select
            id={`${fieldId}-day`}
            value={day}
            onChange={handleDayChange}
            onBlur={handleBlur}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className="dob-select"
          >
            <option value="">Day</option>
            {Array.from({ length: days }, (_, i) => i + 1).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className={`dob-select-wrapper ${error ? 'input-error' : ''}`}>
          <select
            id={`${fieldId}-month`}
            value={month}
            onChange={handleMonthChange}
            onBlur={handleBlur}
            required={required}
            aria-invalid={!!error}
            className="dob-select"
          >
            <option value="">Month</option>
            {months.map((m, idx) => (
              <option key={m} value={idx + 1}>{m}</option>
            ))}
          </select>
        </div>
        <div className={`dob-select-wrapper ${error ? 'input-error' : ''}`}>
          <select
            id={`${fieldId}-year`}
            value={year}
            onChange={handleYearChange}
            onBlur={handleBlur}
            required={required}
            aria-invalid={!!error}
            className="dob-select"
          >
            <option value="">Year</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
      <FormError message={error} />
    </div>
  );
};

export default FormDateOfBirth;
