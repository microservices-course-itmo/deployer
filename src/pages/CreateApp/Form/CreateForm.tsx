import React from 'react'
import { Box, Grid, TextField, MenuItem, Container } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import EnvTable from './EnvTable/EnvTable'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      background:
        'url(https://cdn.pixabay.com/photo/2016/10/20/18/35/sunrise-1756274_960_720.jpg)',
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

interface ICreateFormProps {
  className?: string,
}

export default function CreateForm({ className }: ICreateFormProps) {
  const [currency, setCurrency] = React.useState('1')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value)
  }
  const classes = useStyles()
  return (
    <Container className={className}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <h2>App Name</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id='standart-select-currency'
            select
            label='Select service'
            value={currency}
            onChange={handleChange}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Box>
          <h2>Environment variables</h2>
          <EnvTable />
        </Box>
      </Grid>
    </Container>
  )
}
