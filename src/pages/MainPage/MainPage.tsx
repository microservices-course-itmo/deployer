import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import { Button, CircularProgress, Container, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import Alert from '@material-ui/lab/Alert'
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
  })
)

const filterList = (value: string, list: IApplicationData[]) =>
  list.filter((item) => item.name.toLowerCase().includes(value.replaceAll(' ', '').toLowerCase()))

const ListItemLink = (props: ListItemProps<Link, { button?: true }>) => {
  return <ListItem button component={Link} {...props} />
}

export const MainPage = () => {
  const classes = useStyles()

  const [inputValue, setInputValue] = useState('')
  const [searchItems, setSearchItems] = useState<IApplicationData[]>([])
  const { enqueueSnackbar } = useSnackbar()

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

  const { isLoading, isError, data, refetch } = useQuery<IApplicationData[]>('applicationNames', () => {
    const accessToken = window.localStorage.getItem('accessToken')
    return fetch(`${process.env.API}/application/names`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((items) => {
        if (!items.length) {
          throw new Error('Not Found')
        }
        return items
      })
      .then((items) => {
        return Promise.all(
          items.map((application: string) => {
            return fetch(`${process.env.API}/application/get/byName/${application.trim()}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }).then((res) => res.json())
          })
        )
      })
      .then((items: any[]) => {
        setSearchItems(items)
        return items
      })
  })

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
                          <ListItemLink to={`/app/${name}`} key={id}>
                            <div className={classes.columnName}>{name}</div>
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
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  mutate(name).then(() => {
                                    refetch()
                                  })
                                }}
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
                          </ListItemLink>
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
    </Container>
  )
}
