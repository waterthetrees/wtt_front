/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  TextField,
  Autocomplete,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

export default function FormAutocomplete({
  name, label, options = [], rules, ...props
}) {
  return (
    <>
      <Controller
        name={name}
        rules={rules}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options}
            freeSolo
            autoSelect
            handleHomeEndKeys
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="standard"
              />
            )}
            {...props}
          />
        )}
      />
      <FormErrorMessage name={name} label={label} />
    </>
  );
}
