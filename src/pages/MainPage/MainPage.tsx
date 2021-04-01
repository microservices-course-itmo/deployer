/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Button, CircularProgress, Container, Grid, TextField, Modal } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import Alert from '@material-ui/lab/Alert'
import { getAppByName, getApplicationNames } from '../../api/deploymentController'
import { Appbar } from '../Appbar/Appbar'
import { IApplicationData } from '../../types/Application'
import API from '../../api'

const ERROR_ALERT = 'This is an error alert — check it out!'

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      marginTop: '64px',
    },
    main: {
      display: 'flex',
      width: '100%',
    },
    input: {
      width: '100%',
    },
    columnName: {
      overflow: 'hidden',
      width: '30%',
    },
    columnDate: {
      width: '40%',
    },
    columnRunning: {
      textAlign: 'center',
      width: '10%',
    },
    columnStopped: {
      textAlign: 'center',
      width: '10%',
    },
    columnRemove: {
      textAlign: 'center',
      width: '10%',
    },
    removeBtn: {
      backgroundColor: 'red',
      color: 'white',
    },
    cancelBtn: {
      backgroundColor: 'green',
      color: 'white',
    },
    modalContainer: {
      position: 'absolute',
      float: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '550px',
      backgroundColor: '#f5f5f5',
      outline: 'none',
      borderRadius: '12px',
      padding: '25px 70px',
      boxShadow: '5px 3px 15px 3px rgba(63,81,181,0.50)',
    },
  })
)

const filterList = (value: string, list: IApplicationData[]) =>
  list.filter((item) => item.name.toLowerCase().includes(value.replaceAll(' ', '').toLowerCase()))

export const MainPage = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const [inputValue, setInputValue] = useState('')
  const [searchItems, setSearchItems] = useState<IApplicationData[]>([])
  const [modalState, setModalState] = useState<{ visible: boolean; app?: string }>({
    visible: false,
  })

  const [mutate] = useMutation(API.applicationController.removeAppByName, {
    onSuccess: (data) => {
      if (data.status === 500) {
        return Promise.reject(new Error(`Server error during deleting app`))
      }
      enqueueSnackbar(`Successfully removed`, { variant: 'success' })
      return Promise.resolve()
    },
    onError: (error: Error) => {
      enqueueSnackbar(`${error?.name} - ${error?.message}`, { variant: 'error' })
      return Promise.reject()
    },
  })

  const { isLoading, isError, data, refetch } = useQuery<IApplicationData[]>('applicationNames', () =>
    getApplicationNames()
      .then((items) => {
        if (!items.length) {
          throw new Error('Not Found')
        }

        return items
      })
      .then((names) => names.filter(Boolean))

      // Request all apps.
      .then((items) => Promise.allSettled(items.map((application: string) => getAppByName(application))))
      // Remove apps with error statuses.
      .then((items) => items.filter((i) => i.status === 'fulfilled').map(i => i.value)))

      .then((items) => {
        setSearchItems(items)
        return items
      })
  )

  const handleValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target
    setInputValue(value as string)
    setSearchItems(filterList(value as string, data!))
  }

  return (
    <Container>
      <Appbar />
      <Grid className={classes.wrapper} container direction='row' justify='space-around' alignItems='center'>
        <div className={classes.main}>
          <div style={{ width: '100%' }}>
            <TextField
              InputProps={{ type: 'search' }}
              className={classes.input}
              disabled={isError || isLoading}
              label='Search input'
              margin='normal'
              onChange={handleValueChange}
              variant='outlined'
              value={inputValue}
            />
            {isError ? (
              <Alert severity='error'>{ERROR_ALERT}</Alert>
            ) : isLoading ? (
              <CircularProgress />
            ) : (
              <List component='nav' aria-label='main mailbox folders'>
                {!!searchItems.length && (
                  <div>
                    <ListItem>
                      <div className={classes.columnName}>NAME:</div>
                      <div className={classes.columnDate}>DATE:</div>
                      <div className={classes.columnRemove} />
                      <div className={classes.columnRunning}>
                        <CheckIcon style={{ color: 'green' }} />
                      </div>
                      <div className={classes.columnStopped}>
                        <CloseIcon color='error' />
                      </div>
                    </ListItem>
                    {searchItems
                      // last created will be first
                      .sort((a, b) => +b.dateCreated - +a.dateCreated)
                      .map((item) => {
                        const { dateCreated, name, id, instances } = item
                        return (
                          <ListItem key={id}>
                            <Link style={{ textDecoration: 'none' }} className={classes.columnName} to={`/app/${name}`}>
                              {name}
                            </Link>
                            <div className={classes.columnDate}>
                              {new Date(dateCreated).toLocaleDateString('ru', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                              })}
                            </div>
                            <div className={classes.columnRemove}>
                              <Button
                                className={classes.removeBtn}
                                onClick={(e) => setModalState({ visible: true, app: name })}
                              >
                                DELETE
                              </Button>
                            </div>
                            <div className={classes.columnRunning}>
                              {instances.reduce((count, curr) => (curr.status === 'RUNNING' ? count + 1 : count), 0)}
                            </div>
                            <div className={classes.columnStopped}>
                              {instances.reduce((count, curr) => (curr.status === 'STOPPED' ? count + 1 : count), 0)}
                            </div>
                          </ListItem>
                        )
                      })}
                  </div>
                )}
                {!searchItems.length && <span>no search results</span>}
              </List>
            )}
          </div>
          <div style={{ padding: '23px 0 0 20px' }}>
            <Button color='primary' href='/new-app' variant='contained' size='large' style={{ width: '120px' }}>
              New app
            </Button>
          </div>
        </div>
      </Grid>
      <Modal open={modalState.visible} onClose={() => setModalState({ visible: false })}>
        <div className={classes.modalContainer}>
          <h2>Do you really want to remove app "{modalState.app}"</h2>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Button
              className={classes.removeBtn}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                mutate(modalState.app).then(() => {
                  refetch()
                  setModalState({ visible: false })
                })
              }}
            >
              DELETE
            </Button>
            <div style={{ width: 12 }} />
            <Button className={classes.cancelBtn} onClick={(e) => setModalState({ visible: false })}>
              CANCEL
            </Button>
          </Grid>
        </div>
      </Modal>
    </Container>
  )
}
