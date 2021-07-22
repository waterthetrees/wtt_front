import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

function createData({
  idTree,
  dateVisit,
  watered,
  mulched,
  weeded,
  staked,
  braced,
  pruned,
  liked,
  adopted,
}) {
  return {
    idTree,
    dateVisit,
    watered,
    mulched,
    weeded,
    staked,
    braced,
    pruned,
    liked,
    adopted,
  };
}

function TableColumnNames({ headCells }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell key={headCell.id}>
            {headCell.label}
            {index > 0 && <Checkbox />}
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

const UserTreeHistoryTable = ({ data }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const rows = data.map((obj) => createData(obj));
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const headCells = Object.keys(rows[0] ?? {}).map((key) => ({ id: key, label: key }));

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableHeader />
        <TableContainer>
          <Table className={classes.table}>
            <TableColumnNames headCells={headCells} classes={classes} rowCount={rows.length} />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {Object.keys(row).map((key, index2) => (
                      <TableCell key={`${index}-${index2}`}>
                        <>{row[key] ?? 'false'}</>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
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
