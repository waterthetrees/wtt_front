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

  let topTrees = treelist.data || [{ common: 'Vacant Site', scientific: 'Vacant Site', genus: 'Vacant Site' }];
  topTrees = topTrees.length > 1
    ? [...[{ common: 'Vacant Site', scientific: 'Vacant Site', genus: 'Vacant Site' }], ...topTrees]
    : topTrees;
  console.log(topTrees);
  const handleInputChange = (e, data) => data;

  return (
    <div>
      {!treelist && (<div>test</div>)}
      {treelist && treelist.status !== 'loading' && topTrees && (
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
      )}
    </div>
  );
}
