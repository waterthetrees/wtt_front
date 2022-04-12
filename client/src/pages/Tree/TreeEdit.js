import React from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckbox, FormScrollableDialog } from '@/components/Form';
import TreeNameAndSize from '@/components/TreeUtil/TreeNameAndSize';

export default function TreeEdit({
  open, defaultValues, onConfirm, onCancel,
}) {
  // Set mode to "all" to check for errors when fields change or lose focus.
  const formMethods = useForm({ defaultValues, mode: 'all' });

  const handleConfirm = (formData, event) => {
    // Prevent the form submission from reloading the page if there's an error.
    event.preventDefault();
    onConfirm(formData);
  };

  const handleError = (errorLog, e) => console.error('errors, e', errorLog, e);

  return (
    <FormScrollableDialog
      title="Edit Tree"
      open={open}
      onConfirm={handleConfirm}
      onCancel={onCancel}
      onError={handleError}
      fullScreen={false}
      maxWidth="xs"
      formMethods={formMethods}
      actions={[
        { cancel: 'Cancel' },
        { confirm: 'Save Changes' },
      ]}
    >
      <TreeNameAndSize />

      <FormCheckbox
        name="newTree"
        label="Replace existing tree"
        sx={{ mt: 2 }}
      />
    </FormScrollableDialog>
  );
}
