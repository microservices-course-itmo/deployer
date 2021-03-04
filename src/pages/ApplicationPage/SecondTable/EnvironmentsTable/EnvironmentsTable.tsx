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
import { useSnackbar } from 'notistack'
import { IApplicationData, IEnvironmentVariable } from '../../../../types/Application'
import API from '../../../../api'

interface IApplicationPageTabEnvironmentProps {
  data: IApplicationData
}

const useStyles = makeStyles({
  saveBtn: {
    marginTop: '5px',
    padding: '10px 60px',
    backgroundColor: '#dc70e6',
  },
})

const prepareData = (env: IEnvironmentVariable[]) =>
  env.reduce((accum, value) => ({ ...accum, [value.name]: value.value }), {})

export const EnvironmentsTable = ({
  data: { environmentVariables = [], ...fullData },
}: IApplicationPageTabEnvironmentProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [envs, setEnv] = React.useState<{ [key: string]: string }>(prepareData(environmentVariables))
  const [newEnv, setNewEnv] = React.useState('')
  const [newEnvValue, setNewEnvValue] = React.useState('')
  const classes = useStyles()

  const handleChangeEnv = (event: any) => {
    const { name, value } = event.target
    setEnv((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleChangeNewEnv = (event: any) => {
    const { value } = event.target
    setNewEnv(value)
  }

  const handleChangeNewEnvValue = (event: any) => {
    const { value } = event.target
    setNewEnvValue(value)
  }

  const onChangeAddEnv = () => {
    let isExist = false
    Object.keys(envs).map((name) => {
      if (name === newEnv) {
        isExist = true
      }
      return 0
    })
    if (newEnv === '' || newEnvValue === '') {
      alert('Поле пустое. Введите значение!')
    } else if (isExist) {
      alert('Такая переменная уже сущетсвует! Измените существующую')
    } else {
      setEnv((prevState) => ({ ...prevState, [newEnv]: newEnvValue }))
    }
  }

  const onClickDeleteEnv = (k: string) => {
    const newObj = Object.entries(envs).filter((en) => en[0] !== k)
    setEnv(Object.fromEntries(newObj))
  }

  const [mutate] = useMutation(API.deploymentController.updateData, {
    onError: (error: Error) => {
      enqueueSnackbar(`${error.name} - ${error.message}`, { variant: 'error' })
    },
  })

  const onSave = () => {
    const data = Object.keys(envs)

    mutate({ ...fullData, environmentVariables: data.map((key) => ({ name: key, value: envs[key] })) })
  }

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Value</TableCell>
              <TableCell align='right'>{}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(envs).map((name) => (
              <TableRow key={name}>
                <TableCell>
                  <TextField disabled id='standard-required' variant='filled' value={name} />
                </TableCell>
                <TableCell align='right'>
                  <TextField id='standard' name={name} variant='filled' value={envs[name]} onChange={handleChangeEnv} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onClickDeleteEnv(name)} aria-label='delete'>
                    <DeleteIcon fontSize='large' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField label='name' id='standard' onChange={handleChangeNewEnv} variant='filled' value={newEnv} />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  label='value'
                  id='standard'
                  onChange={handleChangeNewEnvValue}
                  variant='filled'
                  value={newEnvValue}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={onChangeAddEnv} aria-label='add'>
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
