import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControlLabel,
  Radio,
} from '@mui/material';
import { FormRadioGroup, FormTextField } from '@/components/Form';
import FormScrollableDialog from '@/components/Form/FormScrollableDialog';

const removalReasons = [
  {
    value: 'diedFromUnderWatering',
    label: 'Died from under-watering',
  },
  {
    value: 'diedFromInsects',
    label: 'Died from insects or disease',
  },
  {
    value: 'diedFromUnknown',
    label: 'Died from unknown causes',
  },
  {
    value: 'sickOrDamaged',
    label: 'Sickened or damaged',
  },
  {
    value: 'badSpecies',
    label: 'Invasive or non-native species',
  },
  {
    value: 'ugly',
    label: 'Aesthetically unappealing',
  },
];

export default function TreeRemoveDialog({
  open, setOpen, onConfirm,
}) {
  // Set mode to "all" to check for errors when fields change or lose focus.
  const formMethods = useForm({
    defaultValues: {
      reason: removalReasons[0].value,
      otherReason: '',
    },
    mode: 'all',
  });
  const { setValue } = formMethods;
  const reasonRadioButtons = [
    ...removalReasons,
    {
      value: 'other',
      // For this option, use a custom label containing a text field, so the user can specify a
      // different reason for removing the tree.  We have to manually set the form's current value
      // to 'other' when the text field is focused so it stays in sync.
      label: <FormTextField
        name="otherReason"
        label="Other reason"
        sx={{ mt: -1 }}
        onFocus={() => setValue('reason', 'other')}
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

  const handleConfirm = ({ reason, otherReason }, event) => {
    // Try to prevent the form submission from reloading the page if there's an error.
    event.preventDefault();
    setOpen(false);

    let comment;

    if (reason === 'other') {
      comment = otherReason;
    } else {
      // Use the label of the selected reason as the comment.
      const option = removalReasons.find(({ value }) => value === reason);

      comment = option
        ? option.label
        : reason;
    }

    onConfirm({ reason, comment });
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
      actions={[
        { cancel: 'Cancel' },
        { confirm: 'Remove Tree' },
      ]}
    >
      <FormRadioGroup
        name="reason"
        label="Reason for removal"
      >
        {reasonRadioButtons}
      </FormRadioGroup>
    </FormScrollableDialog>
  );
}
