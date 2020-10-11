import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import { useRecoilState } from 'recoil'
import atoms from '../atoms'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}))

function SearchField() {
  const classes = useStyles()
  const [query, setQuery] = useRecoilState(atoms.search.searchQuery)

  return (
    <Paper component='form' className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='Search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Paper>
  )
}

export default SearchField
