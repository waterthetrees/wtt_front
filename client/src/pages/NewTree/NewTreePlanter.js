import React from 'react';
import { FormTextField, FormTheme } from '@/components/Form';
import Section from '@/components/Section/Section';
import { ThemeProvider } from '@mui/material/styles';

export default function Planter() {
  return (
    <Section title="Planter">
      <ThemeProvider theme={FormTheme}>
        <FormTextField
          name="who"
          label="Organization"
          rules={{ minLength: 1, maxLength: 100 }}
        />

        <FormTextField name="volunteer" label="Volunteer Name" disabled />

        <FormTextField name="email" label="Volunteer Email" disabled />

        <FormTextField name="idReference" label="Reference Number" disabled />
      </ThemeProvider>
    </Section>
  );
}
