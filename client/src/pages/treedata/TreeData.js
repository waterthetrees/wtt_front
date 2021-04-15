import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import cx from 'classnames';
import format from 'date-fns/format';
import './TreeData.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { getData, putData, postData } from '../../api/queries';
import AdoptLikeCheckboxes from './TreeAdoptionLike';
import TreeHeaderForm from './TreeDataEdit';
import TreeRemoval from './TreeRemoval';
import TreeHeader from './TreeHeader';
import TreeHealthSlider from './TreeHealth';

const treeImagesPath = 'assets/images/trees/';
const saveTimer = 800;

export default function TreeData({
  currentTreeId, showTree, setShowTree, map,
}) {
  // const componentName = 'TreeData';
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const toggle = () => setShowTree(!showTree);

  return (
    <Modal isOpen={showTree} className="tree__modal">
      <ModalHeader toggle={toggle} />
      <TreeContent
        currentTreeId={currentTreeId}
        map={map}
      />
      <ModalFooter />
    </Modal>
  );
}

const TreeContent = ({
  currentTreeId, map,
}) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const treeData = useQuery(['tree', { currentTreeId }], getData);
  const queryClient = useQueryClient();
  const mutateTreeData = useMutation(putData, {
    onSuccess: () => {
      queryClient.invalidateQueries('tree');
      queryClient.invalidateQueries('treemap');
    },
  });

  const mutateHistory = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treehistory');
    },
  });

  const {
    idTree,
    common,
    scientific,
    genus,
    datePlanted,
    health,
    healthNum,
    address,
    city,
    neighborhood,
    lat,
    lng,
    owner,
    idReference,
    who,
    dbh,
    height,
    country,
    zip,
    notes,
  } = treeData.data || {};

  const [editTree, setEditTree] = useState(false);
  const edit = () => {
    if (!isAuthenticated) loginWithRedirect();
    setEditTree(!editTree);
  };

  return (
    <>
      {idTree && (
        <div className="tree text-center">

          <div className="tree__header">
            {!editTree && (
              <TreeHeader
                common={common}
                scientific={scientific}
                genus={genus}
                datePlanted={datePlanted}
                dbh={dbh}
                height={height}
                edit={edit}
                idTree={idTree}
                mutateHistory={mutateHistory}

              />
            )}
            {editTree && (
              <TreeHeaderForm
                idTree={idTree}
                common={common}
                scientific={scientific}
                genus={genus}
                treeData={treeData.data}
                datePlanted={datePlanted}
                mutateTreeData={mutateTreeData}
                mutateHistory={mutateHistory}
                setEditTree={setEditTree}
              />
            )}
            <AdoptLikeCheckboxes
              idTree={idTree}
              mutateHistory={mutateHistory}
              common={common}
            />

          </div>

          <div className="tree__body">
            <TreeHealthSlider
              health={health}
              healthNum={healthNum}
              currentTreeId={currentTreeId}
              mutateTreeData={mutateTreeData}
              common={common}
              lng={lng}
              lat={lat}
              map={map}
            />

            <TreeNotes
              notes={notes}
              currentTreeId={currentTreeId}
              mutateTreeData={mutateTreeData}
            />

            <TreeCare
              currentTreeId={currentTreeId}
              common={common}
              health={health}
            />

            <TreeLocation
              address={address}
              city={city}
              zip={zip}
              country={country}
              neighborhood={neighborhood}
              lng={lng}
              lat={lat}
              owner={owner}
            />

            <TreeMoreInfo owner={owner} idReference={idReference} who={who} />

            {!common.includes('VACANT') && (
              <TreeRemoval
                idTree={idTree}
                common={common}
                notes={notes}
                mutateTreeData={mutateTreeData}
                mutateHistory={mutateHistory}
              />
            )}

          </div>

        </div>
      )}
    </>
  );
};

