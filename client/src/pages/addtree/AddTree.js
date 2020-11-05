/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import mapboxgl from 'mapbox-gl';
import format from 'date-fns/format';
import './AddTree.scss';

import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { getData, postData } from '../../api/queries';

import Footer from '../../components/Footer';
import TreeHeader from './TreeHeader';
import TreeInfo from './TreeInfo';
import TreeAddress from './TreeAddress';
import TreePlanter from './TreePlanter';

import ButtonsResult from './ButtonsResult';
import { randomInteger } from './utilities';

import { TREELOCATION, TREECHARACTERISTICS } from './AddTreeFields';

const PLUS = 'assets/images/map/plus.svg';
let renderCount = 0;

// import { withAuthenticationRequired } from '@auth0/auth0-react';

export function AddTree(props) {
  const componentName = 'AddTree';
  // console.log(componentName, 'props', props)
  const { map } = Object(props);
  const {
    isAuthenticated, isLoading, error, loginWithRedirect,
  } = useAuth0();
  // console.log('isAuthenticated', isAuthenticated, 'error', error);

  const [addTree, setAddTreeSelected] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [mapDraggable, setMapDraggable] = useState(true);
  const [showAddTreeModal, setShowAddTreeModal] = useState(false);
  // const [newMarker, setMarker] = useState(null);

  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  let markerNewTree;
  // TODO set defaults depending on user location.

  renderCount += 1;

  const handleClickedNewTree = () => {
    // setShowAddTreeModal(!showAddTreeModal);
    setShowAddTreeModal(!showAddTreeModal);
    setAddTreeSelected(false);
    console.log('\n\n\nTEST showAddTreeModal', showAddTreeModal);
    // TODO figure out off click
    // map.off("click", handleClickedNewTree);
  };

  const loadNewMarker = (coordinates) => {
    const SPROUT = 'assets/images/addtree/tree12.svg';
    const sproutImg = document.createElement('img');
    sproutImg.src = SPROUT;
    const marker = new mapboxgl.Marker({
      draggable: mapDraggable,
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
    return marker;
  };

  const handleAddTreeClick = (event) => {
    console.log('\n\nevent', event);
    setClickable(false);
    setAddTreeSelected(false);

    const coordinates = event.lngLat;
    console.log('coordinatesNewTree', coordinatesNewTree, coordinates);
    const marker = loadNewMarker(coordinates);
    // setMarker(marker);
    markerNewTree = marker;
    map.off('click', handleAddTreeClick);
    map.flyTo({
      center: coordinates,
      zoom: [19],
    });

    map.on('click', handleClickedNewTree);
  };

  const handleOnClick = () => {
    // if (!isAuthenticated) loginWithRedirect();
    setClickable(true);
    setAddTreeSelected(true);
    if (markerNewTree) markerNewTree.remove();
  };

  useEffect(() => {
    if (!addTree) return;

    if (addTree && clickable) {
      map.on('click', handleAddTreeClick);
    }
  }, [addTree, clickable]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="addtree">

      <button type="button" className="addtree__btn" onClick={handleOnClick}>
        Add a Tree
      </button>

      {coordinatesNewTree
        && showAddTreeModal
        && (
          <AddTreeModal
            showAddTreeModal={showAddTreeModal}
            setShowAddTreeModal={setShowAddTreeModal}
            renderCount={renderCount}
            coordinatesNewTree={coordinatesNewTree}
          />
        )}
    </div>
  );
}

const AddTreeModal = ({
  showAddTreeModal, setShowAddTreeModal, renderCount, coordinatesNewTree,
}) => {
  const {
    user, isAuthenticated, isLoading, error,
  } = useAuth0();
  const { nickname, email } = Object(user);
  console.log('isAuthenticated', isAuthenticated, 'error', error);
  const defaultValues = {
    common: '',
    scientific: '',
    genus: '',
    datePlanted: format(new Date(), 'yyyy-MM-dd'),
    dbh: '',
    age: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    neighborhood: '',
    lat: (coordinatesNewTree) ? coordinatesNewTree.lat : '',
    lng: (coordinatesNewTree) ? coordinatesNewTree.lng : '',
    owner: 'public',
    public: true,
    organization: '',
    volunteer: nickname || 'volunteer',
    notes: '',
    health: 'good',
    email: email || '',
    ref: `WTT${format(new Date(), 'yyyyMMdd')}${randomInteger(1000000, 9999999)}`,
  };
  const {
    handleSubmit, reset, control, errors,
  } = useForm({ defaultValues });
  const [data, setData] = useState(null);

  const [mutateTreeData] = useMutation(postData, {
    onSuccess: () => {
      queryCache.invalidateQueries('treemap');
    },
  });

  const onSubmit = (data, e) => {
    // console.log('\n\n\n\ndata', data);
    const sendData = { ...defaultValues, ...data, ...coordinatesNewTree };
    console.log('\n\n\n\nsendData', sendData);
    mutateTreeData(['tree', sendData]);
  };

  const onError = (errors, e) => console.log('errors, e', errors, e);

  return (
    <Modal isOpen={showAddTreeModal}>
      <ModalHeader toggle={() => setShowAddTreeModal(!showAddTreeModal)}>
        <TreeHeader renderCount={renderCount} />
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="form">
          <TreeInfo control={control} coordinates={coordinatesNewTree} errors={errors} />
          <TreeAddress control={control} coordinates={coordinatesNewTree} errors={errors} />
          <TreePlanter control={control} errors={errors} />
          <ButtonsResult {...{ data, reset, defaultValues }} />
        </form>
      </ModalBody>

      <ModalFooter>
        <Footer />
      </ModalFooter>
    </Modal>
  );
};

const getInputConstraints = (keyName) => {
  const fields = {
    address: { required: true, minLength: 3, maxLength: 100 },
    city: { required: true, minLength: 2, maxLength: 100 },
    state: { required: true, minLength: 2, maxLength: 40 },
    zip: {
      required: false, minLength: 5, maxLength: 10, pattern: /^\d{5}(?:[-\s]\d{4})?$/i,
    },
    neighborhood: { required: false, minLength: 2, maxLength: 50 },
    datePlanted: { required: true },
    lng: { required: true },
    lat: { required: true },
  }[keyName];
  return fields;
};
// export default AddTree;

// export default withAuthenticationRequired(AddTreeData, {
//   // Show a message while the user waits to be redirected to the login page.
//   onRedirecting: () => (<div>Redirecting you to the login page...</div>)
// });
