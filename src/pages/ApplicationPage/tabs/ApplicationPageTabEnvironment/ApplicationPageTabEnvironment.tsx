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

export const ApplicationPageTabEnvironment = ({ env }: IApplicationPageTabEnvironmentProps) => {
  const [envs, setEnv] = React.useState(Object.fromEntries(env))
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
            {env.map((en) => (
              <TableRow key={en[0]}>
                <TableCell>
                  <TextField disabled id='standard-required' variant='filled' value={en[0]} />
                </TableCell>
                <TableCell align='right'>
                  <TextField id='standard' name={en[0]} variant='filled' value={en[1]} />
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
