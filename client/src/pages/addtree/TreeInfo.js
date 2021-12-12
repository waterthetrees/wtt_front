import React from 'react';
import { MenuItem } from '@mui/material';
import { treeHealth } from '../../util/treeHealth';
import {
  FormTextField,
  FormSelect,
  FormTreeGroup,
} from '../../components/Form';
import TreeNameAndSize from '../../components/Tree/TreeNameAndSize';

// Create an array of tree health items, reversed so that "good" comes first.
const healthOptions = treeHealth.getNameValuePairs().reverse()
  .map(([name]) => <MenuItem key={name} value={name}>{name}</MenuItem>);

export default function TreeInfo() {
  return (
    <FormTreeGroup title="Info">
      <TreeNameAndSize />

      <FormTextField
        type="date"
        name="datePlanted"
        label="Date Planted"
        rules={{ required: true, minLength: 1, maxLength: 100 }}
      />

      <FormSelect
        name="health"
        label="Health"
        options={healthOptions}
      />

      <FormTextField
        name="notes"
        label="Notes"
      />
    </FormTreeGroup>
  );
}
