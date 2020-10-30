import React from 'react'
import { FormControl, Container, Grid, MenuItem, Select, Button, InputLabel } from '@material-ui/core'
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IApplicationInstance } from '../../../../types/Application'

interface IApplicationPageTabDeployProps {
  description?: string
  templateVersion?: string
  instances?: IApplicationInstance[]
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }),
// );

export const ApplicationPageTabDeploy = ({
  description,
  templateVersion,
  instances,
}: IApplicationPageTabDeployProps) => (
  <div>
    <Container>
      <Grid container direction='row' justify='space-between' alignItems='flex-start'>
        <Grid item>
          <h3>Description: {description}</h3>
          <h3>Last release: V1.5</h3>
        </Grid>
        <Grid item>
          <InputLabel id='demo-simple-select-filled-label'>Version</InputLabel>
          <FormControl variant='filled'>
            <Select labelId='demo-simple-select-filled-label' id='demo-simple-select-filled' value={25}>
              <MenuItem value=''>
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
    {templateVersion}
    {console.log(JSON.stringify(instances))}
  </div>
)
