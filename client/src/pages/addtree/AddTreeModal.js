import React from 'react';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { useCreateTreeDataMutation } from '../../api/queries';
import ScrollableDialog from '../../components/ScrollableDialog/ScrollableDialog';
import Form from '../../components/Form/Form';
import TreeHeader from './TreeHeader';
import TreeInfo from './TreeInfo';
import TreeAddress from './TreeAddress';
import TreePlanter from './TreePlanter';
import ButtonsResult from './ButtonsResult';
import { randomInteger } from './utilities';
import './AddTree.scss';

const AddTreeModal = ({
  showAddTreeModal,
  setShowAddTreeModal,
  coordinatesNewTree,
  setAddTreeSelected,
  setNewTreeAdded,
}) => {
  const { user: { nickname, email, name }} = useAuth0();
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
    lat: (coordinatesNewTree) ? coordinatesNewTree.lat : '',
    lng: (coordinatesNewTree) ? coordinatesNewTree.lng : '',
    owner: 'public',
    who: '',
    volunteer: nickname || name || email || 'volunteer',
    notes: '',
    health: 'good',
    email: email || '',
    idReference: `WTT${format(new Date(), 'yyyyMMdd')}${randomInteger(1000000, 9999999)}`,
  };
  const formMethods = useForm({ defaultValues });
  const { reset, handleSubmit } = formMethods;

  const onSubmit = (dataIn) => {
    const sendData = {
      ...defaultValues,
      ...dataIn,
      ...{ lat: coordinatesNewTree.lat, lng: coordinatesNewTree.lng },
    };

    mutateTreeData.mutate(sendData);
    setShowAddTreeModal(!showAddTreeModal);
    setNewTreeAdded(true);
  };

  const onError = (err, e) => console.error('errors, e', err, e);

  const toggle = () => setShowAddTreeModal(!showAddTreeModal);

  return (
    <ScrollableDialog
      open={showAddTreeModal}
      title={<TreeHeader />}
      onClose={toggle}
    >
      <Form
        {...formMethods}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <TreeInfo />

        <TreeAddress
          coordinates={coordinatesNewTree}
        />

        <TreePlanter />

        <ButtonsResult {...{
          reset,
          defaultValues,
          setAddTreeSelected,
        }}
        />
      </Form>
    </ScrollableDialog>
  );
};

export default AddTreeModal;
