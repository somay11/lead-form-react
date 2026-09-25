import React from 'react';

const FormError = ({ message }) => {
  if (!message) return null;
  return <span className="form-error" role="alert">{message}</span>;
};

export default FormError;
