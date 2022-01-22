import React from 'react';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import format from 'date-fns/format';
import { useTreeHistoryQuery } from '@/api/queries';
import { maintenanceActions } from '@/util/constants';
import { Liked, Adopted } from '@/components/Icons';
import Section from '../Section';

const HistoryTable = ({ rows }) => (
  <TableContainer>
    <Table size="small">
      <TableBody>
        {rows.map((cells, i) => (
          <TableRow key={i}>
            {cells}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const HistoryItem = ({ item }) => {
  const {
    dateVisit, volunteer = 'volunteer', comment, liked, adopted,
  } = item;
  const isoDate = format(new Date(dateVisit), 'yyyy-MM-dd');
  const actions = maintenanceActions.reduce((result, [, pastAction]) => {
    if (item[pastAction] === 'yes') {
      result.push(pastAction);
    }

    return result;
  }, []);

  return (
    <TableCell>
      <p>
        <strong>{isoDate}: {volunteer}</strong>
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
          <p>"{comment}"</p>
        )}
      {(liked || adopted)
        && (
          <p>
            {liked
              && <span><Liked /> liked &nbsp;</span>}
            {adopted
              && <span><Adopted /> adopted</span>}
          </p>
        )}
    </TableCell>
  );
};

export default function History({ currentTreeId }) {
  const { data: history } = useTreeHistoryQuery({ id: currentTreeId });

  if (!history?.length) {
    return null;
  }

  return (
    <Section
      title="History"
    >
      <HistoryTable
        rows={history.map((item, i) => (
          <HistoryItem
            key={i}
            item={item}
          />
        ))}
      />
    </Section>
  );
}
