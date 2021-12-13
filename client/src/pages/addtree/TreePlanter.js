import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import {
  FormTextField,
  FormTreeGroup,
} from '../../components/Form';

export default function TreePlanter() {
  const { control } = useFormContext();

  return (
    <FormTreeGroup title="Planter">
      <Controller
        as={(
          <RadioGroup aria-label="owner" name="position" row>
            <FormControlLabel
              value="public"
              control={<Radio color="primary" value="public" />}
              label="Public Land"
            />
            <FormControlLabel
              value="private"
              control={<Radio color="secondary" value="private" />}
              label="Private Land"
            />
          </RadioGroup>
        )}
        name="owner"
        control={control}
        size="medium"
      />

      <FormTextField
        name="who"
        label="Organization"
        rules={{ minLength: 1, maxLength: 100 }}
      />

      <FormTextField
        name="volunteer"
        label="Volunteer Name"
        disabled
      />

      <FormTextField
        name="email"
        label="Volunteer Email"
        disabled
      />

      <FormTextField
        name="idReference"
        label="Reference Number"
        disabled
      />
    </FormTreeGroup>
  );
}
