import React, { useRef, useState } from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button
} from '@mui/material';
import { Park } from '@mui/icons-material';
import { maintenanceActions } from '@/util/constants';
import PanelDrawer from '@/components/PanelDrawer/PanelDrawer';
import './TreeMaintenanceSidebar.scss';

const treeImagesPath = 'assets/images/trees/';

const MaintenanceButtons = ({ actions, setActions }) => {
  function handleChange(event, newActions) {
    setActions(newActions);
  }

  return (
    <ToggleButtonGroup
      className="maintenance-button-group"
      value={actions}
      onChange={handleChange}
      sx={{ mb: 3 }}
    >
      {maintenanceActions.map(([action, pastAction]) => {
        const selected = actions.includes(pastAction);
        const label = selected ? pastAction : action;

        return (
          <ToggleButton
            className="maintenance-button"
            key={pastAction}
            value={pastAction}
          >
            <img src={`${treeImagesPath}${label}.svg`} alt="No-tree-path" />
            {label}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default function MaintainTreeActions({
  open,
  onConfirm,
  onCancel,
  volunteer,
  currentTreeData
}) {
  const [actions, setActions] = useState([]);
  const commentRef = useRef(null);
  const handleConfirm = () => {
    const completedActions = actions.reduce(
      (result, action) => ({ ...result, [action]: 'yes' }),
      {},
    );
    const result = {
      actions: completedActions,
      volunteer: volunteer,
      comment: commentRef.current.value,
    };

    onConfirm(result);
  };

  return (
    <div className="maintenance-sidebar-container">
      <PanelDrawer
        title='Tree Care'
        width="xs"
        open={open}
        arrowBack={true}
        subtext={currentTreeData.common}
        onClose={onCancel}
        children=""
      >
        <div className="maintenance-section">
          <h4>Tree Maintenance
            <Park className="maintenance-tree-icon" fontSize="medium" />
          </h4>
          <p>Currently out in the field looking to care for your adopted tree?
            Your tree needs water or you found pest infesting your tree? Click
            on the appropriate icon for the action served.
          </p>
          <MaintenanceButtons
            actions={actions}
            setActions={setActions}
          />
        </div>
        <div className="maintenance-section">
          <h4>Adding notes about your Tree</h4>
          <p>Currently out in the field looking to care for your adopted tree?
            Your tree needs water or you founf pest infesting your tree? Click on
            the appropriate icon for the action served.
          </p>
          <TextField
            className="maintenance-notes"
            inputRef={commentRef}
            id="outlined-textarea"
            label="Maintenance Notes"
            multiline
            variant="outlined"
          />
        </div>
        <div className="maintenanace-confirm-btns">
          <Button
            className="maintenance-cancel"
            variant="outlined"
            onClick={onCancel}> Cancel
          </Button>
          <Button
            className="maintenance-submit"
            variant="contained"
            size="large"
            color="success"
            onClick={handleConfirm}> Submit
          </Button>
        </div>
      </PanelDrawer >
    </div >
  );
}
