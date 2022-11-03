import React from 'react';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { Form } from '@/components/Form';
import NewTreeInfo from './NewTreeInfo';
import NewTreeAddress from './NewTreeAddress';
import NewTreePlanter from './NewTreePlanter';
import { randomInteger } from './utilities';
import { useNewTree } from './useNewTree';

export default function NewTree({ TreeDetailsContainer, drawerWidth }) {
  const { newTreeState, confirm, cancel } = useNewTree();
  const { user = {} } = useAuth0();
  const { nickname, email, name } = user;
  const defaultValues = {
    city: '',
    common: '',
    scientific: '',
    genus: '',
    datePlanted: format(new Date(), 'yyyy-MM-dd'),
    dbh: '',
    height: '',
    address: '',
    state: '',
    zip: '',
    neighborhood: '',
    lng: newTreeState.coords ? newTreeState.coords?.lng : '',
    lat: newTreeState.coords ? newTreeState.coords?.lat : '',
    owner: 'public',
    who: '',
    volunteer: nickname || name || email || 'volunteer',
    notes: '',
    health: 'good',
    email: email || '',
    idReference: `WTT${format(new Date(), 'yyyyMMdd')}${randomInteger(
      1000000,
      9999999,
    )}`,
  };
  const formMethods = useForm({ defaultValues, mode: 'all' });
  if (!newTreeState.coords) {
    return null;
  }

  // Set mode to "all" to check for errors when fields change or lose focus.
  const { handleSubmit } = formMethods;

  const handleConfirm = (data) => confirm({ ...defaultValues, ...data });

  const handleCancel = () => cancel();

  const handleError = (err, e) =>
    console.error('Form errors:', err, 'Event:', e);

  const handleFormSubmit = handleSubmit(handleConfirm, handleError);

  return (
    <TreeDetailsContainer
      title="New Tree"
      width={drawerWidth}
      open={newTreeState.isPanelOpen}
      actions={
        <>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Plant New Tree</Button>
        </>
      }
      onClose={handleCancel}
    >
      <Form {...formMethods} onSubmit={handleFormSubmit}>
        <NewTreeInfo />
        <NewTreeAddress />
        <NewTreePlanter />
      </Form>
    </TreeDetailsContainer>
  );
}
