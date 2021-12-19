/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useCreateTreeDataMutation } from '../../api/queries';
import ScrollableDialog from '../../components/ScrollableDialog/ScrollableDialog';
import { Form } from '../../components/Form';
import TreeHeader from './TreeHeader';
import TreeInfo from './TreeInfo';
import TreeAddress from './TreeAddress';
import TreePlanter from './TreePlanter';
import { randomInteger } from './utilities';
import './AddTree.scss';

const AddTreeModal = ({
  showAddTreeModal,
  setShowAddTreeModal,
  coordinatesNewTree,
  setCoordinatesNewTree,
  setPlantMarkerOnMap,
  setPlantButtonText,
}) => {
  const { user = {} } = useAuth0();
  const { nickname, email, name } = user;
  const mutateTreeData = useCreateTreeDataMutation();
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
    lng: coordinatesNewTree[0],
    lat: coordinatesNewTree[1],
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

  const onSubmit = (dataIn) => {
    const sendData = {
      ...defaultValues,
      ...dataIn,
    };

    mutateTreeData.mutate(sendData);
    setPlantMarkerOnMap(false);
    setPlantButtonText('PLANT');
    setCoordinatesNewTree(null);
    setShowAddTreeModal(false);
  };

  const onError = (err, e) => console.error('Form errors:', err, 'Event:', e);

  const handleClose = () => setShowAddTreeModal(false);

  const handleFormSubmit = handleSubmit(onSubmit, onError);

  return (
    <ScrollableDialog
      open={showAddTreeModal}
      title={<TreeHeader />}
      onClose={handleClose}
      actions={(
        <>
          <Button
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleFormSubmit}
          >
            Add Tree
          </Button>
        </>
      )}
    >
      <Form
        {...formMethods}
        onSubmit={handleFormSubmit}
      >
        <TreeInfo />

        <TreeAddress />

        <TreePlanter />
      </Form>
    </ScrollableDialog>
  );
};

export default AddTreeModal;
