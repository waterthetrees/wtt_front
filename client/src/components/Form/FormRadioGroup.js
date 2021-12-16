import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export default function FormRadioGroup({
  name, label, options = [], rules, sx, ...restProps
}) {
  const { control } = useFormContext();

  // We have to wrap the Controller around the RadioGroup, not the FormControl, since the
  // RadioGroup is what is updating the actual value.
  return (
    <>
      <FormControl
        component="fieldset"
        fullWidth
      >
        <FormLabel component="legend">{label}</FormLabel>
        <Controller
          name={name}
          control={control}
          rules={rules}
          as={
            <RadioGroup
              aria-label={label}
              sx={sx}
            >
              {options}
            </RadioGroup>
          }
          {...restProps}
        />
      </FormControl>
      <FormErrorMessage name={name} label={label} />
    </>
  );
}
