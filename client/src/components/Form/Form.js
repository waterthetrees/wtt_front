import React from 'react';
import { FormProvider } from 'react-hook-form';

export default function Form({
  children, onSubmit, ...methods
}) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
      >
        {children}

        {/* Add a hidden input to the form so that automatic submission when pressing enter is
          handled by the browser. */}
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </FormProvider>
  );
}
