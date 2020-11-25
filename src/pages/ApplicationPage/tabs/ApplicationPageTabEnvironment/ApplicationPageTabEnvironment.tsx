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

  const handleChangeEnv = (event: any) => {
    const { name, value } = event.target
    setEnv((prevState) => ({ ...prevState, [name]: value }))
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
          </TableBody>
        </Table>
      </TableContainer>
      <Button className={classes.saveBtn} variant='contained'>
        Save
      </Button>
    </Grid>
  )
}
