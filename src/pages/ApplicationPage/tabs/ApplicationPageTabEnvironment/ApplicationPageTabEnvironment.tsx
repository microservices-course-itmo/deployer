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
import { IEnvironmentVariable } from '../../../../types/Application'

interface IApplicationPageTabEnvironmentProps {
  env: IEnvironmentVariable[]
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

const prepareData = (env: IEnvironmentVariable[]) =>
  env.reduce((accum, value) => ({ ...accum, [value.name]: value.value }), {})

export const ApplicationPageTabEnvironment = ({ env }: IApplicationPageTabEnvironmentProps) => {
  const [envs, setEnv] = React.useState<{ [key: string]: string }>(prepareData(env))
  // const handleChangeEnv = (event: any) => {
  //   // setEnv(() => {
  //   //   const newEnvs = envs.map((en) => {
  //   //     if (en[0] === event.target.name) {
  //   //       return [en[0], event.target.value]
  //   //     }
  //   //     return en
  //   //   })
  //   //   return newEnvs as IEnvironmentVariable
  //   // })
  //   // setEn([...envs, [event.target.name, event.target.value]])
  //   console.log(event)
  // }
  // const tempEnvsCreate = (name: string, value: string) => {
  //   let tempEnvs: IEnvironmentVariable[]
  //   envs.forEach((element) => {
  //     if (element[0] === name) {
  //       tempEnvs.push([name, value])
  //     } else {
  //       tempEnvs.push(element)
  //     }
  //   })
  //   setEnv(tempEnvs)
  // }
  // const handleChangeEnv = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   tempEnvsCreate(event.target.name as string, event.target.value as string)
  // }

  // const handleChangeEnv = (event: React.ChangeEvent<{ value: unknown }>, name:string) => {
  //   // eslint-disable-next-line
  //   // @ts-ignore
  //   setEnvName((envName) => {
  //     envName.name = (event.target.value as string)
  //     return(envName)
  //   }
  //   //   (prevState) => {
  //   //   let value = Object.assign({}, prevState.value)
  //   // }({ ...prevState, [event.target.name]: event.target.value }))
  // }
  /* onChange={handleChangeEnv(React.ChangeEvent<{value: unknown}>, en[0]) */

  const handleChangeEnv = (event: any) => {
    const { name, value } = event.target
    setEnv((prevState) => ({ ...prevState, [name]: value }))
  }

  const classes = useStyles()
  return (
    <div>
      <h3>ApplicationPageTabEnvironment</h3>
      <TableContainer className={classes.table} component={Paper}>
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
    </div>
  )
}
