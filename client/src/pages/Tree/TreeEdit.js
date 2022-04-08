import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import format from 'date-fns/format';
import { useTreeDataMutation, useCreateTreeDataMutation, useTreeHistoryMutation } from '@/api/queries';
import { FormCheckbox, FormScrollableDialog } from '@/components/Form';
import TreeNameAndSize from '@/components/TreeUtil/TreeNameAndSize';

function noNulls(object) {
  return Object.keys(object).reduce((result, key) => {
    const value = object[key];

    // eslint-disable-next-line no-param-reassign
    result[key] = value === null || value === undefined
      ? ''
      : value;

    return result;
  }, {});
}

const vacantPattern = /vacant/i;

export default function TreeEdit({
  open, currentTreeId, currentTreeData, onConfirm, onCancel, isTreeQueryError,
}) {
  const { user = {} } = useAuth0();
  const mutateTreeData = useTreeDataMutation();
  const mutateCreateTreeData = useCreateTreeDataMutation();
  const mutateHistory = useTreeHistoryMutation();
  const {
    common, scientific, genus, height, dbh,
  } = currentTreeData;
  // React will complain about defaulting value on an input to null (which may be returned by the
  // backend), so convert any nulls or undefineds to ''.
  const initialValues = noNulls({
    common, scientific, genus, height, dbh,
  });
  const defaultValues = {
    ...initialValues,
    newTree: false,
  };
  // Set mode to "all" to check for errors when fields change or lose focus.
  const formMethods = useForm({ defaultValues, mode: 'all' });

  const handleConfirm = (formData, event) => {
    // Try to prevent the form submission from reloading the page if there's an error.
    event.preventDefault();

    // Extract the newTree boolean, since we don't want to send it to the backend.
    const { newTree, ...data } = formData;

    // Only update the backend if the values have actually changed.  If the new tree checkbox is on
    // and the names haven't changed, that just means tree's been replaced with the same type.
    if (JSON.stringify(data) !== JSON.stringify(initialValues) || newTree) {
      const sendTreeData = { id: currentTreeId, ...data };

      if (newTree) {
        sendTreeData.datePlanted = format(new Date(), 'yyyy-MM-dd');
      }
      if (isTreeQueryError) {
        mutateCreateTreeData.mutate({ ...currentTreeData, ...sendTreeData });
      } else {
        mutateTreeData.mutate(sendTreeData);
      }

      if (!vacantPattern.test(data.common)) {
        // eslint-disable-next-line no-nested-ternary
        const comment = newTree
          ? `This ${common} was replaced with ${data.common}.`
          : common !== data.common
            ? `This ${common} name was changed to ${data.common}.`
            : `The attributes of this ${common} were changed.`;

        const sendTreeHistory = {
          id: currentTreeId,
          date_visit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          comment,
          volunteer: user.nickname,
        };

        mutateHistory.mutate(sendTreeHistory);
      }
    }

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
