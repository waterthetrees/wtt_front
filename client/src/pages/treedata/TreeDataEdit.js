import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import format from 'date-fns/format';
import { useTreeDataMutation, useTreeHistoryMutation } from '../../api/queries';
import Form from '../../components/Form/Form';
import TreeSelector from '../../components/TreeSelector/TreeSelector';

const filteredObj = (obj) => Object.entries(obj)
  // eslint-disable-next-line no-unused-vars
  .filter(([_, value]) => !!value)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

export default function TreeHeaderForm({
  idTree, treeData, setEditTree,
}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [newTree, setNewTree] = useState(null);
  const mutateTreeData = useTreeDataMutation();
  const mutateHistory = useTreeHistoryMutation();
  const defaultValues = {
    common: treeData.common || '',
    scientific: treeData.scientific || '',
    genus: treeData.genus || '',
  };
  const formMethods = useForm({ defaultValues });
  const { handleSubmit } = formMethods;

  const onSubmit = async (data) => {
    if (!isAuthenticated) loginWithRedirect();

    const sendData = {
      idTree,
      ...defaultValues,
      ...data
    };
    sendData.health = (!treeData.health || treeData.health === 'vacant')
      ? 'good'
      : treeData.health;

    sendData.datePlanted = (newTree === 'yes')
      ? format(new Date(), 'yyyy-MM-dd')
      : treeData.datePlanted;

    const sendDataFiltered = filteredObj(sendData);
    const lowercaseCommon = sendDataFiltered.common.toLowerCase();

    if (sendDataFiltered.common !== treeData.common
       || sendDataFiltered.scientific !== treeData.scientific
       || sendDataFiltered.genus !== treeData.genus) {
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

  return (
    <Form
      {...formMethods}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <TreeSelector />

      <div className="treedata__edit text-right">
        <div className="treedata__edit-txt">
          <h5>Planting a new tree here?</h5>
        </div>
        <Button variant="outlined" onClick={() => setNewTree('no')}>no</Button>
        <Button variant="outlined" onClick={() => setNewTree('yes')}>yes</Button>
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
          className="btn btn-dark btn-md"
        >
          SAVE
        </Button>
      </div>
    </Form>
  );
}
