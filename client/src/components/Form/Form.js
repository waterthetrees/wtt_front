import React from 'react';
import { FormProvider } from 'react-hook-form';

export default function Form({
  children, onSubmit, ...methods
}) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  );
}
