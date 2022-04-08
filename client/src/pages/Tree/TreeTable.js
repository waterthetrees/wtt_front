import React from 'react';
import {
  Table, TableBody, TableContainer, styled,
} from '@mui/material';

const Container = styled(TableContainer)`
  & .MuiTableCell-root {
    font-size: 1rem;
    padding: 6px 0;
  }
`;

export default function TreeTable({ children }) {
  return (
    <Container>
      <Table size="small">
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </Container>
  );
}
