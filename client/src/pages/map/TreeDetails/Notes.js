import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useTreeDataMutation } from '@/api/queries';
import Section from '../Section';

export default function Notes({ currentTreeData: { id, notes } }) {
  const [value, setValue] = useState(notes || '');
  const [text] = useDebounce(value, 1500);
  const mutateTreeData = useTreeDataMutation();

  const saveNotes = (newValue) => {
    // Only save the new string to the backend if it's different than our prop.  We save the trimmed
    // string but don't trim the state value so that if the user is in the middle of entering some
    // blank lines, we're not fighting with their edits, but it's cleaned up when they're done.
    if (newValue !== notes) {
      mutateTreeData.mutate({ id, notes: newValue.trim() });
    }
  };

  useEffect(() => {
    // Save the updated text after it's been debounced.
    saveNotes(text);
  }, [text]);

  const handleChange = (event) => setValue(event.target.value);

  // Save the undebounced current value of the text field when it's blurred, in case the string
  // hasn't been saved yet.
  const handleBlur = () => saveNotes(value);

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
