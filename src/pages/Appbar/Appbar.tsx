import React from 'react'
import { IconButton, Toolbar, AppBar, Button, Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
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

export const Appbar = ({ isLoginPage }: { isLoginPage?: boolean }) => {
  const classes = useStyles()

  return (
    <div className={classes.bar}>
      <AppBar>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu' href='#'>
            <SearchIcon />
          </IconButton>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu' href='#settings'>
            <SettingsIcon />
          </IconButton>
          {isLoginPage ? (
            <Button color='inherit' href='#login'>
              Login
            </Button>
          ) : (
            <Button color='inherit' href='#profile'>
              Profile
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
