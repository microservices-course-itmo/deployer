import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { CircularProgress, Container, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import Alert from '@material-ui/lab/Alert'
import { Appbar } from '../Appbar/Appbar'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: 'center',
      width: '600px',
      height: '600px',
      position: 'absolute',
      top: '35%',
      left: '45%',
      margin: '-200px 0 0 -200px',
    },
    main: {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
    },
    input: {
      width: '100%',
    },
  })
)

const filterList = (value: string, list: string[]) =>
  list.filter((item) => item.toLowerCase().includes(value.replaceAll(' ', '').toLowerCase()))

const ListItemLink = (props: ListItemProps<Link, { button?: true }>) => {
  return <ListItem button component={Link} {...props} />
}

export const MainPage = () => {
  const classes = useStyles()

  const [inputValue, setInputValue] = useState('')

  const [searchItems, setSearchItems] = useState<string[]>([])

  const { isLoading, isError, data } = useQuery<string[]>('applicationNames', () =>
    fetch(`${process.env.API}/application/names`)
      .then((res) => res.json())
      .then((items) => {
        if (items.length) {
          setSearchItems(items)
        } else {
          throw new Error('Not Found')
        }
        return items
      })
  )

  const handleValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target
    setInputValue(value as string)
    setSearchItems(filterList(value as string, data!))
  }

  return (
    <Container className={classes.main}>
      <Appbar />
      <Grid container direction='column' justify='space-around' alignItems='center'>
        <div className={classes.root}>
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
            <List component='nav' aria-label='main mailbox folders'>
              {searchItems.map((item) => (
                <ListItemLink to={`/app/${item}`} key={item}>
                  <ListItemText primary={item} />
                </ListItemLink>
              ))}

              {!searchItems.length && <span>no search results</span>}
            </List>
          )}
        </div>
      </Grid>
    </Container>
  )
}
