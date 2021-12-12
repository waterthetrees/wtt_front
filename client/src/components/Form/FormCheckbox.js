import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export default function FormCheckbox({
  name, label, rules, sx, ...restProps
}) {
  const { control } = useFormContext();

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
            control={control}
            rules={rules}
            render={(props) => (
              <Checkbox
                {...props}
                checked={props.value}
                onChange={(e) => props.onChange(e.target.checked)}
              />
            )}
            {...restProps}
          />
        }
      />
      <FormErrorMessage name={name} label={label} />
    </>
  );
}
