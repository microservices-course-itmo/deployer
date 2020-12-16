import { AppBar, Button, Container, Grid, IconButton, Paper, TextField, Theme, Toolbar } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query'
import SettingsIcon from '@material-ui/icons/Settings'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
    },
    root: {
      textAlign: 'center',
      width: '600px',
      height: '600px',
      position: 'absolute',
      top: '35%',
      left: '45%',
      margin: '-200px 0 0 -200px',
    },
    control: {
      width: '250px',
      height: '250px',
      position: 'absolute',
      top: '185px',
      left: '45px',
      right: '5px',
      bottom: '185px',
    },
    left: {
      float: 'left',
      width: '300px',
      height: '600px',
    },
    right: {
      float: 'right',
      width: '300px',
      height: '600px',
    },
    textfields: {
      padding: theme.spacing(1),
    },
    h1: {
      padding: theme.spacing(1),
    },
    control2: {
      width: '250px',
      height: '250px',
      position: 'absolute',
      top: '200px',
      bottom: '180px',
      left: '285px',
      right: '615px',
    },
    buttonControl: {
      top: '-200px',
      bottom: '200px',
      left: '270px',
      right: '270px',
    },
    iconstyle: {
      fontSize: '50px',
    },
    bar: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

interface ISettingsListProps {
  settings: { [key: string]: string }
}

export const SettingsList = ({ settings }: ISettingsListProps) => {
  const classes = useStyles()
  const [settingItems, setSettingItems] = useState<{ [key: string]: string }>(settings)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event
    setSettingItems((prevState) => ({ ...prevState, [name]: value }))
  }

  const [mutate] = useMutation((newSettings: { [key: string]: string }) => {
    return fetch(`${process.env.API}/settings/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
      body: JSON.stringify(newSettings),
    }).then((resp) => resp.json())
  })

  const onSave = () => {
    mutate(settingItems)
  }

  return (
    <Container className={classes.main}>
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
              href='http://localhost:8081/app/demo-service'
            >
              <HomeIcon />
            </IconButton>
            <Button color='inherit' href='http://localhost:8081/Login'>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Grid container direction='column' justify='space-around' alignItems='center'>
        <Paper elevation={3}>
          <div className={classes.root}>
            <div>
              <SettingsIcon className={classes.iconstyle} />
              <h1>Settings</h1>
            </div>
            <Grid container spacing={1} alignItems='center'>
              <div className={classes.left}>
                <div className={classes.control}>
                  <h1 className={classes.h1}>Docker Address:</h1>
                  <h1 className={classes.h1}>Version Regestry:</h1>
                  <h1 className={classes.h1}>Image Regestry:</h1>
                </div>
              </div>
              <div className={classes.right}>
                <div className={classes.control2}>
                  <div className={classes.textfields}>
                    <TextField
                      id='outlined-basic'
                      variant='outlined'
                      value={settingItems['dockerAddress']}
                      name='dockerAddress'
                      onChange={onChange}
                    />
                  </div>
                  <div className={classes.textfields}>
                    <TextField
                      id='outlined-basic'
                      variant='outlined'
                      value={settingItems['versionRegistry']}
                      name='versionRegistry'
                      onChange={onChange}
                    />
                  </div>
                  <div className={classes.textfields}>
                    <TextField
                      id='outlined-basic'
                      variant='outlined'
                      value={settingItems['imageRegistry']}
                      name='imageRegistry'
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <Button className={classes.buttonControl} onClick={onSave} variant='outlined'>
                Save
              </Button>
            </Grid>
          </div>
        </Paper>
      </Grid>
    </Container>
  )
}
