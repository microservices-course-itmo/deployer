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
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { useMutation } from 'react-query'
import { IApplicationData } from '../../../../types/Application'
import API from '../../../../api'

interface IApplicationPageTabPortsProps {
  data: IApplicationData
}
const useStyles = makeStyles({
  saveBtn: {
    marginTop: '5px',
    padding: '10px 60px',
    backgroundColor: '#dc70e6',
  },
})

export const PortsTable = ({ data: { ports = {}, ...fullData } }: IApplicationPageTabPortsProps) => {
  const classes = useStyles()
  const [port, setPorts] = React.useState<{ [key: string]: string }>(ports)
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
  const onChangeAddPorts = () => {
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
      alert('Такой том уже сущетсвует! Измените существующий')
    } else {
      setPorts((prevState) => ({ ...prevState, [newPort]: newPortValue }))
    }
  }

  const onClickDeleteEnv = (k: string) => {
    const newObj = Object.entries(port).filter((p) => p[0] !== k)
    setPorts(Object.fromEntries(newObj))
  }

  const [mutate] = useMutation(API.deploymentController.updateData)

  const onSave = () => {
    mutate({ ...fullData, ports: port })
  }

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Port</TableCell>
              <TableCell align='right'>Value</TableCell>
              <TableCell align='right'>{}</TableCell>
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
                <TableCell>
                  <IconButton onClick={() => onClickDeleteEnv(por)} aria-label='delete'>
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField
                  label='port'
                  id='standard'
                  onChange={handleChangeNewPorts}
                  variant='filled'
                  value={newPort}
                />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  label='value'
                  onChange={handleChangeNewPortValue}
                  id='standard'
                  variant='filled'
                  value={newPortValue}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={onChangeAddPorts} aria-label='add'>
                  <AddCircleOutlineIcon fontSize='large' style={{ color: '#3F51B5' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container direction='row' justify='flex-end' alignItems='center'>
        <Button className={classes.saveBtn} variant='contained' size='large' color='primary' onClick={onSave}>
          Save
        </Button>
      </Grid>
    </Grid>
  )
}
