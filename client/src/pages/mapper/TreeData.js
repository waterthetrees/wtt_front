import React, { Component, useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useQuery, useMutation, queryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import cx from "classnames";
import format from 'date-fns/format';
import "./Mapper.scss";

import { getData, postData } from "../../api/queries.js";

const treeImagesPath = 'assets/images/trees/';
const saveTimer = 800;

export function TreeData({ currentTreeId, showTree, setShowTree}) {
  const componentName = 'TreeData';
  const treeData = useQuery(['tree', {currentTreeId: currentTreeId}], getData);
  const [mutateTreeData] = useMutation(postData, {onSuccess: () => {
      queryCache.invalidateQueries('tree')
    },});
  console.log(componentName, 'treeData', treeData);
  const tree = treeData.data || {};
  const {
    idTree,
    common,
    scientific,
    planted,
    health,
    healthNum,
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
  } = treeData.data || {};

  const toggle = () => setShowTree(!showTree);

  const [sliderValue, setSlider] = useState(healthNum || 100);
  const [overallHealth, setOverallHealth] = useState(health);
  const [healthSaveAlert, setHealthSaveAlert] = useState('');
  const sliderRef = useRef();
  const changeSlider = async (event) => {
    const functionName = 'changeSlider';
    try {
      const newHealth = convertSliderValuesToHealth(sliderRef.current.value);
      setOverallHealth(newHealth);
      if (newHealth !== health) {
        setHealthSaveAlert('SAVING');
        console.log('slider', 'newHealth', newHealth, 'health', health);
        const sendData = {idTree: currentTreeId, health: newHealth}
        const {data, error}  = await mutateTreeData(['tree', sendData]);
        if ( error ) setHealthSaveAlert(error);
        setTimeout(() => setHealthSaveAlert(''), saveTimer);
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
    try {
      if (notesRef.current.value) {
        setNotesButtonStyle('btn-info');
        setNotesSaveButton('SAVING');
        const sendData = {idTree: currentTreeId, notes: notesRef.current.value}
        const {data, error}  = await mutateTreeData(['tree', sendData]);
        if ( error ) {
          setNotesButtonStyle('btn-danger');
          setNotesSaveButton(error)
        };
        setTimeout(() => handleNotesSave(), saveTimer);
      }
      return;
    } catch (err) {
      console.log("\n\n\n\n ------", functionName, "err", err);
      return err;
    }
  };

  return (
    <div>
      {idTree && (
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
                  <h5>Planted: {format(new Date(planted), 'MMMM Do yyyy')}</h5>
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
                min="1"
                max="6"
                step="1"
                className="slider"
                list="healthSlider"
                id="healthSlider"
                defaultValue={sliderRef.current ? sliderRef.current.value : healthNum}
                onChange={changeSlider}
              />
              <datalist id="healthSlider">
                <option value="1" name="dead"></option>
                <option value="2" name="missing"></option>
                <option value="3" name="stump"></option>
                <option value="4" name="poor"></option>
                <option value="5" name="fair"></option>
                <option value="6" name="good"></option>
              </datalist>
              <h3>
                {health && <span id={sliderValue}>{sliderRef.current ? convertSliderValuesToHealth(sliderRef.current.value) : health}</span>}
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
                <div>Open Tree Standards:</div>
                <div>
                  <a href="https://standards.opencouncildata.org/#/trees">
                    standards.opencouncildata.org/#/trees
                  </a>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Footer/>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

const TreeCare = ({currentTreeId, common}) => {
  const componentName = 'TreeCare';
  const treeHistoryObj = useQuery(['treehistory', {currentTreeId}], getData);
  console.log(componentName, 'treeHistoryObj', treeHistoryObj);
  const treeHistory = treeHistoryObj.data; 
  console.log(componentName, 'treeHistory', treeHistory);
  const [mutateHistory] = useMutation(postData, {onSuccess: () => {
      queryCache.invalidateQueries('treehistory')
    },});

  return (
    <div className="treecare">
      {currentTreeId && mutateHistory &&  <TreeMaintenance currentTreeId={currentTreeId} common={common} mutateHistory={mutateHistory}/>}
      {treeHistory && treeHistory.length > 0 && <TreeHistory treeHistory={treeHistory} currentTreeId={currentTreeId} />}
    </div>
  )
}

const TreeHistory = ({currentTreeId, treeHistory}) => {
  const componentName = 'TreeHistory';

  return (
  <div className="flex-grid border-top">
    {treeHistory && (
      <div className="text-center treehistory-list">
        <h4>Tree Visit History</h4>
      </div>
    )}

    {treeHistory &&
      treeHistory.map((history, index) => {
        const {
          idTreehistory,
          idTree,
          dateVisit,
          comment,
          volunteer,
        } = history || {};
      const maintenanceString = makeMaintenanceString(history);
      const keyName = `${idTreehistory}${index}`;
        return (
          <div className="treehistory-item" key={keyName}>
            <div className="treehistory-item-label">
              {format(new Date(dateVisit), 'MMMM Do yyyy')} tree visit by{" "}
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
  // console.log('historyArray', historyArray);
  return historyArray.join(', ')
}

const TreeMaintenance = ({currentTreeId, common, mutateHistory}) => {

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
    console.log(functionName, 'statusSelected', statusSelected);
    try {
      const dateVisit = format(new Date(), 'yyyy/MM/DD HH:mm:ss')
      const sendData = {idTree: currentTreeId, date_visit: dateVisit, ...statusSelected};

      if (commentRef.current && commentRef.current.value) sendData['comment'] = commentRef.current.value;
      if (volunteerRef.current && volunteerRef.current.value) sendData['volunteer'] = volunteerRef.current.value;
      const okToSend = hasMaintenanceFields(sendData);
      console.log(functionName, 'sendData', sendData);
      console.log(functionName, 'okToSend', okToSend);
      if (hasMaintenanceFields(sendData)) {
        handleButtonChanges('btn-info', 'SAVING', 'btn-info', 'THANK YOU!');
        console.log(functionName, 'has new maintenance sendData', sendData);
        const {data, error} = await mutateHistory(['treehistory', sendData]);
        // console.log(functionName, 'data', data);
        if ( error ) {
          console.log(functionName, 'error', error);
          handleButtonChanges('btn-danger', error, 'btn-danger', error);
        };
        setTimeout(() => handleMaintenanceSave(), saveTimer);
      }

      return;
    } catch (err) {
      console.log("\n\n\n\n ------", functionName, "err", err);
      return err;
    }
  };

  const handleButtonChanges = (mBtnStyle, mBtnSave, wttBtnStyle, wttBtnSave) => {
    setMaintenanceButtonStyle(mBtnStyle);
    setMaintenanceSaveButton(mBtnSave);
    setWttButtonStyle(wttBtnStyle);
    setWttSaveButton(wttBtnSave);
  }
  const arrowDirection = showDoMaintenance 
        ? `${treeImagesPath}angle-arrow-up-black.svg`
        : `${treeImagesPath}angle-arrow-down-black.svg`;

  return (
    
     <div className="flex-grid border-top treemaintenance">
     <form id="treemaintenance"  onSubmit={handleSubmit}> 
              <div className="treemaintenance-header text-center">
                <button
                  type="button"
                  className="treemaintenance-btn-header text-center"
                  onClick={() => setShowDoMaintenance(!showDoMaintenance)}
                >
                  Tree Maintenance
                  <img
                    className="treemaintenance-header__img"
                    src={arrowDirection}
                  />
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
    setStatusSelected({...statusSelected, ...{[selected]: selectedValue}});

  };
  const maintenanceImgTextArray = [watered, weeded, mulched, staked, braced, pruned];
  const maintenanceButtonsArray = ['watered', 'weeded', 'mulched', 'staked', 'braced', 'pruned'];

  return (
    <div className="treemaintenance-buttons">
        {maintenanceButtonsArray.map((maintenanceButton, index) => (
          <Button
            key={maintenanceButton}
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
  console.log('convertSliderValuesToHealth value', value);
  const numValue = parseInt(value);
  if (numValue === 6) return 'good';
  if (numValue === 5) return 'fair';
  if (numValue === 4) return 'poor';
  if (numValue === 3) return 'stump';
  if (numValue === 2) return 'missing';
  if (numValue === 1) return 'dead';
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
  // console.log('obj',obj,'hasAny',hasAny); 
  return hasAny; 
}

const isEmpty = (obj) => {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

const isEmptyArray = (array) => {
  return array.length;
} 