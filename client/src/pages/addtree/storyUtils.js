import { FormProvider, useForm } from 'react-hook-form';

export const formDecorator = (Story) => (
  <FormProvider {...useForm()}>
    <form>
      <Story />
    </form>
  </FormProvider>
);
