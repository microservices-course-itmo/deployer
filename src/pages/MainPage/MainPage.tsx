import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
)

const services = ['deployment-service-1', 'deployer-demo', 'demo-3', 'service-demo']

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component='a' {...props} />
}

export const MainPage = () => {
  const classes = useStyles()

  const [searchTerm, setSearchTerm] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])
  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }
  React.useEffect(() => {
    const results = services.filter((service) => service.toLowerCase().includes(searchTerm))
    setSearchResults(results)
  }, [searchTerm])

  return (
    <div className={classes.root}>
      <input type='text' placeholder='Search' value={searchTerm} onChange={handleChange} />
      {searchResults.map((item) => (
        <li>{item}</li>
      ))}
      <List component='nav' aria-label='main mailbox folders'>
        <ListItemLink href='deployment-service-1'>
          <ListItemText primary='deployment-service-1' />
        </ListItemLink>
        <ListItemLink href='deployer-demo'>
          <ListItemText primary='deployer-demo' />
        </ListItemLink>
      </List>
      <Divider />
      <List component='nav' aria-label='secondary mailbox folders'>
        <ListItemLink href='demo-3'>
          <ListItemText primary='demo-3' />
        </ListItemLink>
        <ListItemLink href='service-demo'>
          <ListItemText primary='service-demo' />
        </ListItemLink>
      </List>
    </div>
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
