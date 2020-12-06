import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Container, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

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
  list.filter((item) => item.toLowerCase().includes(value.toLowerCase()))

const ListItemLink = (props: ListItemProps<Link, { button?: true }>) => {
  return <ListItem button component={Link} {...props} />
}

export const MainPage = () => {
  const classes = useStyles()

  const { isLoading, isError, data } = useQuery<string[]>('applicationNames', () =>
    fetch(`${process.env.API}/names`).then((res) => res.json())
  )

  const [value, setValue] = useState('')

  const handleValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string)
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <Container className={classes.main}>
      <Grid container direction='column' justify='space-around' alignItems='center'>
        <div className={classes.root}>
          <TextField
            className={classes.input}
            label='Search input'
            margin='normal'
            variant='outlined'
            InputProps={{ type: 'search' }}
            value={value}
            onChange={handleValueChange}
          />
          <List component='nav' aria-label='main mailbox folders'>
            {filterList(value, data!).map((item) => (
              <ListItemLink to={`/app/${item}`}>
                <ListItemText primary={item} />
              </ListItemLink>
            ))}
          </List>
        </div>
      </Grid>
    </Container>
  )
}

// import { useQuery } from 'react-query'
// import { Link } from 'react-router-dom'
//
// export const MainPage = () => {
//   const { isLoading, isError, data } = useQuery<string[]>('applicationNames', () =>
//     fetch(`${process.env.API}/names`).then((res) => res.json())
//   )
//
//   if (isError) {
//     return <span>Error</span>
//   }
//
//   if (isLoading) {
//     return <span>Loading...</span>
//   }
//
//   return (
//     <div>
//       {data!.map((name) => (
//         <Link key={name} to={`/app/${name}`} style={{ display: 'block' }}>
//           {name}
//         </Link>
//       ))}
//     </div>
//   )
// }
