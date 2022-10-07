import React from 'react';
import ScrollableDialog from '@/components/ScrollableDialog/ScrollableDialog';
import { Form } from './index';

export default function FormScrollableDialog({
  children,
  formMethods,
  onConfirm,
  onCancel,
  onError,
  ...props
}) {
  const handleSubmit = formMethods.handleSubmit(
    (data, event) => onConfirm(data, event),
    (data, event) => typeof onError === 'function' && onError(data, event),
  );

  return (
    <ScrollableDialog
      onClose={onCancel}
      onConfirm={handleSubmit}
      onCancel={onCancel}
      {...props}
    >
      <Form {...formMethods} onSubmit={handleSubmit}>
        {children}
      </Form>
    </ScrollableDialog>
  );
}
