import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';
import { FormRadioGroup, FormTextField } from '../../components/Form';
import FormScrollableDialog from '../../components/Form/FormScrollableDialog';

export default function TreeRemoveDialog({
  open, setOpen, onConfirm,
}) {
  const formMethods = useForm({
    defaultValues: {
      reason: 'dead',
      otherReason: ''
    }
  });
  const { setValue } = formMethods;
  const options = [
    {
      value: 'dead',
      label: 'Dead'
    },
    {
      value: 'noWater',
      label: 'No water'
    },
    {
      value: 'insects',
      label: 'Insects or disease'
    },
    {
      value: 'other',
      // For this option, use a custom label containing a text field, so the user can specify a
      // different reason for removing the tree.  We have to manually set the form's current value
      // to 'other' when the text field is focused so it stays in sync.
      label: <FormTextField
        name="otherReason"
        label="Other reason"
        sx={{ mt: -1 }}
        as={<TextField onFocus={() => setValue('reason', 'other')} />}
      />,
    },
  ].map(({ value, label }) => (
    <FormControlLabel
      key={value}
      value={value}
      control={<Radio />}
      label={label}
      // We seem to have to pick out this label class to make each control extend the full width
      // of the radio group.
      sx={{
        '& .MuiFormControlLabel-label': {
          width: '100%',
        },
      }}
    />
  ));

  const handleConfirm = (data, event) => {
    // Try to prevent the form submission from reloading the page if there's an error.
    event.preventDefault();
    setOpen(false);
    onConfirm(data);
  };

  const handleCancel = () => setOpen(false);

  const handleError = (errorLog, e) => console.error('errors, e', errorLog, e);

  return (
    <FormScrollableDialog
      title="Remove Tree"
      open={open}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onError={handleError}
      fullScreen={false}
      maxWidth="xs"
      formMethods={formMethods}
      actions={[{ cancel: 'Cancel' }, { confirm: 'Remove Tree' }]}
    >
      <FormRadioGroup
        name="reason"
        label="Reason for removal"
        options={options}
      />
    </FormScrollableDialog>
  );
}
