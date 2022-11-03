import React, { useRef, useState } from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  styled,
} from '@mui/material';
import ScrollableDialog from '@/components/ScrollableDialog/ScrollableDialog';
import { maintenanceActions } from '@/util/constants';

const treeImagesPath = 'assets/images/trees/';

const ActionGroup = styled(ToggleButtonGroup)`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5px auto;
`;

const ActionButton = styled(ToggleButton)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 25%;
  padding: 5px;
  margin: 5px !important;
  border-radius: 4px !important;
  color: #fff !important;
  & {
    background-color: #999;
  }
  &:hover {
    background-color: #777;
  }
  &.Mui-selected,
  &.Mui-selected:hover {
    background-color: #545b62;
  }
`;

const MaintenanceButtons = ({ actions, setActions }) => {
  function handleChange(event, newActions) {
    setActions(newActions);
  }

  return (
    <ActionGroup value={actions} onChange={handleChange} sx={{ mb: 3 }}>
      {maintenanceActions.map(([action, pastAction]) => {
        const selected = actions.includes(pastAction);
        const label = selected ? pastAction : action;

        return (
          <ActionButton key={pastAction} value={pastAction}>
            <img src={`${treeImagesPath}${label}.svg`} alt="No-tree-path" />
            {label}
          </ActionButton>
        );
      })}
    </ActionGroup>
  );
};

export default function MaintainTreeActions({
  open,
  onConfirm,
  onCancel,
  volunteer,
}) {
  const [actions, setActions] = useState([]);
  const volunteerRef = useRef(null);
  const commentRef = useRef(null);

  const handleConfirm = () => {
    const completedActions = actions.reduce(
      (result, action) => ({ ...result, [action]: 'yes' }),
      {},
    );
    const result = {
      actions: completedActions,
      volunteer: volunteerRef.current.value,
      comment: commentRef.current.value,
    };

    onConfirm(result);
  };

  return (
    <ScrollableDialog
      title="Maintain Tree"
      open={open}
      onConfirm={handleConfirm}
      onCancel={onCancel}
      fullScreen={false}
      maxWidth="xs"
      actions={[{ cancel: 'Cancel' }, { confirm: 'Save Changes' }]}
    >
      <MaintenanceButtons actions={actions} setActions={setActions} />
      <TextField
        inputRef={volunteerRef}
        label="Volunteer"
        defaultValue={volunteer}
        variant="standard"
        fullWidth
      />
      <TextField
        inputRef={commentRef}
        label="Maintenance notes"
        variant="standard"
        multiline
        fullWidth
      />
    </ScrollableDialog>
  );
}
