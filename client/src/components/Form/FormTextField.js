import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export default function FormTextField({
  name, label, rules, ...restProps
}) {
  return (
    <>
      <Controller
        name={name}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            variant="standard"
            fullWidth
            {...restProps}
          />
        )}
      />
      <FormErrorMessage name={name} label={label} />
    </>
  );
}
