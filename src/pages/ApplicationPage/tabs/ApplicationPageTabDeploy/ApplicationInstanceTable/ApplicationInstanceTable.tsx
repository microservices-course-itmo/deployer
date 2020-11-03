import React from 'react'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core'
import { IApplicationInstance } from 'types/Application'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import ReplayIcon from '@material-ui/icons/Replay'

const useStyles = makeStyles({
  table: {
    maxWidth: '1000px',
    background: '#F5F5F5',
    border: '0px',
  },
  cell: {
    maxwidth: '1px',
    padding: '10px',
    margin: '10px',
  },
  row: {
    maxWidth: '20px',
  },
  paper: {
    width: '1000px',
    overflowX: 'auto',
    margin: 'auto',
  },
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d50000',
    },
    secondary: {
      main: '#1b5e20',
    },
    type: 'light',
  },
})

interface IApplicationInstanceTableProps {
  data: IApplicationInstance[]
}

export const ApplicationInstanceTable = ({ data }: IApplicationInstanceTableProps) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Version</TableCell>
              <TableCell align='center'>Deploy Initiator</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
              <TableCell align='center'>Alias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((Data) => (
              <TableRow key={Data.appId}>
                <TableCell align='center'>{Data.appId}</TableCell>
                <TableCell align='center' className={classes.cell}>
                  {Data.version}
                </TableCell>
                <TableCell align='center'>{Data.userCreated}</TableCell>
                <TableCell align='center'>{Data.status}</TableCell>
                <TableCell align='center'>
                  <div>
                    <ThemeProvider theme={theme}>
                      <IconButton color='secondary' aria-label='Play'>
                        <PlayArrowIcon fontSize='large' />
                      </IconButton>
                      <IconButton color='primary' aria-label='Stop'>
                        <StopIcon fontSize='large' />
                      </IconButton>
                      <IconButton aria-label='Replay'>
                        <ReplayIcon fontSize='large' />
                      </IconButton>
                    </ThemeProvider>
                  </div>
                </TableCell>
                <TableCell align='center'>{Data.alias}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
