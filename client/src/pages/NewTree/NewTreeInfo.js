import React from 'react';
import { MenuItem } from '@mui/material';
import {
  FormTextField,
  FormSelect,
} from '@/components/Form';
import Section from '@/components/Section/Section';
import { treeHealthUtil } from '@/util/treeHealthUtil';
import TreeNameAndSize from '@/components/TreeUtil/TreeNameAndSize';

// Create an array of tree health items, reversed so that "good" comes first.
const healthMenuItems = treeHealthUtil.getNameValuePairs().reverse()
  .map(([name]) => <MenuItem key={name} value={name}>{name}</MenuItem>);

export default function Info() {
  return (
    <Section title="Info">
      <TreeNameAndSize />

      <FormTextField
        type="date"
        name="datePlanted"
        label="Date Planted"
        rules={{ required: true, minLength: 1, maxLength: 10 }}
      />

      <FormSelect
        name="health"
        label="Health"
      >
        {healthMenuItems}
      </FormSelect>

      <FormTextField
        name="notes"
        label="Notes"
      />
    </Section>
  );
}
