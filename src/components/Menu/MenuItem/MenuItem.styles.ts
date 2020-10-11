import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ spacing }) => ({
  root: {
    minHeight: spacing(4.5),
    paddingLeft: spacing(1.25),
    paddingRight: spacing(1.25),
    '&:focus': {
      outline: 'none',
    },
  },
  children: {
    flexGrow: 1,
  },
  endAdornment: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: spacing(2.5),
  },
  startAdornment: {
    alignItems: 'center',
    display: 'flex',
    marginRight: spacing(1.25),
  },
}))
