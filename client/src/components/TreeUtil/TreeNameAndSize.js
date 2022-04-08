import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputAdornment } from '@mui/material';
import { FormAutocomplete, FormDecimalField } from '@/components/Form';
import { trees } from '@/data/dist/trees';
import sortTreesBy from '@/data/sortTreesBy';

function getNames(treeList, name, firstItem) {
  // Add the names to a Set and then expand it to an array to ensure the lists of names are unique.
  // Otherwise, React will complain about duplicate keys in the menu.  Sort the trees by the
  // different fields before extracting the strings, so that the sort function can access the
  // per-tree lowercase sort fields.
  return firstItem.concat([...new Set(treeList.sort(sortTreesBy[name]).map((tree) => tree[name]))]);
}

// Adjust the adornment label so it aligns with the input placeholder.
const unit = (label) => ({
  endAdornment: <InputAdornment position="end" sx={{ marginBottom: '2px' }}>{label}</InputAdornment>,
});

const vacantLabel = 'Vacant Site';

export default function TreeNameAndSize() {
  const { watch, setValue } = useFormContext();
  // Get the value of common that was specified by our parent's defaultValues, so that we can
  // default the lastCommon state to it.
  let [common, scientific, genus] = watch(['common', 'scientific', 'genus']);
  const [lastCommon, setLastCommon] = useState(common);

  useEffect(() => {
    if (common !== lastCommon) {
      const commonTrees = trees.filter((tree) => tree.common === common);

      if (commonTrees.length) {
        // Default scientific and genus to the first matching tree (in most cases, the only one).
        ({ scientific, genus } = commonTrees[0]);
      } else if (common === vacantLabel) {
        scientific = genus = vacantLabel;
      } else if (common === null) {
        // When a field is cleared, it gets set to null, but calling setValue() with null doesn't
        // seem to update the other fields.  Setting them to '' works for some reason.
        scientific = genus = '';
      }

      setValue('scientific', scientific);
      setValue('genus', genus);
      setLastCommon(common);
    }
  }, [setValue, common, lastCommon]);

  const allFieldsEmpty = !common && !scientific && !genus;
  const firstItem = allFieldsEmpty || [common, scientific, genus].includes(vacantLabel)
    ? [vacantLabel]
    : [];
  const treeList = allFieldsEmpty
    ? trees
    // Find the union of trees that match one or more of the names.
    : trees.filter((tree) => (tree.common === common || tree.scientific === scientific || tree.genus === genus));
  const commonNames = getNames(treeList, 'common', firstItem);
  const scientificNames = getNames(treeList, 'scientific', firstItem);
  const genusNames = getNames(treeList, 'genus', firstItem);

  return (
    <>
      <FormAutocomplete
        name="common"
        label="Common name"
        options={commonNames}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
      />

      <FormAutocomplete
        name="scientific"
        label="Scientific name"
        options={scientificNames}
        rules={{ minLength: 1, maxLength: 100 }}
      />

      <FormAutocomplete
        name="genus"
        label="Genus"
        options={genusNames}
        rules={{ minLength: 1, maxLength: 100 }}
      />

      <FormDecimalField
        name="height"
        label="Height"
        InputProps={unit('feet')}
      />

      <FormDecimalField
        name="dbh"
        label="Diameter"
        title="Diameter at breast height"
        InputProps={unit('inches')}
      />
    </>
  );
}
