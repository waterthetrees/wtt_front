import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import format from 'date-fns/format';
import { useTreeHistoryQuery } from '@/api/queries';
import { maintenanceActions } from '@/util/constants';
import { Liked, Adopted } from '@/components/Icons';
import Section from '@/components/Section/Section';
import TreeTable from './TreeTable';

const TreeHistoryItem = ({ item }) => {
  const {
    dateVisit, volunteer = 'volunteer', comment, liked, adopted,
  } = item;
  const isoDate = dateVisit
    ? format(new Date(dateVisit), 'yyyy-MM-dd')
    : format(new Date(), 'yyyy-MM-dd');
  const actions = maintenanceActions.reduce((result, [, pastAction]) => {
    if (item[pastAction] === 'yes') {
      result.push(pastAction);
    }

    return result;
  }, []);

  return (
    <TableRow>
      <TableCell>
        <p>
          <strong>
            {isoDate}
            :
            {' '}
            {volunteer}
          </strong>
        </p>
        {actions.length > 0
          && (
            <p>
              <strong>Maintenance:&nbsp;</strong>
              {actions.join(', ')}
            </p>
          )}
        {comment
          && (
            <p>
              "
              {comment}
              "
            </p>
          )}
        {(liked || adopted)
          && (
            <p>
              {liked
                && (
                  <span>
                    <Liked />
                    {' '}
                    liked &nbsp;
                  </span>
                )}
              {adopted
                && (
                  <span>
                    <Adopted />
                    {' '}
                    adopted
                  </span>
                )}
            </p>
          )}
      </TableCell>
    </TableRow>
  );
};

export default function TreeHistory({ currentTreeData }) {
  const { data: history } = useTreeHistoryQuery({ id: currentTreeData.id });

  if (!history?.length) {
    return null;
  }

  return (
    <Section
      title="Tree History"
    >
      <TreeTable>
        {history.map((item) => (
          <TreeHistoryItem
            key={item.dateVisit}
            item={item}
          />
        ))}
      </TreeTable>
    </Section>
  );
}
