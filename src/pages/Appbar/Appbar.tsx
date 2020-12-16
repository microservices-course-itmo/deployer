import React from 'react'
import { IconButton, Toolbar, AppBar, Button, Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bar: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
)

export const Appbar = () => {
  const classes = useStyles()

  return (
    <div className={classes.bar}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            href='http://localhost:8081/'
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            href='http://localhost:8081/settings'
          >
            <SettingsIcon />
          </IconButton>
          <Button color='inherit' href='http://localhost:8081/Login'>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
