import React, { Component, useState, useRef, useEffect } from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import { getData, postData } from "../../api/queries.js";
import {

  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import mapboxgl from "mapbox-gl";
import moment from "moment";
import cx from "classnames";
import ReactDOM from "react-dom";
import Widget from '../../components/Widget'
// import TreeAddress from './Address'
import "./AddTree.scss";

const PLUS = "assets/images/map/plus.svg";
const ADDATREE = "assets/images/logos/addatree.svg";
const ADDATREEFACE = "assets/images/logos/addatreeface.svg";
const TREETITLEIMAGE = "assets/images/addtree/tree16.svg";
const TREETITLEIMAGE2 = "assets/images/addtree/tree18.svg";
const TREEBODYIMAGE = "assets/images/addtree/ageface.svg";
const EARTH = "assets/images/addtree/earth2.svg";
import { TREELOCATION, TREECHARACTERISTICS } from './AddTreeFields.js'
console.log(TREELOCATION, TREECHARACTERISTICS)

import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  Input,
  InputLabel,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  NativeSelect
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export const AddTree = (props) => {
  const componentName = "AddTree";
  // console.log(componentName, 'props', props)
  const { map, } = Object(props);

  const [addTree, setAddTreeSelected] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [mapDraggable, setMapDraggable] = useState(true);
  const [showAddTreeModal, setShowAddTreeModal] = useState(false);
  const [newMarker, setMarker] = useState(null);
  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);

  const handleAddTreeClick = (event) => {
    // console.log('event', event.target.id, )

    addTree ? setMapDraggable(true) : setMapDraggable(false);

    if (addTree && clickable) {
      map.once('click', handleMapClickHandler);
    }
    map.off('click', handleMapClickHandler);

    // if (!addTree || !clickable) {

    // }
    // map.off('mousemove', onMove);
    // map.off('touchmove', onMove);

  }

  const handleMapClickHandler = (event) => {
    console.log('event', event,)
    setClickable(false);
    setAddTreeSelected(false);
    const coordinates = event.lngLat;
    const marker = loadNewMarker(coordinates);

    setMarker(marker);
    setCoordinatesNewTree(coordinates);
    map.off('click', handleMapClickHandler);

    map.flyTo({
      center: coordinates,
      zoom: [19]
    });

    map.on("click", handleClickedNewTree);
  }

  const loadNewMarker = (coordinates) => {
    const SPROUT = "assets/images/addtree/tree12.svg";
    const sproutImg = document.createElement('img');
    sproutImg.src = SPROUT;
    const marker = new mapboxgl.Marker({
      draggable: mapDraggable,
      color: '#000000',
      scale: .05,
      element: sproutImg,
    })
      .setLngLat(coordinates)
      .addTo(map);


    return marker;
  }


  const handleClickedNewTree = (event) => {
    setShowAddTreeModal(true);
    //TODO - save tree info and build out modal
    // TODO figure out off click
    // map.off("click", handleClickedNewTree);
  }

  useEffect(() => {
    if (!addTree) return;
    if (addTree && clickable) {
      map.on('click', handleMapClickHandler);
    }
    if (newMarker) {
      // console.log(  'newMarker', newMarker, );
      // map.on('mousemove', function (e) {
      //   document.getElementById('info').innerHTML =
      //   // e.point is the x, y coordinates of the mousemove event relative
      //   // to the top-left corner of the map
      //   JSON.stringify(e.point) +
      //   '<br />' +
      //   // e.lngLat is the longitude, latitude geographical position of the event
      //   JSON.stringify(e.lngLat.wrap());
      // })
      newMarker.on('mousemove', (e, coordinates) => {
        console.log('e.lngLat', e.lngLat);
        // map.setView(coordinates, zoom=18);
      })
      newMarker.on('click', (e, coordinates) => {
        console.log('e.lngLat', e.lngLat);
        map.setView(coordinates, zoom = 18);
      });
    }

  }, [addTree, clickable, newMarker]);


  const [addTreeType, setTreeAddTypeSelected] = useState();
  const [rSelected, setRSelected] = useState(null);


  return (
    <div className="addtree">
      <img
        id="addtree"
        key="AddTreeButton"
        className="addtree__icon"
        onClick={(event) => { setClickable(true); setAddTreeSelected(!addTree); }}
        src={PLUS}
      />

      {coordinatesNewTree && (<div>
        <Modal isOpen={showAddTreeModal} toggle={() => setShowAddTreeModal(!showAddTreeModal)}>
          <ModalHeader toggle={() => setShowAddTreeModal(!showAddTreeModal)}>
            <img
              className="addtreemodal__header-image"
              src={EARTH}
            />
            <img
              className="addtreemodal__header-logo"
              src={ADDATREE}
            />
            <img
              className="addtreemodal__header-image"
              src={TREETITLEIMAGE}
            />

          </ModalHeader>

          <ModalBody>
            <form>
              <Widget title={'Tree Info'} classes={'treeinfo'} >
                <TreeInfo addTreeType={addTreeType} coordinates={coordinatesNewTree} />
                <Button type="submit" className={cx("btn-lg")}>
                  Save
              </Button>
              </Widget>

              <Widget title={'Tree Location'} classes={'treelocation'} >
                <TreeAddress lat={coordinatesNewTree.lat} lng={coordinatesNewTree.lng} />
                <Button type="submit" className={cx("btn-lg")}>
                  Save
              </Button>
              </Widget>

              <Widget title={'Tree Planter'} classes={'treeplanter'} >
                <TreePlanter />
                <Button type="submit" className={cx("btn-lg")}>
                  Save
              </Button>
              </Widget>
            </form>
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>)}
    </div>
  );
};