const TreeNotes = ({ notes, currentTreeId }) => {
  // const componentName = 'TreeNotes';
  const { isAuthenticated } = useAuth0();
  const queryClient = useQueryClient();
  const mutateTreeData = useMutation(putData, {
    onSuccess: () => {
      queryClient.invalidateQueries('tree');
    },
  });
  const [showSave, setShowSave] = useState(false);
  const [notesButtonStyle, setNotesButtonStyle] = useState('btn-light');
  const [notesSaveButton, setNotesSaveButton] = useState('SAVE');
  const notesRef = useRef();
  const handleOnChange = () => {
    if (notesRef.current.value !== notes) setShowSave(true);
  };

  const handleNotesSave = () => {
    setNotesSaveButton('SAVE');
    setNotesButtonStyle('btn-light');
    setShowSave(false);
  };

  const handleNotesSubmit = async (event) => {
    // const functionName = 'handleSubmit';
    event.preventDefault();
    try {
      if (notesRef.current.value) {
        setNotesButtonStyle('btn-info');
        setNotesSaveButton('SAVING');
        const sendData = { idTree: currentTreeId, notes: notesRef.current.value };
        await mutateTreeData.mutate(['tree', sendData]);

        setTimeout(() => handleNotesSave(), saveTimer);
      }
      return;
    } catch (err) {
      console.error('\n CATCH', err);
    }
  };

  return (
    <div className="flex-grid border-top">
      <div className="text-center treehistory-list">
        <h4>Tree Notes</h4>
      </div>
      <div className="flex-grid tree__status__note">
        {!isAuthenticated && (<h5>{ notes }</h5>)}
        {isAuthenticated && (
          <form id="treenote" onSubmit={handleNotesSubmit}>
            <textarea
              className="form-control tree__status__textarea"
              ref={notesRef}
              id="notes"
              aria-label="Tree Notes"
              defaultValue={notes}
              onChange={handleOnChange}
            />
            {showSave && (
              <div className="tree__status text-right">
                <Button
                  type="submit"
                  className={cx('btn-lg', notesButtonStyle)}
                >
                  {notesSaveButton}
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

const TreeCare = ({ currentTreeId, common, health }) => {
  // const componentName = 'TreeCare';
  const treeHistoryObj = useQuery(['treehistory', { currentTreeId }], getData);
  const treeHistory = treeHistoryObj.data;
  const queryClient = useQueryClient();
  const mutateHistory = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treehistory');
    },
  });

  return (
    <div className="treecare">
      {currentTreeId
        && mutateHistory
        && health !== 'dead'
        && health !== 'vacant'
        && health !== 'missing'
        && (
          <TreeMaintenance
            currentTreeId={currentTreeId}
            common={common}
            mutateHistory={mutateHistory}
          />
        )}

      {treeHistory && treeHistory.length > 0 && (
        <TreeHistory
          treeHistory={treeHistory}
          currentTreeId={currentTreeId}
        />
      )}
    </div>
  );
};

const makeMaintenanceString = (history) => {
  const historyArray = Object.entries(history)
    // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => value !== 'no' && value !== null)
    // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => (
      key === 'watered'
      || key === 'mulched'
      || key === 'weeded'
      || key === 'staked'
      || key === 'braced'
      || key === 'pruned'
    ))
    .map((item) => item[0]);
  if (historyArray.length === 0) return '';
  return historyArray.join(', ');
};

const TreeHistory = ({ treeHistory }) => (
  <div className="flex-grid border-top">
    {treeHistory && (
      <div className="text-center treehistory-list">
        <h4>Tree Visit History</h4>
      </div>
    )}

    {treeHistory
      && treeHistory.map((history, index) => {
        const {
          idTreehistory,
          dateVisit,
          comment,
          volunteer,
        } = history || {};
        const maintenanceString = makeMaintenanceString(history);
        const keyName = `${idTreehistory}${index}`;
        return (
          <div className="treehistory-item" key={keyName}>
            <div className="treehistory-item-label">
              {format(new Date(dateVisit), 'MMMM dd yyyy')}
              {' '}
              tree visit by
              {' '}
              {volunteer || 'volunteer'}
            </div>

            {comment && (
              <div className="">
                <span>
                  <div className="treehistory-item-label">Comment:</div>
                  {' '}
                  {comment}
                </span>
              </div>
            )}

            {maintenanceString && (
              <div className="">
                <span>
                  <div className="treehistory-item-label">Maintenance Done:</div>
                  {' '}
                  {maintenanceString}
                </span>
              </div>
            )}
          </div>
        );
      })}
  </div>
);
const TreeLocation = ({
  address, city, zip, country, neighborhood, lng, lat,
}) => (
  <div className="flex-grid border-top">
    <div className="treehistory-list text-left">
      <h4 className="text-center">Location</h4>
      {address && (
        <div>
          Address:
          {' '}
          {address}
        </div>
      )}
      {city && (
        <div>
          City:
          {' '}
          {city}
        </div>
      )}
      {zip && (
        <div>
          Zip:
          {' '}
          {zip}
        </div>
      )}
      {country && (
        <div>
          Country:
          {' '}
          {country}
        </div>
      )}
      {neighborhood && (
        <div>
          Neighborhood:
          {' '}
          {neighborhood}
        </div>
      )}
      <div>
        Lat:
        {' '}
        {lat}
      </div>
      <div>
        Lng:
        {' '}
        {lng}
      </div>
    </div>
  </div>
);

const TreeMoreInfo = ({ who, idReference, owner }) => (
  <div className="flex-grid border-top">
    <div className="treehistory-list text-left">
      <h4 className="text-center">More info</h4>
      {owner && (
        <div>
          Owner:
          {' '}
          {owner}
        </div>
      )}
      {who && (
        <div>
          Organization:
          {' '}
          {who}
        </div>
      )}
      {idReference && (
        <div>
          Reference Number:
          {' '}
          {idReference}
        </div>
      )}
      <div>Open Tree Standards:</div>
      <div>
        <a href="https://standards.opencouncildata.org/#/trees" name="opencouncildata.org trees">
          standards.opencouncildata.org/#/trees
        </a>
      </div>
    </div>
  </div>
);

const hasMaintenanceFields = (obj) => {
  const maintenanceArray = ['watered', 'weeded', 'mulched', 'staked', 'braced', 'pruned', 'comment'];
  const hasAny = maintenanceArray.some((item) => Object.prototype.hasOwnProperty.call(obj, item));
  // console.log('obj',obj,'hasAny',hasAny);
  return hasAny;
};

const TreeMaintenance = ({ currentTreeId, mutateHistory }) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [showDoMaintenance, setShowDoMaintenance] = useState(false);
  const [statusSelected, setStatusSelected] = useState({});
  const commentRef = useRef('');
  const volunteerRef = useRef(isAuthenticated ? user.name : 'Volunteer');

  const [maintenanceButtonStyle, setMaintenanceButtonStyle] = useState('btn-light');
  const [maintenanceSaveButton, setMaintenanceSaveButton] = useState('SAVE');
  const handleMaintenanceSave = () => {
    setMaintenanceSaveButton('SAVE');
    setMaintenanceButtonStyle('btn-outline-success');
  };

  const handleButtonChanges = (mBtnStyle, mBtnSave) => {
    setMaintenanceButtonStyle(mBtnStyle);
    setMaintenanceSaveButton(mBtnSave);
  };

  const handleSubmit = async (event) => {
    // const functionName = 'handleSubmit';
    event.preventDefault();
    try {
      const dateVisit = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
      const sendData = { idTree: currentTreeId, date_visit: dateVisit, ...statusSelected };

      if (commentRef.current && commentRef.current.value) {
        sendData.comment = commentRef.current.value;
      }
      if (volunteerRef.current && volunteerRef.current.value) {
        sendData.volunteer = volunteerRef.current.value;
      }
      if (hasMaintenanceFields(sendData)) {
        handleButtonChanges('btn-info', 'SAVING', 'btn-info', 'THANK YOU!');
        await mutateHistory.mutate(['treehistory', sendData]);
        setTimeout(() => handleMaintenanceSave(), saveTimer);
      }

      return;
    } catch (err) {
      console.error('CATCH err', err);
    }
  };
  const handleClickArrow = () => {
    if (!isAuthenticated) loginWithRedirect();
    setShowDoMaintenance(!showDoMaintenance);
  };
  const arrowDirection = showDoMaintenance
    ? `${treeImagesPath}angle-arrow-up-black.svg`
    : `${treeImagesPath}angle-arrow-down-black.svg`;

  return (

    <div className="flex-grid border-top treemaintenance">
      <form id="treemaintenance" onSubmit={handleSubmit}>
        <div className="treemaintenance-header text-center">
          <button
            type="button"
            className="treemaintenance-btn-header text-center"
            onClick={handleClickArrow}
          >
            Tree Maintenance
            <img
              alt="open tree maintenance"
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
                  placeholder={user.nickname}
                  defaultValue={user.nickname}
                  className="tree__status__input"
                  id="volunteerName"
                />
              </div>
            </div>

            <MaintenanceButtons
              statusSelected={statusSelected}
              setStatusSelected={setStatusSelected}
            />

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
                    Maintenance Done:
                    {' '}
                    {statusSelected.length > 0
                      ? statusSelected.join(', ')
                      : 'None Yet'}
                  </span>
                </div>
              )}
            </div>
            <div className="tree__status text-right">
              <Button
                className={cx('btn-lg', maintenanceButtonStyle)}
                type="submit"
              >
                {maintenanceSaveButton}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>

  );
};

