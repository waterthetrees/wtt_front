import React from 'react';
import ScrollableDialog from '../ScrollableDialog/ScrollableDialog';
import { Form } from './index';
import { Button } from '@mui/material';

export default function FormScrollableDialog({
  children, actions, formMethods, onConfirm, onCancel, onError, ...restProps
}) {
  const handleSubmit = formMethods.handleSubmit(
    (data, event) => onConfirm(data, event),
    (data, event) => typeof onError === 'function' && onError(data, event)
  );

  const actionButtons = actions.map((action, i) => {
    const { confirm, cancel } = action;

    if (confirm) {
      return (
        <Button
          key={i}
          type="submit"
          onClick={handleSubmit}
        >
          {confirm}
        </Button>
      );
    } else {
      return (
        <Button
          key={i}
          onClick={onCancel}
        >
          {cancel}
        </Button>
      );
    }
  });

  return (
    <ScrollableDialog
      onClose={onCancel}
      actions={actionButtons}
      {...restProps}
    >
      <Form
        {...formMethods}
        onSubmit={handleSubmit}
      >
        {children}
      </Form>
    </ScrollableDialog>
  );
}
