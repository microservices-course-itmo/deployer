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
import { IPortMapping } from '../../../../types/Application'

interface IApplicationPageTabPortsProps {
  ports: IPortMapping[]
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

export const PortsTable = ({ ports }: IApplicationPageTabPortsProps) => {
  const classes = useStyles()
  const [port, setPorts] = React.useState<{ [key: string]: string }>(preparePorts(ports))
  const [newPort, setNewPort] = React.useState('')
  const [newPortValue, setNewPortValue] = React.useState('')
  const handleChangePorts = (event: any) => {
    const { name, value } = event.target
    setPorts((prevState) => ({ ...prevState, [name]: value }))
  }
  const handleChangeNewPorts = (event: any) => {
    const { value } = event.target
    setNewPort(value)
  }
  const handleChangeNewPortValue = (event: any) => {
    const { value } = event.target
    setNewPortValue(value)
  }
  const onChangeAddPors = () => {
    let isExist = false
    Object.keys(port).map((por) => {
      if (por === newPort) {
        isExist = true
      }
      return 0
    })
    if (newPort === '' || newPortValue === '') {
      alert('Поле пустое. Введите значение!')
    } else if (isExist) {
      alert('Такой порт уже сущетсвует! Измените существующую')
    } else {
      setPorts((prevState) => ({ ...prevState, [newPort]: newPortValue }))
    }
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
            <TableRow>
              <TableCell>
                <TextField
                  label='Новый порт'
                  id='standard'
                  onChange={handleChangeNewPorts}
                  variant='filled'
                  value={newPort}
                />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  label='Значение порта'
                  onChange={handleChangeNewPortValue}
                  id='standard'
                  variant='filled'
                  value={newPortValue}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container direction='row' justify='space-between' alignItems='center'>
        <Button onClick={onChangeAddPors} className={classes.saveBtn} variant='contained'>
          Add
        </Button>
        <Button className={classes.saveBtn} color='primary' variant='contained'>
          Save
        </Button>
      </Grid>
    </Grid>
  )
}
