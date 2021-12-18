import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export default function FormCheckbox({
  name, label, rules, sx, ...restProps
}) {
  // We have to wrap the Controller around the Checkbox, not the FormControlLabel, since the
  // Checkbox is what changes the actual value.
  return (
    <>
      <FormControlLabel
        label={label}
        sx={sx}
        control={
          <Controller
            name={name}
            rules={rules}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                {...restProps}
              />
            )}
          />
        }
      />
      <FormErrorMessage name={name} label={label} />
    </>
  );
}
