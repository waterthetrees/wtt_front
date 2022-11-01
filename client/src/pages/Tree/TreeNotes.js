import React, { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import {
  useTreeDataMutation,
  useCreateTreeDataMutation,
} from '@/api/queries';
import Section from '@/components/Section/Section';

export default function TreeNotes({ currentTreeData, isTreeQueryError }) {
  const { id, notes } = currentTreeData;
  const notesRef = useRef(notes);
  const mutateTreeData = useTreeDataMutation();
  const mutateCreateTreeData = useCreateTreeDataMutation();

  const saveNotes = useDebouncedCallback(() => {
    const trimmedValue = notesRef.current.value.trim();

    // Only save the new string to the backend if it's different than our prop.  We save the trimmed
    // string but don't trim the state value so that if the user is in the middle of entering some
    // blank lines, we're not fighting with their edits, but it's cleaned up when they're done.
    if (trimmedValue.length && notes !== trimmedValue) {
      if (isTreeQueryError) {
        mutateCreateTreeData.mutate({
          ...currentTreeData,
          notes: trimmedValue,
        });
      } else {
        mutateTreeData.mutate({ id, notes: trimmedValue });
      }
    }
  }, 300);

  const handleChange = () => saveNotes();
  // If there's a debounced call to save the current notes, flush it so it's posted to the
  // backend in case the component is being unmounted.
  const handleBlur = () => saveNotes.flush();

  useEffect(() => {
    if (!notesRef.current) return;
    saveNotes();
  }, [notesRef.current]);

  return (
    <Section title="Notes">
      <TextField
        inputRef={notesRef}
        placeholder="Add a note"
        variant="standard"
        multiline
        fullWidth
        defaultValue={notes}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Section>
  );
}
