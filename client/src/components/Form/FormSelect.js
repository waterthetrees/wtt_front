import React from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export default function FormSelect({
  name, label, options = [], rules, ...restProps
}) {
  const { control } = useFormContext();

  return (
    <>
      <FormControl
        variant="standard"
        fullWidth
      >
        <InputLabel id="state">{label}</InputLabel>
        <Controller
          name={name}
          rules={rules}
          variant="standard"
          control={control}
          as={<Select>{options}</Select>}
          {...restProps}
        />
      </FormControl>
      <FormErrorMessage name={name} label={label} />
    </>
  );
}
