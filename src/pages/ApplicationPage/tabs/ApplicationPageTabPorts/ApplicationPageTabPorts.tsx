import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  // Checkbox,
} from '@material-ui/core'
import { IPortMapping } from '../../../../types/Application'

interface IApplicationPageTabPortsProps {
  ports: IPortMapping[]
}
const useStyles = makeStyles({
  table: {
    width: '650px',
    marginLeft: '30%',
  },
  saveBtn: {
    marginTop: '5px',
    marginLeft: '30%',
    padding: '10px 20px',
  },
})

export const ApplicationPageTabPorts = ({ ports }: IApplicationPageTabPortsProps) => {
  const classes = useStyles()
  return (
    <div>
      <h3>ApplicationPageTabPorts</h3>
      <TableContainer className={classes.table} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ports.map((port) => (
              <TableRow key={port[0]}>
                <TableCell>
                  <TextField disabled id='standard-required' variant='filled' value={port[0]} />
                </TableCell>
                <TableCell align='right'>
                  <TextField id='standard' name={port[0]} variant='filled' value={port[1]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button className={classes.saveBtn} variant='contained'>
        Save
      </Button>
    </div>
  )
}
