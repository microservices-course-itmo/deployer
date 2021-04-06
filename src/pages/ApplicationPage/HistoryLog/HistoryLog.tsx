import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  // ListItem,
  // ListItemText,
  List,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IHistoryLog, IHistoryState } from 'types/Application'

const useStyles = makeStyles({
  table: {
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
    overflowX: 'auto',
    margin: '20px 0 0 0',
  },
  dialog: {
    padding: 20,
    overflow: 'auto',
  },
  container: {
    display: 'flex',
    width: '100%',
  },
  containerCol: {
    width: '50%',
    marginBottom: 20,
  },
})

interface IHistoryLogProps {
  variant?: IHistoryLog[]
}

interface IListsProps {
  type?: string
  vars?: IHistoryState
}

const renderList = (vars?: IHistoryState, type?: string) => {
  // if (type) {
  //   return vars[type].map((item) => {
  //     const [key, val] = typeof item === 'string' ? [item, ''] : [item[0], item[1]]
  //
  //     return (
  //       <ListItem>
  //         <ListItemText primary={key} secondary={val} />
  //       </ListItem>
  //     )
  //   })
  // }

  return 'history'
}

const Lists = ({ type, vars }: IListsProps) => {
  const classes = useStyles()

  return (
    <List component='div' subheader={<span>type</span>} className={classes.containerCol}>
      {renderList(vars, type)}
    </List>
  )
}

export const HistoryLog = ({ variant }: IHistoryLogProps) => {
  const classes = useStyles()

  const [isHistoryOpenWithData, setIsHistoryOpenWithData] = useState<IHistoryLog | null>(null)

  return (
    <>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow className={classes.row}>
                <TableCell align='center'>Data</TableCell>
                <TableCell align='center'>User</TableCell>
                <TableCell align='center'>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variant?.map((Variant) => {
                const date = (Variant.date ? new Date(Variant.date) : new Date()).toISOString().split('T')[0]

                return (
                  <TableRow key={Variant.id}>
                    <TableCell align='center'>{date}</TableCell>
                    <TableCell align='center'>
                      <Button
                        color='primary'
                        size='small'
                        onClick={() => Variant.currentState && setIsHistoryOpenWithData(Variant)}
                      >
                        Changed by: {Variant.user}
                      </Button>
                    </TableCell>
                    <TableCell align='center'>{Variant.message}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog fullWidth open={Boolean(isHistoryOpenWithData)} onClose={() => setIsHistoryOpenWithData(null)}>
        <DialogTitle>History</DialogTitle>
        <div className={classes.dialog}>
          <div className={classes.container}>
            <div className={classes.containerCol}>
              <Typography variant='h6'>Previous</Typography>
            </div>
            <div className={classes.containerCol}>
              <Typography variant='h6'>Current</Typography>
            </div>
          </div>
          <div className={classes.container}>
            <Lists type='env' vars={isHistoryOpenWithData?.prevState} />
            <Lists type='env' vars={isHistoryOpenWithData?.currentState} />
          </div>
          <div className={classes.container}>
            <Lists type='volumes' vars={isHistoryOpenWithData?.prevState} />
            <Lists type='volumes' vars={isHistoryOpenWithData?.currentState} />
          </div>
          <div className={classes.container}>
            <Lists type='ports' vars={isHistoryOpenWithData?.prevState} />
            <Lists type='ports' vars={isHistoryOpenWithData?.currentState} />
          </div>
        </div>
        <DialogActions>
          <Button onClick={() => setIsHistoryOpenWithData(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
