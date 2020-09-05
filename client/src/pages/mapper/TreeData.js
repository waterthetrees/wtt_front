import React, { Component, useState, useRef, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import { useQuery, useMutation, queryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import {
  Button,
  ButtonToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  ButtonGroup,
  Label,
  Input,
  Col,
  Row,
  Alert
} from "reactstrap";
import moment from "moment";
import cx from "classnames";
import "./Mapper.scss";

import { getData, postData } from "../../api/queries.js";

import CustomizedSlider from "./Slider.js";

export const serializeData = (data) => {
  // console.log(data,'serializeData');
  return Object.entries(data)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join("&");
};

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.text())
    .then((body_string) => {
      console.log("body_string", body_string);
      return JSON.parse(body_string);
    });

export function TreeData({ currentTreeId, showTree, setShowTree}) {
  // console.log("TreeData", currentTreeId, currentTreeId, "showTree", showTree);
  // const URLHISTORY = `${urlTreehistory}?currentTreeId=${currentTreeId}`;
  // const { data: tree } = useSWR(URL);
  const treeData = useQuery(['tree', {currentTreeId: currentTreeId}], getData);
  const [mutateTreeData] = useMutation(postData);
  // console.log('data', data)
  // console.log('mapData', mapData);
  const {data, error, mutate} = treeData || {};
  const tree = (data) ? data : null;

  // const tree = data;
  const {
    id_tree,
    common,
    scientific,
    planted,
    health,
    address,
    city,
    country,
    neighborhood,
    lat,
    lng,
    owner,
    ref,
    who,
    notes,
    pictureurl
  } = tree || {};
  
  // const { data: treeHistory, error, mutate } = useSWR(URLHISTORY);
  // const treeDataRef = useRef(null); // DOM element to render map

  useEffect(() => {
    if (!tree) return;
  }, [tree]);

  // const [getmedal, setMedal] = useState(false);
  const [statusSlider, setStatusSlider] = useState(status);

  const convertedHealth = convertHealthToNumber(health);
  const [sliderValue, setSlider] = useState(convertedHealth || 100);
  const [overallHealth, setOverallHealth] = useState(health);

  const image =
    !tree ||
    pictureurl === "None" ||
    pictureurl === null ||
    pictureurl === undefined
      ? "icon"
      : pictureurl;
  const tree__imageclass =
    !tree || pictureurl === "None" || pictureurl === undefined
      ? "tree__icon"
      : "tree__image";


  const toggle = () => setShowTree(!showTree);


  const [healthSaveAlert, setHealthSaveAlert] = useState('');
  const sliderRef = useRef(convertedHealth);
  const changeSlider = async (event) => {
    const functionName = 'changeSlider';
    try {
      console.log('slider', sliderRef.current.value);

      const newHealth = convertSliderValuesToHealth(sliderRef.current.value);
      setOverallHealth(newHealth);
      if (newHealth !== health) {
        setHealthSaveAlert('SAVING');

        const sendData = {id_tree: currentTreeId, health: newHealth}
        const {data, error}  = await mutateTreeData(['tree', sendData]);
        if ( error ) setHealthSaveAlert(error);
        setTimeout(() => setHealthSaveAlert(''), 2000);
        // console.log(functionName, 'data', data);
      }
    } catch (err) {
      console.log(functionName, "err", err);
      return err;
    }
  };

  const [showSave, setShowSave] = useState(false);
  const [notesButtonStyle, setNotesButtonStyle] = useState('btn-light');
  const [notesSaveButton, setNotesSaveButton] = useState('SAVE');
  const notesRef = useRef();
  const handleOnChange = () => {
    console.log('notesRef.current', notesRef.current)
    if (notesRef.current.value !== notes) setShowSave(true)
  }

  const handleNotesSave = () => {
    setNotesSaveButton('SAVE');
    setNotesButtonStyle('btn-light');
    setShowSave(false)
  };
  
  const handleSubmit = async (event) => {
    const functionName = "handleSubmit";
    event.preventDefault();
    console.log(functionName, 'event.target.value', event.target.value);
    try {
      if (notesRef.current.value) {
        setNotesButtonStyle('btn-info');
        setNotesSaveButton('SAVING');
        const sendData = {id_tree: currentTreeId, notes: notesRef.current.value}
        const {data, error}  = await mutateTreeData(['tree', sendData]);
        if ( error ) {
          setNotesButtonStyle('btn-danger');
          setNotesSaveButton(error)
        };
        setTimeout(() => handleNotesSave(), 2000);
        
        // console.log(functionName, 'data', data);
      }
      return;
    } catch (err) {
      console.log("\n\n\n\n ------", functionName, "err", err);
      return err;
    }
  };

  return (
    <div>
      {id_tree && (
        <Modal isOpen={showTree} toggle={toggle} className="tree__modal">
          <ModalHeader toggle={toggle}>
            <div className="flex-grid-three text-left">
              {common && (
                <div>
                  <h3>{common}</h3>
                </div>
              )}
              {scientific && (
                <div>
                  <h4>{scientific}</h4>
                </div>
              )}
              {planted && (
                <div>
                  <h5>Planted: {moment(planted).format("MMMM Do YYYY")}</h5>
                </div>
              )}
            </div>
          </ModalHeader>

          <ModalBody>
            <div className="flex-grid tree_history-list text-center">
              <h4>Overall Health</h4>
            </div>
            <div className="tree__status text-center">
              <input
                ref={sliderRef}
                type="range"
                min="0"
                max="100"
                className="slider"
                id="myRange"
                onChange={changeSlider}
              />
              <h3>
                {health && <span id={sliderValue}>{overallHealth? overallHealth : health}</span>}
              </h3>
                {healthSaveAlert && <div className="alert alert-success" role="alert">{healthSaveAlert}</div>}
            </div>


            <div className="flex-grid border-top">
              <div className="text-center treehistory-list">
                <h4>Tree Notes</h4>
              </div>
              <div className="flex-grid tree__status__note">
                <form id="treenote" onSubmit={handleSubmit}> 
                  <textarea
                    className="form-control tree__status__textarea"
                    ref={notesRef}
                    id="notes"
                    aria-label="Tree Notes"
                    defaultValue={notes}
                    onChange={handleOnChange}
                  />
                  {showSave && <div className="tree__status text-right">
                    <Button type="submit"
                      className={cx("btn-lg", notesButtonStyle)}
                    >
                      {notesSaveButton}
                    </Button>
                  </div>}
                </form> 
              </div>
            </div>
            <TreeCare currentTreeId={currentTreeId} common={common}/>

            <div className="flex-grid border-top">
              <div className="treehistory-list text-left">
                <h4 className="text-center">Location</h4>
                <div>{address}</div>
                <div>{city}</div>
                <div>Neighborhood: {neighborhood}</div>
                <div>Lat: {lat}</div>
                <div>Lng: {lng}</div>
              </div>
            </div>

            <div className="flex-grid border-top">
              <div className="treehistory-list text-left">
                <h4 className="text-center">More info</h4>
                Open Tree Standards
                <a href="https://standards.opencouncildata.org/#/trees">
                  https://standards.opencouncildata.org/#/trees
                </a>
              </div>
            </div>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </Modal>
      )}
    </div>
  );
}

const TreeCare = ({currentTreeId, common}) => {
  const componentName = 'TreeCare';
  // console.log(componentName, 'currentTreeId', currentTreeId)
  const {data} = useQuery(['treehistory', {currentTreeId}], getData);

  const [mutateHistory] = useMutation(postData);
  // console.log('data', data);

  return (
    <div className="treecare">
      <TreeMaintenance treeHistory={data} currentTreeId={currentTreeId} common={common} mutateHistory={mutateHistory}/>
      <TreeHistory treeHistory={data} currentTreeId={currentTreeId} />
    </div>
  )
}

const TreeHistory = ({treeHistory, currentTreeId}) => {
  const componentName = 'TreeHistory';

  useEffect(() => {
    if (!treeHistory) return;
  }, [treeHistory]);
  // console.log(componentName, 'currentTreeId', currentTreeId);
  return (

  <div className="flex-grid border-top">
    {treeHistory && (
      <div className="text-center treehistory-list">
        <h4>Tree Visit History</h4>
      </div>
    )}

    {treeHistory &&
      treeHistory.map((history) => {
        const {
          id_treehistory,
          id_tree,
          datevisit,
          comment,
          volunteer,
        } = history || {};
        const maintenanceString = makeMaintenanceString(history);

        return (
          <div className="treehistory-item">
            <div className="treehistory-item-label">
              {moment(datevisit).format("MMMM Do YYYY")} tree visit by{" "}
              {volunteer || "volunteer"}
            </div>

            {comment && (
              <div className="">
                <span><div className="treehistory-item-label">Comment:</div> {comment}</span>
              </div>
            )}

            {maintenanceString && (
              <div className="">
                <span><div className="treehistory-item-label">Maintenance Done:</div> {maintenanceString}</span>
              </div>
            )}
          </div>
        );
      })}
  </div>
  )
}

const makeMaintenanceString = (history) => {
  const historyArray = Object.entries(history)
    .filter(([key, value]) => value !== 'no' && value !== null)
    .filter(([key, value]) => {
    return (
      key === 'watered' || 
      key === 'mulched' || 
      key === 'weeded' ||
      key === 'staked' ||
      key === 'braced' ||
      key === 'pruned'
    )})
    .map(item => item[0]);
  if (historyArray.length === 0) return '';
  console.log('historyArray', historyArray)
  return historyArray.join(', ')
}

const TreeMaintenance = ({treeHistory, currentTreeId, common, mutateHistory}) => {
  const {
    id_treehistory,
    watered,
    mulched,
    weeded,
    staked,
    braced,
    pruned,
    datevisit,
    comment,
    volunteer,
  } = treeHistory || {};

  const [showDoMaintenance, setShowDoMaintenance] = useState(false);
  const [statusSelected, setStatusSelected] = useState({});
  const commentRef = useRef("");
  const volunteerRef = useRef("Volunteer");

  const [maintenanceButtonStyle, setMaintenanceButtonStyle] = useState('btn-light');
  const [maintenanceSaveButton, setMaintenanceSaveButton] = useState('SAVE');
  const [wttButtonStyle, setWttButtonStyle] = useState('btn-light');
  const [wttSaveButton, setWttSaveButton] = useState('Water the Tree!');
  const handleMaintenanceSave = () => {
    setMaintenanceSaveButton('SAVE');
    setMaintenanceButtonStyle('btn-outline-success');
    setWttSaveButton('Water the Tree!');
    setWttButtonStyle('btn-outline-success');
  };

  const handleSubmit = async (event) => {
    const functionName = "handleSubmit";
    event.preventDefault();
    console.log(functionName, 'event.target.value', event.target.value, 'statusSelected', statusSelected);
    try {
      const datevisit = moment().format('YYYY/MM/DD HH:mm:ss');
      const sendData = {id_tree: currentTreeId, datevisit, ...statusSelected}
      if (commentRef.current.value) sendData['comment'] = commentRef.current.value;
      if (volunteerRef.current.value) sendData['volunteer'] = volunteerRef.current.value;
      const okToSend = hasMaintenanceFields(sendData);
      console.log('okToSend', okToSend);
      if (hasMaintenanceFields(sendData)) {
        setMaintenanceButtonStyle('btn-info');
        setMaintenanceSaveButton(`SAVING`);
        setWttButtonStyle('btn-info');
        setWttSaveButton('THANK YOU!');
        // const {data, error}  = await mutateTreeData(['treehistory', sendData]);
        console.log(functionName, 'has new maintenance sendData', sendData);
        const {data, error} = await mutateHistory(['treehistory', sendData]);
        // console.log(functionName, 'data', data);
        if ( error ) {
          console.log(functionName, 'error', error);
          setMaintenanceButtonStyle('btn-danger');
          setMaintenanceSaveButton(error);
          setWttButtonStyle('btn-danger');
          setWttSaveButton(error);
        };
        setTimeout(() => handleMaintenanceSave(), 1200);
      }

      return;
    } catch (err) {
      console.log("\n\n\n\n ------", functionName, "err", err);
      return err;
    }
  };
  
  return (
    
     <div className="flex-grid border-top treemaintenance">
     <form id="treemaintenance"  onSubmit={handleSubmit}> 
              <div className="treemaintenance-header text-center">
                <button
                  className="treemaintenance-btn-header text-center"
                  onClick={() => setShowDoMaintenance(!showDoMaintenance)}
                >
                  <h4>Tree Maintenance</h4>
                  {!showDoMaintenance && (
                  <img
                    className="treemaintenance-header__img"
                    src="assets/images/trees/angle-arrow-right-black.svg"
                  />
                )}
                {showDoMaintenance && (
                  <img
                    className="treemaintenance-header__img"
                    src="assets/images/trees/angle-arrow-down-black.svg"
                  />
                )}
                </button>

                
              </div>

              {showDoMaintenance && (
                <div className="treemaintenance">
                  <div className="flex-grid tree__status">
                    <div className="flex-grid text-center">
                      Volunteer Name:
                      <input
                        ref={volunteerRef}
                        placeholder="Volunteer"
                        className="tree__status__input"
                        id="volunteerName"
                      />
                    </div>
                  </div>

                  <MaintenanceButtons statusSelected={statusSelected} setStatusSelected={setStatusSelected} />

                  <div className="flex-grid tree__status">
                    <div className="flex-grid text-center">
                      Maintenance Comment:
                      <textarea
                        className="form-control tree__status__textarea"
                        ref={commentRef}
                        placeholder="Maintenance Comment"
                        id="comment"
                        aria-label="Tree Notes"
                      />
                    </div>

                    {statusSelected.length > 0 && (
                      <div className="flex-grid text-center">
                        <span>
                          Maintenance Done:{" "}
                          {statusSelected.length > 0
                            ? statusSelected.join(", ")
                            : "None Yet"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="tree__status text-right">
                    <Button
                      className={cx("btn-lg", maintenanceButtonStyle)}
                      type="submit"
                    >
                      {maintenanceSaveButton}
                    </Button>
                  </div>
                </div>
              )}
            </form>
            </div>

  )
}

const MaintenanceButtons = ({statusSelected, setStatusSelected}) => {
  console.log('\n\n\n\n statusSelected', statusSelected);
  const [watered, setWater] = useState('water');
  const [weeded, setWeed] = useState('weed');
  const [mulched, setMulch] = useState('mulch');
  const [staked, setStake] = useState('stake');
  const [braced, setBrace] = useState('brace');
  const [pruned, setPrune] = useState('prune');

  const onCheckboxBtnClick = (event) => {
    event.preventDefault();
    // console.log('event.target.name', event.target.name, event.target);
    // console.log('event.target.value', event.target.value);
    const selected = event.target.name;
    // console.log('selected', selected);

    const newImageText = changeImageText(selected, statusSelected);
    if (selected === 'watered') setWater(newImageText);
    if (selected === 'weeded') setWeed(newImageText);
    if (selected === 'mulched') setMulch(newImageText);
    if (selected === 'staked') setStake(newImageText);
    if (selected === 'braced') setBrace(newImageText);
    if (selected === 'pruned') setPrune(newImageText);
    

    const selectedValue = changeYesNo(selected, statusSelected);
    // console.log(selected,':', selectedValue);
    setStatusSelected({...statusSelected, ...{[selected]: selectedValue}});
    // console.log('statusSelected', statusSelected);

    // // (statusSelected.length > 0) ? setHealthy(null) : setHealthy('healthy');

  };
  const maintenanceImgTextArray = [watered, weeded, mulched, staked, braced, pruned];
  const maintenanceButtonsArray = ['watered', 'weeded', 'mulched', 'staked', 'braced', 'pruned'];

  return (
    <div className="treemaintenance-buttons">
        {maintenanceButtonsArray.map((maintenanceButton, index) => (
          <Button
            type="button"
            name={maintenanceButton}
            className="treemaintenance-btn btn-sm success text-center"
            onClick={onCheckboxBtnClick}
            active={statusSelected[maintenanceButton] === 'yes'}
          >
            <img name={maintenanceButton} src={`assets/images/trees/${maintenanceImgTextArray[index]}.svg`} />
            {maintenanceImgTextArray[index]}
          </Button>
        ))}
    </div>

  )

}

const convertSliderValuesToHealth = (value) => {
  if (value >= 80) return 'good';
  if (value >= 60 && value <= 79) return 'fair';
  if (value >= 40 && value <= 59) return 'poor';
  if (value >= 30 && value <= 39) return 'stump';
  if (value >= 20 && value <= 29) return 'missing';
  if (value <= 19) return 'dead';
}

const convertHealthToNumber = (health) => {
  const healthValue = {
    good: 100,
    fair: 70,
    poor: 50,
    stump: 30,
    missing: 20,
    dead: 0
  }[health];
  return healthValue;
}

const changeImageText = (historybutton, statusSelected) => {
  // console.log('changeImageText', historybutton, 'statusSelected', statusSelected)
  const no = {watered: 'water', weeded: 'weed', mulched: 'mulch', staked: 'stake', braced: 'brace', pruned: 'prune'}
  const yes = {watered: 'watered', weeded: 'weeded', mulched: 'mulched', staked: 'staked', braced: 'braced', pruned: 'pruned'}
  if (isEmpty(statusSelected)) return yes[historybutton];
  if (!statusSelected.hasOwnProperty(historybutton)) return yes[historybutton];
  return (statusSelected[historybutton] === 'no') ? yes[historybutton]: no[historybutton];
}

const changeYesNo = (historybutton, statusSelected) => {
   if (isEmpty(statusSelected)) return 'yes';
   if (!statusSelected.hasOwnProperty(historybutton)) return 'yes';
   return (statusSelected[historybutton] === 'no') ? 'yes': 'no';
}

const hasMaintenanceFields = (obj) => {
  const maintenanceArray = ['watered', 'weeded', 'mulched', 'staked', 'braced', 'pruned', 'comment']
  const hasAny = maintenanceArray.some(item => Object.prototype.hasOwnProperty.call(obj, item));
  console.log('obj',obj,'hasAny',hasAny); 
  return hasAny; 
}

const isEmpty = (obj) => {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}