const TreeAddress = ({ lat, lng }) => {
  return (
    <div className="treeaddress">
      <div className="treeaddress__address">
        <GeneralInputs
          keyName={'address'}
          keyValue={''}
          labelName={'Address:'}
          typeName={'text'}
          placeholderName={''}
          propsTextField={{ readOnly: false }}
        />
        <GeneralInputs
          keyName={'city'}
          keyValue={'Oakland'}
          labelName={'City:'}
          typeName={'text'}
          placeholderName={'Oakland'}
          propsTextField={{ readOnly: false }}
        />
        <GeneralDropDowns
          keyName={"state"}
          keyValue={"CA"}
          dataType={TREELOCATION.state}
        />
        <GeneralInputs
          keyName={'zip'}
          keyValue={''}
          labelName={'Zipcode:'}
          typeName={'text'}
          placeholderName={''}
          propsTextField={{ readOnly: false }}
        />
        <GeneralInputs
          keyName={'neighborhood'}
          keyValue={''}
          labelName={'Neighborhood:'}
          typeName={'text'}
          placeholderName={''}
          propsTextField={{ readOnly: false }}
        />
      </div>

      <div className="treeaddress__coordinates">
        <GeneralInputs
          keyName={'lng'}
          keyValue={`${lng}`}
          labelName={'Longitude:'}
          typeName={'number'}
          placeholderName={`${lng}`}
          propsTextField={{ readOnly: true }}
        />
        <GeneralInputs
          keyName={'lat'}
          keyValue={`${lat}`}
          labelName={'Latitude:'}
          typeName={'number'}
          placeholderName={`${lat}`}
          propsTextField={{ readOnly: true }}
        />
      </div>
    </div>
  )
}

const TreePlanter = () => {
  return (
    <div>
      <TreeOwner />
      <TreeOrg />
    </div>
  );
}

const TreeOwner = () => (
  <RadioGroup
    row
    aria-label="position"
    name="position"
    defaultValue="top"
  >
    <FormControlLabel
      value="public"
      control={<Radio color="primary" />}
      label="Public Land"
      labelPlacement="end"
    />
    <FormControlLabel
      value="private"
      control={<Radio color="primary" />}
      label="Private Land"
      labelPlacement="end"
    />
  </RadioGroup>
)

const TreeOrg = () => (
  <div className="treeorg">
    <GeneralInputs
      keyName={'Organization'}
      keyValue={'Sierra Club'}
      labelName={'Organization:'}
      typeName={'string'}
      placeholderName={'Sierra Club'}
      propsTextField={{ readOnly: false }}
    />
    <GeneralInputs
      keyName={'volunteer'}
      keyValue={'volunteer'}
      labelName={'Planted By:'}
      typeName={'string'}
      placeholderName={'volunteer'}
      propsTextField={{ readOnly: false }}
    />
    <GeneralInputs
      keyName={'ref'}
      keyValue={''}
      labelName={'Reference ID:'}
      typeName={'string'}
      placeholderName={''}
      propsTextField={{ readOnly: false }}
    />
  </div>
)


function TreeInfo({ addTreeType, coordinates }) {
  const componentName = 'TreeInfo';
  // TODO get circle of 100 most popular trees from area
  const treelist = useQuery(['treelist', { coordinates }], getData);
  const treemap = useQuery(["treemap", { city: "Oakland" }], getData);
  const [mutateTreelist] = useMutation(postData, {
    onSuccess: () => {
      queryCache.invalidateQueries('treelist')
    },
  });
  // console.log(componentName, 'treelist', treelist);
  const topTrees = treelist.data || {};
  // console.log(componentName, 'topTrees', topTrees);
  return (
    <div className="treeinfo__content">
      {topTrees && (<div className="treename">
        <TreeInput
          keyName={"common"}
          keyValue={"Red Maple"}
          treeList={topTrees}
        />

        <TreeInput
          keyName={"scientific"}
          keyValue={"Acer Rubrum"}
          treeList={topTrees}
        />

        <TreeInput
          keyName={"genus"}
          keyValue={"Eureka"}
          treeList={topTrees}
        />
      </div>)}
      <div className="treeinfo-left">
        <GeneralInputs
          keyName={"datePlanted"}
          keyValue={moment().format('YYYY-MM-DD')}
          labelName={"Date Planted:"}
          typeName={"date"}
          placeholderName={moment().format('YYYY-MM-DD')}
        />
      </div>
      <div className="treecharacteristics">

        <div className="left">
          <GeneralDropDowns
            keyName={"width"}
            keyValue={""}
            dataType={TREECHARACTERISTICS.width}
          />
          <GeneralDropDowns
            keyName={"age"}
            keyValue={""}
            dataType={TREECHARACTERISTICS.age}
          />
        </div>
      </div>
    </div>
  );
}

