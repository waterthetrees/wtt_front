import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import format from 'date-fns/format';
import MuiAutoComplete from '../addtree/MuiAutoComplete';
import ErrorMessageAll from '../error/ErrorPage';
import { useTreeDataMutation, useTreeHistoryMutation } from '../../api/queries';

const filteredObj = (obj) => Object.entries(obj)
  // eslint-disable-next-line no-unused-vars
  .filter(([_, value]) => !!value)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

export default function TreeHeaderForm({
  idTree, common, scientific, genus, treeData, setEditTree,
}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [newTree, setNewTree] = useState(null);
  const mutateTreeData = useTreeDataMutation();
  const mutateHistory = useTreeHistoryMutation();

  const defaultValues = {
    idTree,
    common: common || '',
    scientific: scientific || '',
    genus: genus || '',
    datePlanted: treeData.datePlanted || format(new Date(), 'yyyy-MM-dd'),
    dbh: treeData.dbh || '',
    height: treeData.height || '',
    health: treeData.health || 'good',
  };

  const {
    handleSubmit, control, errors,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    if (!isAuthenticated) loginWithRedirect();

    const sendData = { ...defaultValues, ...data };
    sendData.health = (!treeData.health || treeData.health === 'vacant')
      ? 'good'
      : treeData.health;

    sendData.datePlanted = (newTree === 'yes')
      ? format(new Date(), 'yyyy-MM-dd')
      : treeData.datePlanted;

    const sendDataFiltered = filteredObj(sendData);
    const lowercaseCommon = sendDataFiltered.common.toLowerCase();

    if (sendDataFiltered.common !== common
       || sendDataFiltered.scientific !== scientific
       || sendDataFiltered.genus !== genus) {
      mutateTreeData.mutate(sendDataFiltered);
    }

    // new history
    const comment = (newTree === 'yes')
      ? `${sendData.common} was planted`
      : `${sendData.common} name was edited`;

    const sendTreeHistory = {
      idTree,
      date_visit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      comment,
      volunteer: user.nickname,
    };

    if (!lowercaseCommon.includes('vacant')) {
      mutateHistory.mutate(sendTreeHistory);
    }

    setEditTree(false);
  };

  const onError = (errorLog, e) => console.error('errors, e', errorLog, e);

  const coordinates = { lng: treeData.lng, lat: treeData.lat };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="form">
      <MuiAutoComplete control={control} coordinates={coordinates} keyName="common" />
      {errors.common && <ErrorMessageAll errors={errors} name="common" />}

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="scientific" />
      {errors.scientific && <ErrorMessageAll errors={errors} name="scientific" />}

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="genus" />
      {errors.genus && <ErrorMessageAll errors={errors} name="genus" />}

      <div className="treedata__edit text-right">
        <div className="treedata__edit-txt">
          <h5>Planting a new tree here?</h5>
        </div>
        <Button variant="outlined" onClick={() => setNewTree('no')} active={newTree === 'no'}>no</Button>
        <Button variant="outlined" onClick={() => setNewTree('yes')} active={newTree === 'yes'}>yes</Button>
      </div>
      <div className="treedata__edit-btn text-right">
        <Button
          variant="outlined"
          onClick={() => setEditTree(false)}
        >
          cancel
        </Button>
        <Button
          variant="outlined"
          type="submit"
          color="primary"
          className="btn btn-dark btn-md"
        >
          SAVE
        </Button>
      </div>
    </form>
  );
}
