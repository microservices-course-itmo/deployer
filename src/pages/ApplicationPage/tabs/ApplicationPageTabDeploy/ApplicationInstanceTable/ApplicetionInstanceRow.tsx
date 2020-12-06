import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableCell, TableRow, IconButton, Tooltip, CircularProgress, Grid } from '@material-ui/core'
import { IApplicationInstance } from 'types/Application'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import ReplayIcon from '@material-ui/icons/Replay'

const useStyles = makeStyles(({ spacing }) => ({
  rowActions: {
    height: spacing(7.5),
    width: 200,
  },
  startButtonColor: {
    color: '#1b5e20',
  },
  stopButtonColor: {
    color: '#d50000',
  },
}))

interface IApplicationInstanceTableProps {
  data: IApplicationInstance
}

enum ButtonTypesEnum {
  start,
  stop,
  restart,
}

type ButtonType = keyof typeof ButtonTypesEnum

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const AVAILABLE_BUTTONS: Record<string, string[]> = {
  RUNNING: ['stop', 'restart'],
  FAILED: ['restart'],
  STARTING: ['stop'],
  STOPPED: ['start', 'restart'],
  REMOVED: [],
  RESTARTING: ['stop'],
}

const ACTIONS: ButtonType[] = ['start', 'stop', 'restart']

const ACTIONS_ICONS = {
  start: <PlayArrowIcon fontSize='large' />,
  stop: <StopIcon fontSize='large' />,
  restart: <ReplayIcon fontSize='large' />,
}

export const ApplicationInstanceRow = ({ data }: IApplicationInstanceTableProps) => {
  const classes = useStyles()

  const [loadingType, setLoadingType] = useState('')

  const handleClickInstance = (action: string) => {
    setLoadingType(action)
    delay(2000)
      .then(() => {})
      .finally(() => {
        setLoadingType('')
      })
  }

  const isButtonDisabled = (buttonType: ButtonType) => {
    return !AVAILABLE_BUTTONS[data.status].includes(buttonType) || Boolean(loadingType)
  }

  const getClasses = (buttonType: ButtonType) => {
    if (buttonType === 'start') {
      return classes.startButtonColor
    }
    if (buttonType === 'stop') {
      return classes.stopButtonColor
    }
  }

  return (
    <TableRow key={data.id}>
      <TableCell align='center'>{data.appId}</TableCell>
      <TableCell align='center'>{data.version}</TableCell>
      <TableCell align='center'>{data.userCreated}</TableCell>
      <TableCell align='center'>{data.status}</TableCell>
      <TableCell align='center'>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={1}
          classes={{ root: classes.rowActions }}
        >
          {ACTIONS.map((action) => (
            <Grid item key={action}>
              {loadingType === action ? (
                <CircularProgress size={41} />
              ) : (
                <Tooltip title={`${action} instance`}>
                  <IconButton
                    size='small'
                    color='primary'
                    aria-label={action}
                    onClick={() => handleClickInstance(action)}
                    disabled={isButtonDisabled(action)}
                    classes={{ colorPrimary: getClasses(action) }}
                  >
                    {ACTIONS_ICONS[action]}
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          ))}
        </Grid>
      </TableCell>
      <TableCell align='center'>{data.alias}</TableCell>
    </TableRow>
  )
}
