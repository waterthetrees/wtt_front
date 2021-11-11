import React from 'react';
import { useTreeHistoryQuery } from '../../api/queries';
import TreeMaintenance from './TreeMaintenance';
import TreeHistory from './TreeHistory';

export default function TreeCare({
  currentTreeId, common, health,
}) {
  const { data: treeHistory } = useTreeHistoryQuery({ currentTreeId });

  return (
    <div className="treecare">
      {currentTreeId
        && health !== 'dead'
        && health !== 'vacant'
        && health !== 'missing'
        && (
          <TreeMaintenance
            currentTreeId={currentTreeId}
            common={common}
          />
        )}

      {treeHistory && treeHistory.length > 0 && (
        <TreeHistory
          treeHistory={treeHistory}
        />
      )}
    </div>
  );
}
