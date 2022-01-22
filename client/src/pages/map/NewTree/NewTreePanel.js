import React from 'react';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { Form } from '@/components/Form';
import Info from './Info';
import Address from './Address';
import Planter from './Planter';
import { randomInteger } from './utilities';
import { useNewTree } from './useNewTree';

export default function NewTreePanel({ Container, drawerWidth }) {
  const { newTreeState, confirm, cancel } = useNewTree();

  if (!newTreeState.coords) {
    return null;
  }

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
    lng: newTreeState.coords[0],
    lat: newTreeState.coords[1],
    owner: 'public',
    who: '',
    volunteer: nickname || name || email || 'volunteer',
    notes: '',
    health: 'good',
    email: email || '',
    idReference: `WTT${format(new Date(), 'yyyyMMdd')}${randomInteger(1000000, 9999999)}`,
  };
  // Set mode to "all" to check for errors when fields change or lose focus.
  const formMethods = useForm({ defaultValues, mode: 'all' });
  const { handleSubmit } = formMethods;

  const handleConfirm = (data) => confirm({ ...defaultValues, ...data });

  const handleCancel = () => cancel();

  const handleError = (err, e) => console.error('Form errors:', err, 'Event:', e);

  const handleFormSubmit = handleSubmit(handleConfirm, handleError);

  return (
    <Container
      title="New Tree"
      width={drawerWidth}
      open={newTreeState.isPanelOpen}
      actions={(
        <>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleFormSubmit}>
            Add New Tree
          </Button>
        </>
      )}
      onClose={handleCancel}
    >
      <Form
        {...formMethods}
        onSubmit={handleFormSubmit}
      >
        <Info />
        <Address />
        <Planter />
      </Form>
    </Container>
  );
}
