import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { IApplicationInstance } from 'types/Application'

import { ApplicationInstanceRow } from './ApplicetionInstanceRow'

const useStyles = makeStyles({
  wrapper: {
    height: 'fit-content',
  },
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
})

interface IApplicationInstanceTableProps {
  data: IApplicationInstance[]
}

export const InstancesTable = ({ data }: IApplicationInstanceTableProps) => {
  const classes = useStyles()

  return (
    <Paper className={classes.wrapper}>
      <TableContainer>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Version</TableCell>
              <TableCell align='center'>Deploy Initiator</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
              <TableCell align='center'>Alias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((rowData) => (
              <ApplicationInstanceRow data={rowData} key={rowData.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
