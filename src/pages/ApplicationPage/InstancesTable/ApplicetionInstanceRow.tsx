import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableCell, TableRow, IconButton, Tooltip, CircularProgress, Grid } from '@material-ui/core'
import { IApplicationInstance } from 'types/Application'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import ReplayIcon from '@material-ui/icons/Replay'
import DeleteIcon from '@material-ui/icons/Delete'
import { useMutation } from 'react-query'
import { useSnackbar } from 'notistack'
import API from '../../../api'

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
  removeButtonColor: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
}))

interface IApplicationInstanceTableProps {
  data: IApplicationInstance
}

enum ButtonTypesEnum {
  start,
  stop,
  restart,
  remove,
}

type ButtonType = keyof typeof ButtonTypesEnum

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const AVAILABLE_BUTTONS: Record<string, string[]> = {
  RUNNING: ['stop', 'restart', 'remove'],
  FAILED: ['restart', 'remove'],
  STARTING: ['stop', 'remove'],
  STOPPED: ['start', 'restart', 'remove'],
  REMOVED: ['remove'],
  RESTARTING: ['stop', 'remove'],
}

const ACTIONS: ButtonType[] = ['start', 'stop', 'restart', 'remove']

const ACTIONS_ICONS = {
  start: <PlayArrowIcon fontSize='large' />,
  stop: <StopIcon fontSize='large' />,
  restart: <ReplayIcon fontSize='large' />,
  remove: <DeleteIcon fontSize='large' />,
}

export const ApplicationInstanceRow = ({ data }: IApplicationInstanceTableProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [instanceData, setInstanceData] = useState<IApplicationInstance | null>(data)
  const [loadingType, setLoadingType] = useState('')

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')
    const interval = setInterval(() => {
      if (instanceData) {
        fetch(`${process.env.API}/applicationInstances/getSingleInstance/${instanceData.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((newData) => {
            setInstanceData((oldData) => {
              if (oldData?.status !== newData.status) {
                enqueueSnackbar(`${newData.alias} status has been changed to ${newData.status}`, { variant: 'info' })
                setLoadingType('')
              }
              return newData
            })
          })
          .catch(() => {
            clearInterval(interval)
            setInstanceData(null)
          })
      }
    }, 3500)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const [removeInstance] = useMutation(API.deploymentController.removeInstance, {
    onSuccess: () => {
      setInstanceData(null)
    },
    onError: (error: Error) => {
      enqueueSnackbar(`${error.name} - ${error.message}`, { variant: 'error' })
    },
  })

  const [changeInstanceStatus] = useMutation(API.deploymentController.changeInstanceStatus, {
    onError: (error: Error) => {
      enqueueSnackbar(`${error.name} - ${error.message}`, { variant: 'error' })
    },
  })

  const classes = useStyles()

  const handleClickInstance = (action: string) => {
    setLoadingType(action)

    if (action === 'remove') {
      removeInstance(instanceData!.id)
      return
    }

    changeInstanceStatus({
      id: instanceData!.id,
      status: action,
    })
  }

  const isButtonDisabled = (buttonType: ButtonType) => {
    return !AVAILABLE_BUTTONS[instanceData!.status].includes(buttonType) || Boolean(loadingType)
  }

  const getClasses = (buttonType: ButtonType) => {
    if (buttonType === 'start') {
      return classes.startButtonColor
    }
    if (buttonType === 'stop') {
      return classes.stopButtonColor
    }
    if (buttonType === 'remove') {
      return classes.removeButtonColor
    }
  }

  if (!instanceData) return null

  return (
    <TableRow key={instanceData.id}>
      <TableCell align='center'>{instanceData.appId}</TableCell>
      <TableCell align='center'>{instanceData.version}</TableCell>
      <TableCell align='center'>{instanceData.userCreated}</TableCell>
      <TableCell align='center'>{instanceData.status}</TableCell>
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
      <TableCell align='center'>{instanceData.alias}</TableCell>
    </TableRow>
  )
}
