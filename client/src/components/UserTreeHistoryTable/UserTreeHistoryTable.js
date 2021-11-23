import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import format from 'date-fns/format';
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
  tableContainer: {
    width: '100vw',
  },
}));

function TableColumnNames({
  columnNames, orderBy, order, onRequestSort,
}) {
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
          <TableCell key={`col-${index2}`}>{format(new Date(row[key]), 'MMMM dd yyyy')}</TableCell>
        );
      }
      if (index2 <= 2) {
        return <TableCell key={`col-${index2}`}>{row[key]}</TableCell>;
      }
      return (
        <TableCell key={`col-${index2}`} align="center">
          {row[key] ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </TableCell>
      );
    })}
  </>
);

const UserTreeHistoryTable = ({ rows }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
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
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={4}>
        <TableHeader />
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableColumnNames
              classes={classes}
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
    </div>
  );
};

export default UserTreeHistoryTable;
