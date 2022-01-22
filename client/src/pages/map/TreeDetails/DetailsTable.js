import React from 'react';
import {
  Table, TableBody, TableContainer, styled,
} from '@mui/material';

const Container = styled(TableContainer)`
  & .MuiTableCell-root {
    font-size: 1rem;
  }
`;

export default function DetailsTable({ children }) {
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
