import React from 'react';
import {
  Table, TableBody, TableContainer, styled,
} from '@mui/material';

const Container = styled(TableContainer)`
  & .MuiTableCell-root {
    font-size: 1rem;
  }
  & .css-lt59a0-MuiTableCell-root {
    padding: 6px 0;
  }
`;

export default function TreeDetailsTable({ children }) {
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
