/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  TextField,
  Autocomplete,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export default function FormAutocomplete({
  name, label, options = [], rules,
}) {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={(props) => (
          <Autocomplete
            {...props}
            options={options}
            freeSolo
            autoSelect
            handleHomeEndKeys
            onChange={(_, value) => props.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="standard"
              />
            )}
          />
        )}
      />
      <FormErrorMessage name={name} label={label} />
    </>
  );
}
