import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';

import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  ButtonGroup,
} from 'reactstrap';
import cx from 'classnames';
import format from 'date-fns/format';
import './TreeData.scss';
import { putData, postData } from '../../api/queries';

// import TreeInfo from '../addtree/TreeInfo';
// import ButtonsResult from '../addtree/ButtonsResult';
// const TreeInfo = React.lazy(() => import('../addtree/TreeInfo'));
// const ButtonsResult = React.lazy(() => import('../addtree/ButtonsResult'));

import MuiAutoComplete from '../addtree/MuiAutoComplete';
import ErrorMessageAll from '../error/ErrorPage';

const filteredObj = (obj) => Object.entries(obj)
  .filter(([_, value]) => !!value)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

export default function TreeHeaderForm({
  idTree, common, scientific, genus, treeData, setEditTree,
}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const treeHistoryObj = useQuery(['treehistory', { currentTreeId: idTree }], getData);
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
    handleSubmit, reset, control, errors,
  } = useForm({ defaultValues });
  const [data, setData] = useState(null);

  const queryClient = useQueryClient();
  const mutateTreeData = useMutation(putData, {
    onSuccess: () => {
      queryClient.invalidateQueries('tree');
    },
  });

  const mutateHistory = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treehistory');
    },
  });

  const [newTree, setNewTree] = useState(null);
  const onSubmit = async (data) => {
    const sendData = { ...defaultValues, ...data };
    // update tree
    sendData.health = (!treeData.health || treeData.health === 'vacant')
      ? 'good'
      : treeData.health;

    sendData.datePlanted = (newTree)
      ? format(new Date(), 'yyyy/MM/dd')
      : treeData.datePlanted;

    const sendDataFiltered = filteredObj(sendData);
    if (sendDataFiltered.common !== common
       && sendDataFiltered.scientific !== scientific
       && sendDataFiltered.genus !== genus) {
      mutateTreeData.mutate(['tree', sendDataFiltered]);
    }

    // new history
    const comment = (newTree)
      ? `${sendData.common} was planted`
      : `${sendData.common} name was editted`;

    const sendTreeHistory = {
      idTree,
      date_visit: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
      comment,
      volunteer: user.nickname,
    };
    const lowercaseCommon = sendDataFiltered.common.toLowerCase();
    if (!lowercaseCommon.includes('vacant')) {
      mutateHistory.mutate(['treehistory', sendTreeHistory]);
    }

    setEditTree(false);
  };
  const onError = (errors, e) => console.error('errors, e', errors, e);
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
        <span>
          <div className="treedata__edit-txt">
            <h5>Planting a new tree here?</h5>
          </div>
          <ButtonGroup className="treedata__edit-btngrp">
            <Button color="primary" className="btn-md" onClick={() => setNewTree('no')} active={newTree === 'no'}>no</Button>
            <Button color="success" className="btn-md" onClick={() => setNewTree('yes')} active={newTree === 'yes'}>yes</Button>
          </ButtonGroup>

        </span>
      </div>
      <div className="treedata__edit-btn text-right">
        <Button
          type="button"
          color="link"
          onClick={() => setEditTree(false)}
        >
          cancel
        </Button>
        <Button
          type="submit"
          color="success"
          className="btn btn-dark btn-md"
        >
          SAVE
        </Button>
      </div>
    </form>
  );
}
