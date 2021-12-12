import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { useCreateTreeDataMutation } from '../../api/queries';
import ScrollableDialog from '../../components/ScrollableDialog/ScrollableDialog';
import TreeHeader from './TreeHeader';
import TreeInfo from './TreeInfo';
import TreeAddress from './TreeAddress';
import TreePlanter from './TreePlanter';
import ButtonsResult from './ButtonsResult';
import MuiRadioSelector from './MuiRadioSelector';
import { randomInteger } from './utilities';
import { topTreesCaliforniaNative, topTreesUSFood } from '../data';
import './AddTree.scss';

const renderCount = 0;

const AddTreeModal = ({
  showAddTreeModal,
  setShowAddTreeModal,
  coordinatesNewTree,
  setPlantMarkerOnMap,
  // setNewTreeAdded,
  // map,
}) => {
  const { user } = useAuth0();
  const { nickname, email, name } = Object(user);

  const typeArray = ['California Natives', 'Food Trees'];
  const typeMapping = {
    'California Natives': topTreesCaliforniaNative,
    'Food Trees': topTreesUSFood,
    'By City': null,
  };
  const defaultTreeOption = [{ common: 'Vacant Site', scientific: 'Vacant Site', genus: 'Vacant Site' }];
  console.log(coordinatesNewTree, 'coordinatesNewTree kkakak');
  // console.log(map.getLntLat, 'map.getLntLat');
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
    lat: coordinatesNewTree[0],
    lng: coordinatesNewTree[1],
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

  const mutateTreeData = useCreateTreeDataMutation();

  const onSubmit = (dataIn) => {
    // setNewTreeAdded(true);
    const sendData = {
      ...defaultValues,
      ...dataIn,
      ...{ lat: coordinatesNewTree.lat, lng: coordinatesNewTree.lng },
    };
    delete sendData.treeType;
    mutateTreeData.mutate(sendData);
    setShowAddTreeModal(!showAddTreeModal);
    // setNewTreeAdded(true);
  };

  const onError = (err, e) => console.error('errors, e', err, e);

  const toggle = () => setShowAddTreeModal(!showAddTreeModal);

  return (
    <ScrollableDialog
      open={showAddTreeModal}
      title={<TreeHeader renderCount={renderCount} />}
      onClose={toggle}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="addtree">
        <MuiRadioSelector
          register={register}
          label="Tree Type Options"
          options={typeArray}
          control={control}
        />
        <TreeInfo
          register={register}
          control={control}
          errors={errors}
          treeList={treeList}
        />
        <TreeAddress
          control={control}
          coordinates={coordinatesNewTree}
          errors={errors}
        />
        <TreePlanter
          control={control}
          errors={errors}
        />
        <ButtonsResult {...{
          reset,
          defaultValues,
          setPlantMarkerOnMap,
        }}
        />
      </form>
    </ScrollableDialog>
  );
};

export default AddTreeModal;
