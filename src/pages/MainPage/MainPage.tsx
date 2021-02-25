import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Button, CircularProgress, Container, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import Alert from '@material-ui/lab/Alert'
import { Appbar } from '../Appbar/Appbar'
import { IApplicationData } from '../../types/Application'

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      marginTop: '64px',
    },
    main: {
      width: '50%',
      display: 'flex',
    },
    input: {
      width: '100%',
    },
    listRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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

  const { isLoading, isError, data } = useQuery<IApplicationData[]>('applicationNames', () =>
    fetch(`${process.env.API}/application/names`)
      .then((res) => res.json())
      .then((items) => {
        console.log(items)
        if (!items.length) {
          throw new Error('Not Found')
        }
        return items
      })
      .then((items) => {
        return Promise.all(
          items.map((application: string) => {
            return fetch(`${process.env.API}/application/get/byName/${application}`).then((res) => res.json())
          })
        )
      })
      .then((items: any[]) => {
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
              disabled={isError || isLoading}
              className={classes.input}
              label='Search input'
              margin='normal'
              variant='outlined'
              InputProps={{ type: 'search' }}
              value={inputValue}
              onChange={handleValueChange}
            />
            {isError ? (
              <Alert severity='error'>This is an error alert — check it out!</Alert>
            ) : isLoading ? (
              <CircularProgress />
            ) : (
              searchItems.length && (
                <List component='nav' aria-label='main mailbox folders'>
                  <ListItem className={classes.listRow}>
                    <div>APP NAME:</div>
                    <div>ID:</div>
                    <div>VERSION:</div>
                  </ListItem>
                  {searchItems.map((item) => {
                    const { id, name, templateVersion } = item
                    return (
                      <ListItemLink to={`/app/${name}`} key={id} className={classes.listRow}>
                        <div>{name}</div>
                        <div>{id}</div>
                        <div>{templateVersion}</div>
                      </ListItemLink>
                    )
                  })}
                  {!searchItems.length && <span>no search results</span>}
                </List>
              )
            )}
          </div>
          <div style={{ padding: '23px 0 0 20px' }}>
            <Button style={{ width: '120px' }} variant='contained' size='large' color='primary' href='/new-app'>
              New app
            </Button>
          </div>
        </div>
      </Grid>
    </Container>
  )
}
