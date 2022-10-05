import React from 'react';
import format from 'date-fns/format';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

function TableColumnNames({ columnNames, orderBy, order, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columnNames.map((columnName, index) => (
          <TableCell
            key={columnName}
            sortDirection={orderBy === columnName ? order : false}
            align={index <= 2 ? 'left' : 'center'}
          >
            <TableSortLabel
              active={orderBy === columnName}
              direction={orderBy === columnName ? order : 'asc'}
              onClick={createSortHandler(columnName)}
              style={orderBy === columnName ? {} : { marginRight: '-24px' }}
            >
              {columnName}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const TableHeader = () => (
  <Toolbar variant="dense">
    <Typography variant="h5" id="tableTitle" component="div">
      Tree History
    </Typography>
  </Toolbar>
);

const TableColumns = ({ row }) => (
  <>
    {Object.keys(row).map((key, index2) => {
      if (index2 === 0) {
        return (
          <TableCell key={`col-${index2}`}>
            {format(new Date(row[key]), 'MMMM dd yyyy')}
          </TableCell>
        );
      }
      if (index2 <= 2) {
        return <TableCell key={`col-${index2}`}>{row[key]}</TableCell>;
      }
      return (
        <TableCell key={`col-${index2}`} align="center">
          {row[key] ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </TableCell>
      );
    })}
  </>
);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const UserTreeHistoryTable = ({ rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('dateVisit');
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const columnNames = Object.keys(rows[0] ?? {});

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleRequestSort = (event, property) => {
    setOrder(orderBy === property && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        mb: 2,
      }}
    >
      <TableHeader />
      <TableContainer>
        <Table>
          <TableColumnNames
            columnNames={columnNames}
            orderBy={orderBy}
            order={order}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableColumns row={row} />
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default UserTreeHistoryTable;
