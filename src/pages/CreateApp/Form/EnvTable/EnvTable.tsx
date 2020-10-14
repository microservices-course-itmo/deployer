import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
  createStyles({
    table: {
      backgroundColor: '#F0F1EC',
    },
  })
})

export default function EnvTable() {
  function createData(nameOfEnvVar: string, valueOfEnvVar: string) {
    return { nameOfEnvVar, valueOfEnvVar }
  }
  const classes = useStyles()
  const rows = [
    createData('POSTGRES_HOST', 'postgres:5432'),
    createData('DATABASE_PSWD', 'admin'),
  ]
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name of env variable</TableCell>
            <TableCell align='right'>Value of env variable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={10}>
              <TableCell component='th' scope='row'>
                {row.nameOfEnvVar}
              </TableCell>
              <TableCell align='right'>{row.valueOfEnvVar}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
