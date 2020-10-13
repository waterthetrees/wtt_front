import React, { Component, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";
import moment from "moment";
import cx from "classnames";
import { getTreeListMapMap } from "../../actions/index.js";

import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function TreeAdd({ latlng, handleSubmit, modal, toggle }) {
  const component_name = "AddTree";
  const [addTreeType, setTreeAddTypeSelected] = useState();
  const [rSelected, setRSelected] = useState(null);

  // const handleSubmit = (event) => {
  //   // event.preventDefault();
  //   //console.log(event.target.name);
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  // }
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      // const response = await dispatch(getTreeListMap({}));
    }
    fetchData();
  }, []);

  // const treeList = useSelector((state) => state.treeList);
  //console.log(component_name, 'treeList', treeList, 'tictoc');

  const [addTree, setAddTreeSelected] = useState(null);

  const handleAddTree = (event, selected) => {
    console.log('marker onclicked', marker);
    addTree === "addTree"
      ? setAddTreeSelected(null)
      : setAddTreeSelected("addTree");
    addTree || addTree === "addTree"
      ? setMapDraggable(true)
      : setMapDraggable(false);

    const coordinates = document.getElementById('coordinates');

    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat(coordinates)
      .addTo(mapboxElRef.current); // add the marker to the map

    marker.on('dragend', onDragEnd);
  };


  const onDragEnd = () => {
    const lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML =
      'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
  }



  const handleClickedMap = (event) => {
    const functionName = "handleClickedMap";
    let lat = event.lat;
    let lng = event.lng;
    setLatLng([lat, lng]);
  };

  return (
    <>
      <div className="treeadd"
      >
        <img
          key="treeAddOpener"
          className="treeadd__icon"
          onClick={() => {
            setShowAboutUsModal(!showTreeAddModal);
          }}
          src={PLUS_ICON}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <FormControl
            component="fieldset"
            className="flex-grid-third tree__type"
          >
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <div className="text-center">
                <FormControlLabel
                  control={
                    <img
                      name="addWater"
                      src="assets/images/map/planttree.svg"
                    />
                  }
                  value="planttree"
                  labelPlacement="bottom"
                  inputProps={{ "aria-label": "Plant" }}
                  className="tree__type-btn"
                  onClick={() => setTreeAddTypeSelected("planttree")}
                  active={addTreeType === "planttree"}
                />
                <label className="tree__add-label">Plant Tree</label>
              </div>
              <div className="text-center">
                <FormControlLabel
                  value="idtree"
                  control={<img src="assets/images/map/idtree.svg" />}
                  // label="ID"
                  labelPlacement="bottom"
                  className="tree__type-btn"
                  inputProps={{ "aria-label": "ID" }}
                  onClick={() => setTreeAddTypeSelected("idtree")}
                  active={addTreeType === "idtree"}
                />
                <label className="tree__add-label">ID Tree</label>
              </div>
              <div className="text-center">
                <FormControlLabel
                  value="ghost"
                  control={<img src="assets/images/map/tree_ghost.svg" />}
                  // label="Vacant Site"
                  labelPlacement="bottom"
                  className="tree__type-btn"
                  inputProps={{ "aria-label": "Vacant Site" }}
                  onClick={() => setTreeAddTypeSelected("ghost")}
                  active={addTreeType === "ghost"}
                />
                <label className="tree__add-label">Vacant Site</label>
              </div>
            </RadioGroup>
          </FormControl>
        </ModalHeader>

        <ModalBody>
          <div className="row tree__type">
            <div className="col">
              {(addTreeType === "ghost" ||
                addTreeType === "tagtree" ||
                addTreeType === "plant") && (
                  <div className="Row">
                    <div className="col text-center tree__add-label">
                      {addTreeType === "ghost" && (
                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          defaultValue="top"
                        >
                          <FormControlLabel
                            value="requestStreetTree"
                            control={<Radio color="primary" />}
                            label="Public Tree"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                            value="planYard"
                            control={<Radio color="primary" />}
                            label="Yard Tree"
                            labelPlacement="bottom"
                          />
                        </RadioGroup>
                      )}
                    </div>

                    <div className="col text-center">
                      <EnterTreeInfo addTreeType={addTreeType} />
                    </div>
                  </div>
                )}
            </div>
            <div className="col-12">
              <div className="col-12">
                <h5>New Tree Location: </h5>
              </div>
              <div className="col-12">
                <label className="tree__add-label">lat: {latlng[0]}</label>
                <label className="tree__add-label">lng: {latlng[1]}</label>
              </div>
              <EnterAddress latlng={latlng} />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" type="submit">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  </>
  );
}
const TreeCharacteristicsData = {
  age: [
    "0-1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "15-20",
    "20-30",
    "30-40",
    "40-50",
    "50-60",
    "60-69",
    "70-79",
    "80-89",
    "90-99",
    "100",
    "120",
    "130",
    "150",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
  ],
  width: [
    "<1 inch",
    "2 inch",
    "3 inch",
    "4 inch",
    "5 inch",
    "6 inch",
    "7 inch",
    "8 inch",
    "9 inch",
  ],
};

