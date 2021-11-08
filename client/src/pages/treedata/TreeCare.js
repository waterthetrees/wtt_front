import React from 'react';
import { useTreeHistoryQuery } from '../../api/queries';
import TreeMaintenance from './TreeMaintenance';
import TreeHistory from './TreeHistory';

export default function TreeCare({
  idTree, common, health,
}) {
  const { data: treeHistory } = useTreeHistoryQuery({ currentTreeId: idTree });

  return (
    <div className="treecare">
      {idTree
        && health !== 'dead'
        && health !== 'vacant'
        && health !== 'missing'
        && (
          <TreeMaintenance
            idTree={idTree}
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
