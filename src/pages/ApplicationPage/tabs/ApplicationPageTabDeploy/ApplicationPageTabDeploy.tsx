import React from 'react'
import { FormControl, Container, Grid, MenuItem, Select, Button, InputLabel } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { IApplicationInstance } from '../../../../types/Application'
import { ApplicationInstanceTable } from './ApplicationInstanceTable/ApplicationInstanceTable'

interface IApplicationPageTabDeployProps {
  description: string
  templateVersion: string
  instances: IApplicationInstance[]
}

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      marginTop: '1%',
    },
  })
)

export const ApplicationPageTabDeploy = ({
  description,
  templateVersion,
  instances,
}: IApplicationPageTabDeployProps) => {
  console.log(templateVersion)
  console.log(JSON.stringify(instances))
  const [currency, setCurrency] = React.useState('1')
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCurrency(event.target.value)
  // }
  const classes = useStyles()
  return (
    <div>
      <Container className={classes.formControl}>
        <Grid container direction='row' justify='space-between' alignItems='center'>
          <Grid item>
            <h3>Description: {description}</h3>
            <h3>Last release: V1.5</h3>
          </Grid>
          <Grid item>
            <InputLabel id='demo-simple-select-filled-label'>Version</InputLabel>
            <FormControl variant='filled'>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={currency}
              >
                <MenuItem value='none'>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>V1.5</MenuItem>
                <MenuItem value={20}>V1.6</MenuItem>
                <MenuItem value={30}>V1.7</MenuItem>
              </Select>
            </FormControl>
            <h3>Alias: mongo</h3>
          </Grid>
          <Grid item>
            <Button variant='contained'>Deploy</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}