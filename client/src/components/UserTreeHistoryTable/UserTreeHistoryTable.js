import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function TableColumnNames({ columnNames, orderBy, order, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columnNames.map((columnName) => (
          <TableCell key={columnName} sortDirection={orderBy === columnName ? order : false}>
            <TableSortLabel
              active={orderBy === columnName}
              direction={orderBy === columnName ? order : 'asc'}
              onClick={createSortHandler(columnName)}
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
  <Toolbar>
    <Typography variant="h6" id="tableTitle" component="div">
      Tree History
    </Typography>
  </Toolbar>
);

const TableColumns = ({ row }) => {
  return (
    <>
      {Object.keys(row).map((key, index2) => (
        <TableCell key={`col-${index2}`}>
          <>{row[key] ?? 'no'}</>
        </TableCell>
      ))}
    </>
  );
};

const UserTreeHistoryTable = ({ rows }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('dateVisit');
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const columnNames = Object.keys(rows[0] ?? {});
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableHeader />
        <TableContainer>
          <Table className={classes.table}>
            <TableColumnNames
              classes={classes}
              columnNames={columnNames}
              orderBy={orderBy}
              order={order}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableColumns row={row} />
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
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
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  );
};

export default UserTreeHistoryTable;
