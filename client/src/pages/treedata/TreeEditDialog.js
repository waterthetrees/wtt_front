import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import format from 'date-fns/format';
import { useTreeDataMutation, useTreeHistoryMutation } from '../../api/queries';
import { Form, FormCheckbox } from '../../components/Form';
import TreeNameAndSize from '../../components/Tree/TreeNameAndSize';
import ScrollableDialog from '../../components/ScrollableDialog/ScrollableDialog';

function noNulls(object) {
	return Object.keys(object).reduce((result, key) => {
    let value = object[key]

    result[key] = value === null || value === undefined
      ? ''
      : value;

    return result;
  }, {});
}

const vacantPattern = /vacant/i;

export default function TreeEditDialog({
  idTree, treeData, showEditDialog, setShowEditDialog,
}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const mutateTreeData = useTreeDataMutation();
  const mutateHistory = useTreeHistoryMutation();
  const { common, scientific, genus, height, dbh } = treeData;
  // React will complain about defaulting value on an input to null (which may be returned by the
  // backend), so convert any nulls or undefineds to ''.
  const initialValues = noNulls({ common, scientific, genus, height, dbh });
  const defaultValues = {
    ...initialValues,
    newTree: false
  };
  const formMethods = useForm({ defaultValues });
  const { handleSubmit } = formMethods;

  const onSubmit = async (formData, event) => {
    // Try to prevent the form submission from reloading the page if there's an error.
    event.preventDefault();

    if (!isAuthenticated) loginWithRedirect();

    // Extract the newTree boolean, since we don't want to send it to the backend.
    const { newTree, ...data } = formData;

    // Only update the backend if the values have actually changed.
    if (JSON.stringify(data) !== JSON.stringify(initialValues)) {
      const sendData = {
        idTree,
        ...data,
      };

      if (newTree) {
        sendData.datePlanted = format(new Date(), 'yyyy-MM-dd');
      }

      mutateTreeData.mutate(sendData);

      if (!vacantPattern.test(data.common)) {
        const comment = newTree
          ? `This ${common} was replaced with ${data.common}.`
          : common !== data.common
            ? `This ${common} name was changed to ${data.common}.`
            : `The attributes of this ${common} were changed.`;

        const sendTreeHistory = {
          idTree,
          date_visit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          comment,
          volunteer: user.nickname,
        };

        mutateHistory.mutate(sendTreeHistory);
      }
    }

    setShowEditDialog(false);
  };

  const onError = (errorLog, e) => console.error('errors, e', errorLog, e);

  const handleClose = () => setShowEditDialog(false);

  const handleFormSubmit = handleSubmit(onSubmit, onError);

  return (
    <ScrollableDialog
      title="Edit Tree"
      open={showEditDialog}
      onClose={handleClose}
      fullScreen={false}
      actions={
        <>
          <Button
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleFormSubmit}
          >
            Save Changes
          </Button>
        </>
      }
    >
      <Form
        {...formMethods}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <TreeNameAndSize />

        <FormCheckbox
          name="newTree"
          label="Replace existing tree"
          sx={{ mt: 2 }}
        />
      </Form>
    </ScrollableDialog>
  );
}
