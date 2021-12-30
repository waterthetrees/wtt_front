import React from 'react';
import {
  FormTextField,
  FormTreeGroup,
} from '../../components/Form';

export default function TreePlanter() {
  return (
    <FormTreeGroup title="Planter">
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
      />
    </FormTreeGroup>
  );
}
