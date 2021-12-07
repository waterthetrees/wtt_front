/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  TextField,
  FormControl,
  Autocomplete,
} from '@mui/material';
import { Controller } from 'react-hook-form';

export default function FormAutocomplete({
  name, label, options = [], rules, control,
}) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={(props) => (
          <Autocomplete
            {...props}
            options={options}
            id={name}
            freeSolo
            autoSelect
            handleHomeEndKeys
            onChange={(_, value) => props.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="standard"
                size="small"
              />
            )}
          />
        )}
      />
    </FormControl>
  );
}
