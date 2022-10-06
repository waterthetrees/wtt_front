import React from 'react';
import { FormControl, FormLabel, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export default function FormRadioGroup({
  children,
  name,
  label,
  rules,
  ...props
}) {
  // We have to wrap the Controller around the RadioGroup, not the FormControl, since the
  // RadioGroup is what is updating the actual value.
  return (
    <>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">{label}</FormLabel>
        <Controller
          name={name}
          rules={rules}
          render={({ field }) => (
            <RadioGroup {...field} aria-label={label} {...props}>
              {children}
            </RadioGroup>
          )}
        />
      </FormControl>
      <FormErrorMessage name={name} label={label} />
    </>
  );
}
