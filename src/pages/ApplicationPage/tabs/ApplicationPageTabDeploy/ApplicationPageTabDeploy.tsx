import React from 'react'
import { FormControl, Container, Grid, MenuItem, Select, Button, InputLabel, TextField } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { IApplicationInstance } from '../../../../types/Application'
import { ApplicationInstanceTable } from './ApplicationInstanceTable/ApplicationInstanceTable'

interface IApplicationPageTabDeployProps {
  description: string
  templateVersion: string
  instances: IApplicationInstance[]
  possibleVersions: string[]
  lastRelease: string
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
  possibleVersions,
  lastRelease,
}: IApplicationPageTabDeployProps) => {
  console.log(templateVersion)
  const [vers, setVers] = React.useState(possibleVersions[possibleVersions.length - 1])
  const handleVersionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setVers(event.target.value as string)
  }
  const [alias, setAlias] = React.useState('')
  const handleAliasChange = (event: React.ChangeEvent<{ value: string }>) => {
    setAlias(event.target.value)
  }
  const onClickDeploy = () => {
    setVers('')
    setAlias('')
  }
  const classes = useStyles()
  return (
    <div>
      <Container className={classes.formControl}>
        <Grid container direction='row' justify='space-between' alignItems='center'>
          <Grid item>
            <h3>Description: {description}</h3>
            <h3>Last release: {lastRelease}</h3>
          </Grid>
          <Grid item>
            <InputLabel id='demo-simple-select-filled-label'>Version</InputLabel>
            <FormControl variant='filled'>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={vers}
                onChange={handleVersionChange}
              >
                {possibleVersions.map((version) => (
                  <MenuItem key={version} value={version}>
                    {version}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                required
                id='standard-required'
                label='Required'
                variant='filled'
                value={alias}
                onChange={handleAliasChange}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button variant='contained' disabled={!vers || !alias} onClick={onClickDeploy}>
              Deploy
            </Button>
          </Grid>
        </Grid>
      </Container>
      <ApplicationInstanceTable data={instances} />
    </div>
  )
}
