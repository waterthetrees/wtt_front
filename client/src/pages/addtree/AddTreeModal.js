import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Modal,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import format from 'date-fns/format';
import './AddTree.scss';

import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { postData } from '../../api/queries';

import Footer from '../../components/Footer';
import TreeHeader from './TreeHeader';
import TreeInfo from './TreeInfo';
import TreeAddress from './TreeAddress';
import TreePlanter from './TreePlanter';
import ButtonsResult from './ButtonsResult';
import MuiRadioSelector from './MuiRadioSelector';
import { randomInteger } from './utilities';
import { topTreesCaliforniaNative, topTreesUSFood } from '../data';

const renderCount = 0;

const AddTreeModal = ({
  showAddTreeModal,
  setShowAddTreeModal,
  coordinatesNewTree,
  setAddTreeSelected,
  setNewTreeAdded,
}) => {
  const {
    user,
  } = useAuth0();
  const { nickname, email, name } = Object(user);

  const typeArray = ['California Natives', 'Food Trees'];
  const typeMapping = {
    'California Natives': topTreesCaliforniaNative,
    'Food Trees': topTreesUSFood,
    'By City': null,
  };
  const defaultTreeOption = [{ common: 'Vacant Site', scientific: 'Vacant Site', genus: 'Vacant Site' }];

  const defaultValues = {
    treeType: typeArray[0],
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
  const {
    register, watch, handleSubmit, reset, control, errors,
  } = useForm({ defaultValues });
  const treeFields = watch('treeType');
  const treeInfoFields = watch(['common', 'scientific', 'genus']);

  const [data] = useState(null);
  const [notesSaveButton, setNotesSaveButton] = useState('SAVE');
  const [mostRecentFields, setMostRecentFields] = useState({});
  const [treeList, setTreeList] = useState([...defaultTreeOption, ...typeMapping[treeFields]]);

  if (JSON.stringify(treeInfoFields) !== JSON.stringify(mostRecentFields)) {
    let newTreeList = [...defaultTreeOption, ...typeMapping[treeFields]];
    Object.keys(treeInfoFields).forEach((field) => {
      if (mostRecentFields[field] !== treeInfoFields[field]) {
        if (treeInfoFields[field] !== null) {
          newTreeList = newTreeList.filter((el) => el[field] === treeInfoFields[field]);
        }
      }
    });
    setTreeList(newTreeList);
    setMostRecentFields(treeInfoFields);
  }

  useEffect(() => {
    setTreeList([...defaultTreeOption, ...typeMapping[treeFields]]);
  }, [treeFields]);

  const queryClient = useQueryClient();

  const mutateTreeData = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('trees');
      queryClient.invalidateQueries('treemap');
    },
  });

  const onSubmit = (dataIn) => {
    setNewTreeAdded(true);
    const sendData = {
      ...defaultValues,
      ...dataIn,
      ...{ lat: coordinatesNewTree.lat, lng: coordinatesNewTree.lng },
    };
    delete sendData.treeType;
    mutateTreeData.mutate(['tree', sendData]);
    setNotesSaveButton('SAVING');
    setShowAddTreeModal(!showAddTreeModal);
    setNewTreeAdded(true);
  };

  const onError = (err, e) => console.error('errors, e', err, e);
  return (
    <Modal isOpen={showAddTreeModal}>
      <ModalHeader toggle={() => setShowAddTreeModal(!showAddTreeModal)} />
      <div className="addtree">
        <div className="addtree__header">
          <TreeHeader renderCount={renderCount} />
        </div>
        <hr className="divider-solid" />
        <div className="addtree__body">
          <form onSubmit={handleSubmit(onSubmit, onError)} className="form">
            <MuiRadioSelector
              register={register}
              label="Tree Type Options"
              options={typeArray}
              control={control}
            />
            <TreeInfo register={register} control={control} coordinates={coordinatesNewTree} errors={errors} treeList={treeList} />
            <TreeAddress control={control} coordinates={coordinatesNewTree} errors={errors} />
            <TreePlanter control={control} errors={errors} />
            <ButtonsResult {...{
              data, reset, defaultValues, notesSaveButton, setAddTreeSelected,
            }}
            />
          </form>
        </div>
      </div>

      <ModalFooter>
        <Footer />
      </ModalFooter>
    </Modal>
  );
};

export default AddTreeModal;
