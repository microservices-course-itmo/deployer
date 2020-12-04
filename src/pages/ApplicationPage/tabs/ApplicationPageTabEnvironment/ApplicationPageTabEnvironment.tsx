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
import { IEnvironmentVariable } from '../../../../types/Application'

interface IApplicationPageTabEnvironmentProps {
  env: IEnvironmentVariable[]
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

const prepareData = (env: IEnvironmentVariable[]) =>
  env.reduce((accum, value) => ({ ...accum, [value.name]: value.value }), {})

export const ApplicationPageTabEnvironment = ({ env }: IApplicationPageTabEnvironmentProps) => {
  const [envs, setEnv] = React.useState<{ [key: string]: string }>(prepareData(env))
  const [newEnv, setNewEnv] = React.useState('')
  const [newEnvValue, setNewEnvValue] = React.useState('')
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
  const classes = useStyles()
  return (
    <Grid className={classes.tableContainer} container direction='column' justify='center' alignItems='center'>
      <h3>ApplicationPageTabEnvironment</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Value</TableCell>
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
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField
                  label='Название переменной'
                  id='standard'
                  onChange={handleChangeNewEnv}
                  variant='filled'
                  value={newEnv}
                />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  label='Значение переменной'
                  id='standard'
                  onChange={handleChangeNewEnvValue}
                  variant='filled'
                  value={newEnvValue}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container direction='row' justify='space-between' alignItems='center'>
        <Button onClick={onChangeAddEnv} className={classes.saveBtn} variant='contained'>
          Add
        </Button>
        <Button className={classes.saveBtn} variant='contained'>
          Save
        </Button>
      </Grid>
    </Grid>
  )
}
