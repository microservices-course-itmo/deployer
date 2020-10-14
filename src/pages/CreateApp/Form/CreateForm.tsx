import React from 'react'
import {
  Paper,
  Box,
  Grid,
  TextField,
  MenuItem,
  Container,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import EnvTable from './EnvTable/EnvTable'
import SaveButton from './SaveButton/SaveButton'

const useStyles = makeStyles(() =>
  createStyles({
    fullPage: {
      color: '#F0F1EC',
      margin: 0,
      background:
        'no-repeat url(https://cdn.pixabay.com/photo/2016/10/20/18/35/sunrise-1756274_960_720.jpg)',
      backgroundSize: '100%',
      width: '100%',
      minHeight: '100vh',
      height: '100%',
    },

    inputArea: {
      borderRadius: '3%',
      background: '#F0F1EC',
      margin: '2% 0',
    },

    selectArea: {
      margin: '2% 0',
      borderRadius: '3%',
      padding: '5px 10px',
      background: '#F0F1EC',
    },

    buttonSaveBox: {
      marginTop: '1%',
    },
  })
)

const currencies = [
  {
    value: '1',
    label: 'FirstService',
  },
  {
    value: '2',
    label: 'SecondService',
  },
]

export default function CreateForm() {
  const [currency, setCurrency] = React.useState('1')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value)
  }
  const classes = useStyles()
  return (
    <Paper className={classes.fullPage}>
      <Container maxWidth='lg'>
        <Grid
          container
          direction='column'
          justify='flex-start'
          alignItems='flex-start'
        >
          <Box>
            <Grid item>
              <h2>App Name</h2>
              <TextField
                className={classes.inputArea}
                id='filled-basic'
                label='Enter name of App'
                variant='filled'
              />
            </Grid>
          </Box>
          <Grid item>
            <Box>
              <TextField
                className={classes.selectArea}
                id='standart-select-currency'
                select
                value={currency}
                onChange={handleChange}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <h2>Environment variables</h2>
          <EnvTable />
        </Box>
        <Grid
          container
          direction='column'
          alignItems='flex-end'
          justify='flex-end'
          className={classes.buttonSaveBox}
        >
          <Grid item>
            <SaveButton />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  )
}
