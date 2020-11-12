/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';

export default function TreeName({
  control, keyName, coordinates,
}) {
  const treelist = useQuery(['treelist', { coordinates }], getData);
  const topTrees = treelist.data || {};
  const handleInputChange = (e, data) => data;

  return (
    <Controller
      render={(props) => (
        <Autocomplete
          {...props}
          options={topTrees.map((option) => option[keyName])}
          id={keyName}
          freeSolo
          autoSelect
          handleHomeEndKeys
          clearOnBlur
          renderInput={(params) => (
            <TextField
              {...params}
              label={keyName}
              variant="standard"
              size="small"
              className="addtree__infoname"
              name={keyName}
            />
          )}
          onInputChange={handleInputChange}
          onChange={(_, data) => props.onChange(data)}
        />
      )}
      name={keyName}
      control={control}
      rules={(keyName === 'common') ? { required: true, minLength: 1, maxLength: 100 } : { required: false, minLength: 1, maxLength: 100 }}
    />
  );
}
