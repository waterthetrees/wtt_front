import React from 'react';
import ScrollableDialog from '../ScrollableDialog/ScrollableDialog';
import { Form } from './index';
import { Button } from '@mui/material';

const isFunction = (value) => typeof value === 'function';

export default function FormScrollableDialog({
  children, actions, formMethods, onConfirm, onCancel, onError, ...restProps
}) {
  const handleSubmit = formMethods.handleSubmit(
    (data, event) => isFunction(onConfirm) && onConfirm(data, event),
    (data, event) => isFunction(onError) && onError(data, event)
  );

  const handleCancel = () => isFunction(onCancel) && onCancel();

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
          onClick={handleCancel}
        >
          {cancel}
        </Button>
      );
    }
  });

  return (
    <ScrollableDialog
      onClose={handleCancel}
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
