import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  violation:{
    background:'red',
  }
});


export default function TableWorkLog({worklog}) {
  const classes = useStyles();
  return (
    
    <TableContainer component={Paper}>
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Начало работы</TableCell>
            <TableCell align="left">Конец работы</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {worklog.map((row) => (
            <TableRow key={row.id} className={row.violation === true ? classes.violation : null}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.from}</TableCell>
              <TableCell align="left">{row.to}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}