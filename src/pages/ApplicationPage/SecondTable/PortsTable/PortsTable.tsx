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
  Grid,
  // Checkbox,
} from '@material-ui/core'
import { IPorts } from '../../../../types/Application'

interface IApplicationPageTabPortsProps {
  ports: IPorts
}

const useStyles = makeStyles({
  saveBtn: {
    marginTop: 10,
  },
})

export const PortsTable = ({ ports }: IApplicationPageTabPortsProps) => {
  const classes = useStyles()

  const [port, setPorts] = React.useState<{ [key: string]: string }>(ports)

  const handleChangePorts = (event: any) => {
    const { name, value } = event.target
    setPorts((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Port</TableCell>
              <TableCell align='right'>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(port).map((por) => (
              <TableRow key={por}>
                <TableCell>
                  <TextField disabled id='standard-required' variant='filled' value={por} />
                </TableCell>
                <TableCell align='right'>
                  <TextField id='standard' name={por} variant='filled' value={port[por]} onChange={handleChangePorts} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button className={classes.saveBtn} color='primary' variant='contained'>
        Save
      </Button>
    </Grid>
  )
}
