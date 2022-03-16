import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import { useTreeDataMutation, useCreateTreeDataMutation } from '@/api/queries';
import Section from '@/components/Section/Section';

export default function TreeNotes({ currentTreeData, isTreeQueryError }) {
  const { id, notes } = currentTreeData;
  const [value, setValue] = useState(notes || '');
  const mutateTreeData = useTreeDataMutation();
  const mutateTreeDataCreate = useCreateTreeDataMutation();

  useEffect(() => {
    if (notes && !value) {
      // The vector tile data may not contain any notes, but the /trees call might return a string
      // after this component is mounted, so update the text field if it's currently blank.
      setValue(notes);
    }
  }, [notes]);

  const saveNotes = useDebouncedCallback((newValue) => {
    const trimmedValue = newValue.trim();

    // Only save the new string to the backend if it's different than our prop.  We save the trimmed
    // string but don't trim the state value so that if the user is in the middle of entering some
    // blank lines, we're not fighting with their edits, but it's cleaned up when they're done.
    if (notes !== trimmedValue) {
      if (isTreeQueryError) {
        mutateTreeDataCreate.mutate({
          ...currentTreeData,
          notes: trimmedValue,
        });
      } else {
        mutateTreeData.mutate({ id, notes: trimmedValue });
      }
    }
  }, 1500);

  const handleChange = (event) => {
    const newValue = event.target.value;

    setValue(newValue);
    saveNotes(newValue);
  };

  // If there's a debounced call to save the current notes, flush it so it's posted to the
  // backend in case the component is being unmounted.
  const handleBlur = () => saveNotes.flush();

  return (
    <Section
      title="Notes"
    >
      <TextField
        value={value}
        placeholder="Add a note"
        variant="standard"
        multiline
        fullWidth
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Section>
  );
}
