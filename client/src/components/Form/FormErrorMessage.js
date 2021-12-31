import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Alert, styled } from '@mui/material';

const FormAlert = styled(Alert)`
  padding: 2px 12px;
  margin-bottom: .5rem;
  font-size: 1rem;
  & .MuiAlert-icon {
    margin-right: 10px;
  }
  & .MuiAlert-message {
    padding: 0;
    margin: auto 0;
  }
`;

const messagesByType = {
  required: (label) => `${label} is required.`,
  minLength: (label) => `${label} is too short.`,
  maxLength: (label) => `${label} is too long.`,
  pattern: (label) => `${label} is not formatted correctly.`,
  default: (label) => `${label} has an error.`,
};

export default function FormErrorMessage({ name, label = name }) {
  const { formState: { errors } } = useFormContext();
  const error = errors[name];

  if (error) {
    const message = messagesByType[error.type || 'default'](label);

    return (
      <FormAlert severity="error">
        {message}
      </FormAlert>
    );
  }

  return null;
}
