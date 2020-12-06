import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Container, Grid, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme: Theme) =>
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
    container: {
      alignItems: 'center',
    },
    main: {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
    },
  })
)

const services = [
  { name: 'deployment-service-1' },
  { name: 'deployer-demo' },
  { name: 'demo-3' },
  { name: 'service-demo' },
]

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component='a' {...props} />
}

export const MainPage = () => {
  const classes = useStyles()
  return (
    <Container className={classes.main}>
      <Grid container direction='column' justify='space-around' alignItems='center'>
        <div className={classes.root}>
          <Autocomplete
            id='free-solo-2-demo'
            disableClearable
            options={services.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label='Search input'
                margin='normal'
                variant='outlined'
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
          <List component='nav' aria-label='main mailbox folders'>
            <ListItemLink href='deployment-service-1'>
              <ListItemText primary='deployment-service-1' />
            </ListItemLink>
            <ListItemLink href='deployer-demo'>
              <ListItemText primary='deployer-demo' />
            </ListItemLink>
            <ListItemLink href='demo-3'>
              <ListItemText primary='demo-3' />
            </ListItemLink>
            <ListItemLink href='service-demo'>
              <ListItemText primary='service-demo' />
            </ListItemLink>
          </List>
        </div>
      </Grid>
    </Container>
  )
}

// import { useQuery } from 'react-query'
/*
export const MainPage = () => {
  const { isLoading, isError, data } = useQuery<string[]>('applicationNames', () =>
    fetch(`${process.env.API}/names`).then((res) => res.json())
  )

  if (isError) {
    return <span>Error</span>
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <div>
      {data!.map((name) => (
        <a key={name} href={`${process.env.MAIN_URL}app/${name}`} style={{ display: 'block' }}>
          {name}
        </a>
      ))}
    </div>
  )
}
*/
