import React from 'react'
import { FormControl, Container, Grid, MenuItem, Select, Button, InputLabel, TextField, Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { IApplicationInstance, IHistoryLog } from '../../../../types/Application'
import { ApplicationInstanceTable } from './ApplicationInstanceTable/ApplicationInstanceTable'
import { ApplicationHistoryLog } from './ApplicationHistoryLog/ApplicationHistoryLog'
import API from '../../../../api'

interface IApplicationPageTabDeployProps {
  description: string
  templateVersion: string
  instances: IApplicationInstance[]
  possibleVersions: string[]
  lastRelease: string
  history: IHistoryLog[]
}

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      marginTop: '1%',
      marginBottom: '1%',
    },
    hrStyle: {
      marginBottom: '1%',
      height: '3px',
      color: '#3F51B5',
      borderWidth: '0',
      backgroundColor: '#3F51B5',
    },
    h3Style: {
      marginBottom: '1.5px',
      padding: '5px',
    },
    buttonContainerStyle: {
      marginRight: '4%',
    },
    inputLabelStyle: {
      color: '#3F51B5',
    },
  })
)

export const ApplicationPageTabDeploy = ({
  description,
  templateVersion,
  instances,
  possibleVersions,
  lastRelease,
  history,
}: IApplicationPageTabDeployProps) => {
  const classes = useStyles()
  const { name: appName } = useParams<{ name: string }>()

  const [version, setVersion] = React.useState(possibleVersions[possibleVersions.length - 1])
  const [alias, setAlias] = React.useState('')

  const [mutate] = useMutation(API.deploymentController.deployInstance)

  const handleVersionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setVersion(event.target.value as string)
  }

  const handleAliasChange = (event: React.ChangeEvent<{ value: string }>) => {
    setAlias(event.target.value)
  }

  const onClickDeploy = () => {
    mutate({ alias, version, name: appName })
    setVersion('')
    setAlias('')
  }

  console.log(templateVersion)

  return (
    <div>
      <Container className={classes.formControl}>
        <Grid container direction='row' justify='space-around' alignItems='center'>
          <Grid item>
            <h3 className={classes.h3Style}>Description: {description}</h3>
            <h3 className={classes.h3Style}>Last release: {lastRelease}</h3>
          </Grid>
          <Grid item>
            <InputLabel className={classes.inputLabelStyle}>Version</InputLabel>
            <FormControl variant='filled'>
              <Select value={version} onChange={handleVersionChange}>
                {possibleVersions.map((vers) => (
                  <MenuItem key={vers} value={vers}>
                    {vers}
                  </MenuItem>
                ))}
              </Select>
              <TextField label='Alias' variant='filled' value={alias} onChange={handleAliasChange} />
            </FormControl>
          </Grid>
          <Grid item className={classes.buttonContainerStyle}>
            <Button variant='contained' disabled={!version} onClick={onClickDeploy}>
              Deploy
            </Button>
          </Grid>
        </Grid>
      </Container>
      <hr className={classes.hrStyle} />
      <Container>
        <Grid container spacing={5} direction='column' justify='space-around' alignItems='center'>
          <Box m={2}>
            <ApplicationInstanceTable data={instances} />
          </Box>
          <Box m={2}>
            <ApplicationHistoryLog variant={history} />
          </Box>
        </Grid>
      </Container>
    </div>
  )
}
