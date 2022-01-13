import React from 'react';
import { useTreeHistoryQuery } from '@/api/queries';
import TreeMaintenance from './TreeMaintenance';
import TreeHistory from './TreeHistory';
import { treeHealth } from '@/util/treeHealth';

export default function TreeCare({
  currentTreeId, common, health,
}) {
  const { data: treeHistory } = useTreeHistoryQuery({ id: currentTreeId });

  return (
    <div className="treecare">
      {currentTreeId
        && treeHealth.isMaintainable(health)
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
