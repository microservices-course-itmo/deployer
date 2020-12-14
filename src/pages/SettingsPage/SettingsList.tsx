import { Container, Grid, TextField, Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'

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

  return (
    <Container className={classes.main}>
      <Grid container direction='column' justify='space-around' alignItems='center'>
        <div className={classes.root}>
          <Grid container spacing={1} alignItems='center'>
            <Grid className={classes.control}>
              <h1>Docker Adress</h1>
            </Grid>
            <Grid>
              <TextField id='outlined-basic' variant='outlined' />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems='center'>
            <Grid className={classes.control}>
              <h1>Version Regestry</h1>
            </Grid>
            <Grid>
              <TextField id='outlined-basic' variant='outlined' />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems='center'>
            <Grid className={classes.control}>
              <h1>Image Regestry</h1>
            </Grid>
            <Grid>
              <TextField id='outlined-basic' variant='outlined' />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Container>
  )
}