const isEmpty = (obj) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
};

const changeYesNo = (historybutton, statusSelected) => {
  if (isEmpty(statusSelected)) return 'yes';
  if (!Object.prototype.hasOwnProperty.call(statusSelected, historybutton)) return 'yes';
  return (statusSelected[historybutton] === 'no') ? 'yes' : 'no';
};

const changeImageText = (historybutton, statusSelected) => {
  // console.log('changeImageText', historybutton, 'statusSelected', statusSelected)
  const no = {
    watered: 'water', weeded: 'weed', mulched: 'mulch', staked: 'stake', braced: 'brace', pruned: 'prune',
  };
  const yes = {
    watered: 'watered', weeded: 'weeded', mulched: 'mulched', staked: 'staked', braced: 'braced', pruned: 'pruned',
  };
  if (isEmpty(statusSelected)) return yes[historybutton];
  if (!Object.prototype.hasOwnProperty.call(statusSelected, historybutton)) {
    return yes[historybutton];
  }
  return (statusSelected[historybutton] === 'no') ? yes[historybutton] : no[historybutton];
};

const MaintenanceButtons = ({ statusSelected, setStatusSelected }) => {
  const [watered, setWater] = useState('water');
  const [weeded, setWeed] = useState('weed');
  const [mulched, setMulch] = useState('mulch');
  const [staked, setStake] = useState('stake');
  const [braced, setBrace] = useState('brace');
  const [pruned, setPrune] = useState('prune');

  const onCheckboxBtnClick = (event) => {
    event.preventDefault();
    const selected = event.target.name;

    const newImageText = changeImageText(selected, statusSelected);
    if (selected === 'watered') setWater(newImageText);
    if (selected === 'weeded') setWeed(newImageText);
    if (selected === 'mulched') setMulch(newImageText);
    if (selected === 'staked') setStake(newImageText);
    if (selected === 'braced') setBrace(newImageText);
    if (selected === 'pruned') setPrune(newImageText);

    const selectedValue = changeYesNo(selected, statusSelected);
    setStatusSelected({ ...statusSelected, ...{ [selected]: selectedValue } });
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
          <img
            alt={maintenanceButton}
            name={maintenanceButton}
            src={`assets/images/trees/${maintenanceImgTextArray[index]}.svg`}
          />
          {maintenanceImgTextArray[index]}
        </Button>
      ))}
    </div>
  );
};
