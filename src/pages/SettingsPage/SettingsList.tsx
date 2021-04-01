import { Button, Container, Grid, Paper, TextField, Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query'
import SettingsIcon from '@material-ui/icons/Settings'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: '#FFFFFF',
      height: '100%',
      margin: 0,
      padding: 0,
      width: '100%',
    },
    root: {
      height: '600px',
      left: '45%',
      margin: '-200px 0 0 -200px',
      position: 'absolute',
      textAlign: 'center',
      top: '35%',
      width: '600px',
    },
    control: {
      bottom: '185px',
      height: '250px',
      left: '45px',
      position: 'absolute',
      right: '5px',
      top: '185px',
      width: '250px',
    },
    left: {
      float: 'left',
      height: '600px',
      width: '300px',
    },
    right: {
      float: 'right',
      height: '600px',
      width: '300px',
    },
    textfields: {
      padding: theme.spacing(1),
    },
    h1: {
      padding: theme.spacing(1),
    },
    control2: {
      bottom: '180px',
      height: '250px',
      left: '285px',
      position: 'absolute',
      right: '615px',
      top: '200px',
      width: '250px',
    },
    buttonControl: {
      bottom: '200px',
      left: '270px',
      right: '270px',
      top: '-200px',
    },
    iconstyle: {
      fontSize: '50px',
    },
  })
)

interface ISettingsListProps {
  settings: { [key: string]: string }
}

export const SettingsList = ({ settings }: ISettingsListProps) => {
  const classes = useStyles()
  const [settingItems, setSettingItems] = useState<{ [key: string]: string }>(settings)
  const { enqueueSnackbar } = useSnackbar()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event
    setSettingItems((prevState) => ({ ...prevState, [name]: value }))
  }

  const [mutate] = useMutation(
    (newSettings: { [key: string]: string }) => {
      const accessToken = window.localStorage.getItem('accessToken')

      return fetch(`${process.env.API}/settings/set`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newSettings),
      }).then((resp) => resp.json())
    },
    {
      onError: (error: Error) => {
        enqueueSnackbar(`${error.name} - ${error.message}`, { variant: 'error' })
      },
    }
  )

  const onSave = () => {
    mutate(settingItems)
  }

  return (
    <Container className={classes.main}>
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
