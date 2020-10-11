import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Button, Container } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import ServicesTable from './ServicesTable'
import { ROUTES_REGISTRY } from '../../definitions'
import useModuleSize from '../../utils/useModuleSize'
import SearchField from './SearchField'

const HEADER_HEIGHT = 20

const useStyles = makeStyles(({ spacing }) => ({
  root: (height) => ({
    maxHeight: height,
  }),
  paper: {
    width: '100%',
  },
  table: (height: number) => ({
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
  const history = useHistory()

  const handleCreateNewApp = () => {
    history.push(ROUTES_REGISTRY.CREATE_APP.path)
  }

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Container maxWidth='lg' className={classes.header}>
        <SearchField />
        <Button
          variant='contained'
          color='primary'
          onClick={handleCreateNewApp}
        >
          Create new App
        </Button>
      </Container>
      <Container maxWidth='lg' className={classes.table}>
        <Paper className={classes.paper}>
          <ServicesTable className={classes.table} />
        </Paper>
      </Container>
    </Container>
  )
}
