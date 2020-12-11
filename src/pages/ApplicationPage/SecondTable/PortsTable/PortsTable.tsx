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

  const onClickDeleteEnv = (k: string) => {
    const newObj = Object.entries(port).filter((p) => p[0] !== k)
    setPorts(Object.fromEntries(newObj))
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
                  label='Порт'
                  id='standard'
                  onChange={handleChangeNewPorts}
                  variant='filled'
                  value={newPort}
                />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  label='Значение'
                  onChange={handleChangeNewPortValue}
                  id='standard'
                  variant='filled'
                  value={newPortValue}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={onChangeAddPors} aria-label='add'>
                  <AddCircleOutlineIcon fontSize='medium' style={{ color: '#3F51B5' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container direction='row' justify='flex-end' alignItems='center'>
        <Button className={classes.saveBtn} variant='contained' size='large' color='primary'>
          Save
        </Button>
      </Grid>
    </Grid>
  )
}