const getInputConstraints = (keyName) => {
  const fields = {
    address: { required: true, minLength: 3, maxLength: 100 },
    city: { required: true, minLength: 2, maxLength: 100 },
    state: { required: true, minLength: 2, maxLength: 40 },
    zip: { required: false, minLength: 5, maxLength: 10, pattern: /^\d{5}(?:[-\s]\d{4})?$/i },
    neighborhood: { required: false, minLength: 2, maxLength: 50 },
    datePlanted: { required: true },
    lng: { required: true },
    lat: { required: true }
  }[keyName];
  return fields;
}

const GeneralInputs = ({ keyName, keyValue, labelName, typeName, placeholderName, propsTextField }) => {
  const componentName = 'GeneralInputs';
  const inputConstraints = getInputConstraints(keyName);

  const { register, handleSubmit, setValue, getValues, error } = useForm({
    defaultValues: { [keyName]: keyValue },
    // mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  useEffect(() => register({ name: keyName }));
  console.log('error', error);
  const errorMessage = error;
  const errorToggle = error ? true : false;

  return (

    <TextField
      type={typeName}
      placeholder={placeholderName}
      inputRef={register(inputConstraints)}
      label={labelName}
      variant="standard"
      name={keyName}
      fullWidth
      error={errorToggle}
      InputProps={propsTextField}
      helperText={error && error[keyName] ? error[keyName] : ''}
      size="small"
    />

  );
}

function TreeInput({ keyName, keyValue, treeList }) {
  // console.log('keyName', keyName, 'keyValue', keyValue)
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: { [keyName]: keyValue },
  });

  useEffect(() => register({ name: keyName }));
  const onSubmit = (data) => {
    //console.log(data);
  };

  // <Autocomplete
  //       id="keyName"
  //       freeSolo
  //       getOptionLabel={(option) => option[keyName]}
  //       options={treeList.map((option) => option[keyName])}
  //       renderInput={(params) => (
  //         <TextField {...params}
  //           inputRef={register}
  //           label={keyName}
  //           variant="standard"
  //           name={keyName}
  //           placeholder={keyValue}
  //           fullWidth
  //           value={params}
  //           size="small"
  //         />
  //       )}
  //     />

  return (
    <form className="border-bottom" onSubmit={handleSubmit(onSubmit)}>
      <Autocomplete
        freeSolo
        options={treeList}
        getOptionLabel={(option) => option[keyName]}

        renderInput={(params) => {
          return (
            <TextField
              {...params}
              inputRef={register}
              label={keyName}
              variant="standard"
              name={keyName}
              placeholder={keyValue}
              fullWidth
              value={params}
              size="small"
            />
          );
        }}
      />



    </form>
  );
}

export const GeneralDropDowns = ({ keyName, keyValue, dataType, propsTextField }) => {
  const componentName = 'GeneralDropDowns';
  //console.log('keyName', keyName, 'keyValue', keyValue, dataType, dataType)
  const classes = useStyles();

  const inputConstraints = getInputConstraints(keyName);
  const { register, handleSubmit, setValue, getValues, error } = useForm({
    defaultValues: { [keyName]: keyValue },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  useEffect(() => register({ name: keyName }));
  // const [state, setState] = React.useState({
  //   age: '1',
  //   width: '.5"',
  //   state: 'CA'
  // });

  const handleChange = (event) => {
    const name = event.target.name;
    // setState({
    //   ...state,
    //   [name]: event.target.value,
    // });
  };
  console.log(componentName, 'error', error);
  return (
    <FormControl variant="standard" className={classes.formControl}>
      <InputLabel htmlFor="standard-age-native-simple">{keyName}</InputLabel>
      <Select
        native
        placeholder={keyValue}
        inputRef={register(inputConstraints)}
        onChange={handleChange}
        inputProps={{ name: keyName, id: keyName }}
        inputRef={register}
        size="small"
      >
        {dataType &&
          dataType.map((options, index) => {
            //console.log('optionValue', optionValue);
            if (index === 0) {
              return <OptionsSelector />;
            } else {
              return (
                <OptionsSelector
                  optionValue={options.optionValue}
                  optionLabel={options.optionLabel}
                />
              );
            }
          })}
      </Select>
      {error && <Alert >error</Alert>}
    </FormControl>
  );
}

function OptionsSelector({ optionValue, optionLabel }) {
  return <option value={optionValue}>{optionLabel}</option>;
}