function EnterTreeInfo({ addTreeType }) {
  return (
    <div className="text-left">
      <header>Tree Info</header>
      <div>
        <TreeInput
          treeKey={"CommonName"}
          treeValue={"Maple"}
          treeDataType={top100Trees}
        />
      </div>
      <div>
        <TreeInput
          treeKey={"BotanicalName"}
          treeValue={"Acer Rebrum"}
          treeDataType={top100Trees}
        />
      </div>
      <div>
        <TreeInput
          treeKey={"Cultivar"}
          treeValue={"Eureka"}
          treeDataType={top100Trees}
        />
      </div>
      <div>
        <TreeCharacteristics
          treeKey={"width"}
          treeValue={`5"`}
          treeDataType={TreeCharacteristicsData.width}
        />
        <TreeCharacteristics
          treeKey={"age"}
          treeValue={"3"}
          treeDataType={TreeCharacteristicsData.age}
        />
      </div>
      {addTreeType === "plant" && (
        <div>
          <label>Date Planted: </label>
          <input
            name="datePlanted"
            className="border-bottom"
            placeholder="2020-04-29"
          />
        </div>
      )}
    </div>
  );
}

function TreeInput({ treeKey, treeValue, treeDataType }) {
  //console.log('treeKey', treeKey, 'treeValue', treeValue)
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: { [treeKey]: treeValue },
  });
  React.useEffect(() => register({ name: treeKey }));
  const onSubmit = (data) => {
    //console.log(data);
  };
  return (
    <form className="border-bottom" onSubmit={handleSubmit(onSubmit)}>
      <Autocomplete
        options={treeDataType}
        getOptionLabel={(option) => option[treeKey]}
        defaultValue={treeDataType.find(
          (tree) => tree[treeKey] === getValues()[treeKey]
        )}
        onChange={(e, data) => {
          setValue(treeKey, data[treeKey]);
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              inputRef={register}
              label={treeKey}
              variant="filled"
              name={treeKey}
              defaultValue={treeValue}
              fullWidth
              value={params}
            />
          );
        }}
      />
    </form>
  );
}

function TreeCharacteristics({ treeKey, treeValue, treeDataType }) {
  //console.log('treeKey', treeKey, 'treeValue', treeValue, treeDataType, treeDataType)
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "1",
    width: '.5"',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel htmlFor="filled-age-native-simple">{treeKey}</InputLabel>
      <Select
        native
        value={state[treeKey]}
        onChange={handleChange}
        inputProps={{
          name: treeKey,
          id: treeKey,
        }}
      >
        {treeDataType &&
          treeDataType.map((optionValue, index) => {
            //console.log('optionValue', optionValue);
            if (index === 0) {
              return <TreeOptionsSelector />;
            } else {
              return (
                <TreeOptionsSelector
                  optionValue={optionValue}
                  optionLabel={optionValue}
                />
              );
            }
          })}
      </Select>
    </FormControl>
  );
}

function TreeOptionsSelector({ optionValue, optionLabel }) {
  return <option value={optionValue}>{optionLabel}</option>;
}

function EnterAddress({ latlng }) {
  return (
    <div className="border-bottom text-left">
      <header>Address</header>
      <label className="text-left">Street Address: </label>
      <input name="Street Address" placeholder="Street Address" />
      <label className="text-left">City: </label>
      <input name="TreeCity" placeholder="City" />
      <label className="text-left">State: </label>
      <input name="TreeState" placeholder="State" />
      <label className="text-left">Country: </label>
      <input name="TreeCountry" placeholder="Country" />
      <label className="text-left">Zip: </label>
      <input name="TreeZip" placeholder="Zip" />
    </div>
  );
}

function treeProgress(tree, today) {
  const dateWateredFormatted = moment(tree.dateWatered).format(
    "MMM Do YYYY - ha"
  );
  const daysSinceLastWatered = moment(today).diff(tree.dateWatered, "days");
  const progressNumber =
    daysSinceLastWatered < 7
      ? 100
      : daysSinceLastWatered >= 7 && daysSinceLastWatered < 14
        ? 80
        : daysSinceLastWatered >= 14 && daysSinceLastWatered < 21
          ? 60
          : daysSinceLastWatered >= 21 && daysSinceLastWatered < 28
            ? 40
            : daysSinceLastWatered >= 28 && daysSinceLastWatered < 35
              ? 20
              : 0;
  return { progressNumber, dateWateredFormatted };
}
