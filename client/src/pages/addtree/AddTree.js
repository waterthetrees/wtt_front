/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import mapboxgl from 'mapbox-gl';
import format from 'date-fns/format';
import cx from 'classnames';
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
import { randomInteger } from './utilities';

let renderCount = 0;
const currentMarkers = [];

function AddTree(props) {
  const componentName = 'AddTree';
  renderCount += 1;
  const {
    map, setZoom,
    coordinatesNewTree,
    setCoordinatesNewTree,
  } = Object(props);
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [addTreeSelected, setAddTreeSelected] = useState(null);

  const handleOnClick = () => {
    if (!isAuthenticated) loginWithRedirect();

    if (!addTreeSelected) {
      setAddTreeSelected(true);
    } else {
      setAddTreeSelected(false);
    }
  };

  useEffect(() => {
    if (!addTreeSelected) {
      if (currentMarkers !== null) {
        currentMarkers.map((currentMarker) => currentMarker.remove());
      }
    }
  }, [addTreeSelected]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  const ADDATREEPLUS = (addTreeSelected)
    ? 'assets/images/addtree/plus1.svg'
    : 'assets/images/addtree/plus2.svg';

  const ADDTREEPLUSCLASS = (addTreeSelected)
    ? 'addtree__btn-selected'
    : '';
  return (
    <div>
      <button type="button" className={cx('addtree__btn', ADDTREEPLUSCLASS)} onClick={handleOnClick}>
        <img className="addree__plus" src={ADDATREEPLUS} alt="ADD A TREE" />
        <div className="addree__plus-centeredtxt">Add a Tree</div>
      </button>

      <TreeMarker
        map={map}
        setAddTreeSelected={setAddTreeSelected}
        addTreeSelected={addTreeSelected}
        setZoom={setZoom}
        coordinatesNewTree={coordinatesNewTree}
        setCoordinatesNewTree={setCoordinatesNewTree}
      />

    </div>
  );
}

const TreeMarker = ({
  map, addTreeSelected, setAddTreeSelected,
  setZoom, coordinatesNewTree, setCoordinatesNewTree,
}) => {
  const [showAddTreeModal, setShowAddTreeModal] = useState(false);
  const handleMarkerClick = () => {
    setShowAddTreeModal(true);
  };

  const loadNewMarker = (coordinates) => {
    const SPROUT = 'assets/images/addtree/tree12.svg';
    const sproutImg = document.createElement('img');
    sproutImg.src = SPROUT;
    const marker = new mapboxgl.Marker({
      draggable: true,
      color: '#000000',
      scale: 0.05,
      element: sproutImg,
    })
      .setLngLat(coordinates)
      .addTo(map);

    setCoordinatesNewTree(coordinates);
    function onDragEndd() {
      const lngLat = marker.getLngLat();
      setCoordinatesNewTree(lngLat);
    }

    marker.on('dragend', onDragEndd);
    currentMarkers.push(marker);
    marker.getElement().addEventListener('click', handleMarkerClick);
    return marker;
  };

  const handleMapClick = (event) => {
    const coordinates = event.lngLat;
    loadNewMarker(coordinates);

    map.off('click', handleMapClick);
    setZoom(19);
    map.flyTo({
      center: coordinates,
      zoom: [19],
    });
  };

  useEffect(() => {
    if (!addTreeSelected) return;

    if (addTreeSelected) {
      map.on('click', handleMapClick);
    } else {
      map.off('click', handleMapClick);
    }
  }, [addTreeSelected]);

  return (
    <div>
      {coordinatesNewTree
        && showAddTreeModal
        && (
          <AddTreeModal
            showAddTreeModal={showAddTreeModal}
            setShowAddTreeModal={setShowAddTreeModal}
            renderCount={renderCount}
            coordinatesNewTree={coordinatesNewTree}
            setAddTreeSelected={setAddTreeSelected}
          />
        )}
    </div>
  );
};

const AddTreeModal = ({
  showAddTreeModal,
  setShowAddTreeModal,
  coordinatesNewTree,
  setAddTreeSelected,
}) => {
  const {
    user, isAuthenticated, error,
  } = useAuth0();
  const { nickname, email, name } = Object(user);

  const [notesSaveButton, setNotesSaveButton] = useState('SAVE');
  const defaultValues = {
    common: '',
    scientific: '',
    genus: '',
    datePlanted: format(new Date(), 'yyyy-MM-dd'),
    dbh: '',
    height: '',
    address: '',
    city: '',
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
    handleSubmit, reset, control, errors,
  } = useForm({ defaultValues });
  const [data, setData] = useState(null);
  const queryClient = useQueryClient();
  const mutateTreeData = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('tree');
      queryClient.invalidateQueries('treemap');
    },
  });

  const onSubmit = (data, e) => {
    const sendData = { ...defaultValues, ...data, ...coordinatesNewTree };
    console.log('\n\n\n\n\nsendData', sendData);
    mutateTreeData.mutate(['tree', sendData]);
    setNotesSaveButton('SAVING');
    setShowAddTreeModal(!showAddTreeModal);
  };

  const onError = (errors, e) => console.log('errors, e', errors, e);
  return (
    <Modal isOpen={showAddTreeModal}>
      <ModalHeader toggle={() => setShowAddTreeModal(!showAddTreeModal)} />
      <div className="addtree">
        <div className="addtree__header">
          <TreeHeader renderCount={renderCount} />
        </div>
        <div className="addtree__body">
          <form onSubmit={handleSubmit(onSubmit, onError)} className="form">
            <TreeInfo control={control} coordinates={coordinatesNewTree} errors={errors} />
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

export default AddTree;
