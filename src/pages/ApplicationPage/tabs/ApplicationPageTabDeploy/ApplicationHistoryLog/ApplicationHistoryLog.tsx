import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IHistoryLog } from 'types/Application'

const useStyles = makeStyles({
  table: {
    maxWidth: '1000px',
    background: '#F5F5F5',
    border: '0px',
  },
  cell: {
    maxwidth: '1px',
    padding: '50px',
    margin: '50px',
  },
  row: {
    maxWidth: '20px',
  },
  paper: {
    width: '790px',
    overflowX: 'auto',
    margin: 'auto',
  },
})

interface IHistoryLogProps {
  variant?: IHistoryLog[]
}

export const ApplicationHistoryLog = ({ variant }: IHistoryLogProps) => {
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
            {variant?.map((Variant) => (
              <TableRow key={Variant.id}>
                <TableCell align='center'>{Variant.date}</TableCell>
                <TableCell align='center'>{Variant.changed_by}</TableCell>
                <TableCell align='center'>{Variant.user}</TableCell>
                <TableCell align='center'>{Variant.log}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
