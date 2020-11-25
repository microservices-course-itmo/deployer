import React from 'react'
<<<<<<< Updated upstream
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
import { IPortMapping } from '../../../../types/Application'
=======
import { IPorts } from '../../../../types/Application'
>>>>>>> Stashed changes

interface IApplicationPageTabPortsProps {
  ports: IPorts
}
const useStyles = makeStyles({
  tableContainer: {
    marginLeft: '30%',
    width: '650px',
  },
  saveBtn: {
    marginTop: '5px',
    padding: '10px 60px',
    backgroundColor: '#dc70e6',
  },
})

const preparePorts = (ports: IPortMapping[]) =>
  ports.reduce((accum, value) => ({ ...accum, [value.port]: value.value }), {})

export const ApplicationPageTabPorts = ({ ports }: IApplicationPageTabPortsProps) => {
  const classes = useStyles()
  const [port, setPorts] = React.useState<{ [key: string]: string }>(preparePorts(ports))
  const handleChangePorts = (event: any) => {
    const { name, value } = event.target
    setPorts((prevState) => ({ ...prevState, [name]: value }))
  }
  return (
    <Grid className={classes.tableContainer} container direction='column' justify='center' alignItems='center'>
      <h3>ApplicationPageTabPorts</h3>
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
      <Button className={classes.saveBtn} variant='contained'>
        Save
      </Button>
    </Grid>
  )
}
