import React, { useRef, useState } from 'react';
import { ToggleButtonGroup, ToggleButton, styled } from '@mui/material';
import { format } from 'date-fns';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useTreeHistoryMutation,
  useCreateTreeDataMutation,
} from '@/api/queries';

const treeImagesPath = 'assets/images/trees/';

const ActionGroup = styled(ToggleButtonGroup)`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 0 5px 0;
  &.Mui-root {
    margin-bottom: 0;
  }
  &.MuiToggleButtonGroup-root {
    margin-bottom: 0;
  }
`;

const ActionButton = styled(ToggleButton)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 25%;
  padding: 0;
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

export const maintenanceActions = [
  ['water', 'watered'],
  ['weed', 'weeded'],
  ['mulch', 'mulched'],
  ['stake', 'staked'],
  ['brace', 'braced'],
  ['prune', 'pruned'],
];

const MaintenanceButtons = ({ actions, setActions }) => {
  const handleChange = (event, newActions) => {
    setActions(newActions);
  };

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

// TODO change to Boolean
const maintenanceResults = {
  water: 'no',
  watered: 'yes',
  weed: 'no',
  weeded: 'yes',
  mulch: 'no',
  mulched: 'yes',
  stake: 'no',
  staked: 'yes',
  brace: 'no',
  braced: 'yes',
  prune: 'no',
  pruned: 'yes',
};

export const createActionsObj = (actions) => {
  return actions.reduce(
    (result, action) => ({
      ...result,
      ...{ [action]: maintenanceResults[action] },
    }),
    {},
  );
};

export default function TreeMaintenanceActions({
  currentTreeData,
  isTreeQueryError,
}) {
  const mutateHistory = useTreeHistoryMutation();
  const mutateCreateTreeData = useCreateTreeDataMutation();

  // TODO get defaultActions from db for that day
  const [actions, setActions] = useState([]);
  const commentRef = useRef(null);
  const { user = {} } = useAuth0();

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = commentRef.current.value;

    if (comment || actions.length) {
      if (isTreeQueryError) {
        mutateCreateTreeData.mutate({
          ...currentTreeData,
          volunteer: user?.nickname,
        });
      }

      // TODO figure out timing difference between client and server so history doesnt get added twice
      const sendTreeHistory = {
        id: currentTreeData?.id,
        dateVisit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        volunteer: user?.nickname,
        ...createActionsObj(actions),
      };
      if (comment) sendTreeHistory.comment = comment;
      mutateHistory.mutate(sendTreeHistory);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'rgba(16, 100, 18, 0.8)',
        padding: '10px',
        borderRadius: '0 0 15px 15px ',
      }}
    >
      <form id="treemaintenance" onSubmit={handleSubmit}>
        <MaintenanceButtons actions={actions} setActions={setActions} />
        <div style={{ margin: '5px', fontSize: '1.5em', textAlign: 'right' }}>
          <input
            ref={commentRef}
            type="text"
            id="comment"
            name="comment"
            placeholder="Maintenance Comment"
            style={{ width: '100%', marginBottom: '5px' }}
          />

          <input
            type="submit"
            value="Save Maintenance"
            style={{ marginBottom: '5px', fontSize: '1em' }}
          />
        </div>
      </form>
    </div>
  );
}
