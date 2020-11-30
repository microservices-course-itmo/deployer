import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IHistoryLog } from 'types/Application'

const useStyles = makeStyles({
  table: {
    maxWidth: '1000px',
    width: '800px',
    background: '#F5F5F5',
    border: '0px',
  },
  cell: {
    maxwidth: '1px',
    padding: '10px',
    margin: '10px',
  },
  row: {
    maxWidth: '20px',
  },
  paper: {
    maxWidth: '1000px',
    overflowX: 'auto',
    margin: 'auto',
  },
})

interface IHistoryLogProps {
  logs: IHistoryLog[]
}

export const ApplicationHistoryLog = ({ logs }: IHistoryLogProps) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell align='center'>Data</TableCell>
              <TableCell align='center'>Changed By</TableCell>
              <TableCell align='center'>User</TableCell>
              <TableCell align='center'>Alias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell align='center'>{log.date}</TableCell>
                <TableCell align='center'>changed by:</TableCell>
                <TableCell align='center'>{log.user}</TableCell>
                <TableCell align='center'>{log.log}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
