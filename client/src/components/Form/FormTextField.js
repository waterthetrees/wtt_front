import React from 'react';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export default function FormTextField({
  name, label, rules, ...restProps
}) {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        label={label}
        rules={rules}
        variant="standard"
        fullWidth
        control={control}
        as={TextField}
        {...restProps}
      />
      <FormErrorMessage name={name} label={label} />
    </>
  );
}
