import React from 'react';
import { FormControlLabel, Radio } from '@mui/material';

export default function FormRadio({ value, label, ...props }) {
  // We have to wrap the Controller around the RadioGroup, not the FormControl, since the
  // RadioGroup is what is updating the actual value.
  return (
    <FormControlLabel
      value={value}
      label={label}
      control={<Radio />}
      {...props}
    />
  );
}
