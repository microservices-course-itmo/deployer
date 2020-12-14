import { Button, Container, Grid, TextField, Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query'

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
      padding: theme.spacing(2),
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
      <Grid container direction='column' justify='space-around' alignItems='center'>
        <div className={classes.root}>
          <Grid container spacing={1} alignItems='center'>
            <Grid className={classes.control}>
              <h1>Docker Adress</h1>
            </Grid>
            <Grid>
              <TextField
                id='outlined-basic'
                variant='outlined'
                value={settingItems['dockerAddress']}
                name='dockerAddress'
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems='center'>
            <Grid className={classes.control}>
              <h1>Version Regestry</h1>
            </Grid>
            <Grid>
              <TextField
                id='outlined-basic'
                variant='outlined'
                value={settingItems['versionRegistry']}
                name='versionRegistry'
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems='center'>
            <Grid className={classes.control}>
              <h1>Image Regestry</h1>
            </Grid>
            <Grid>
              <TextField
                id='outlined-basic'
                variant='outlined'
                value={settingItems['imageRegistry']}
                name='imageRegistry'
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button onClick={onSave}>Save</Button>
        </div>
      </Grid>
    </Container>
  )
}
