import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Button, Container } from '@material-ui/core'

import useModuleSize from '../../utils/useModuleSize'
import Table from './Table'
import SearchField from './SearchField'

const HEADER_HEIGHT = 20

const useStyles = makeStyles(({ spacing }) => ({
  root: (height) => ({
    maxHeight: height,
  }),
  paper: {
    width: '100%',
  },
  table: (height) => ({
    height: height - spacing(HEADER_HEIGHT + 20),
  }),
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: spacing(HEADER_HEIGHT),
  },
}))

export default function MainPage() {
  const { height } = useModuleSize()
  const classes = useStyles(height)

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Container maxWidth='lg' className={classes.header}>
        <SearchField />
        <Button variant='contained' color='primary'>
          Create new App
        </Button>
      </Container>
      <Container maxWidth='lg' className={classes.table}>
        <Paper className={classes.paper}>
          <Table className={classes.table} />
        </Paper>
      </Container>
    </Container>
  )
}
