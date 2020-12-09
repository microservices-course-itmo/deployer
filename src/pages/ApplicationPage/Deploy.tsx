import React, { useState } from 'react'
import {
  FormControl,
  Container,
  Grid,
  MenuItem,
  Select,
  Button,
  InputLabel,
  TextField,
  Box,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { IApplicationInstance, IApplicationData } from '../../types/Application'
import { InstancesTable } from './InstancesTable/InstancesTable'
import { HistoryLog } from './HistoryLog/HistoryLog'
import API from '../../api'
import { SecondTable } from './SecondTable'
import { SecondTableTypes } from './types'

const useStyles = makeStyles(({ spacing }) => ({
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
  secondTable: {
    marginLeft: spacing(2),
  },
  tables: {
    display: 'flex',
  },
}))

export const Deploy = ({
  data: { versions = [], description, dateCreated, logs, instances, ...props },
}: {
  data: IApplicationData
}) => {
  const classes = useStyles()
  const { name: appName } = useParams<{ name: string }>()

  const [version, setVersion] = React.useState(versions[versions.length - 1])
  const [instanceItems, setInstanceItems] = React.useState<IApplicationInstance[]>(instances)
  const [alias, setAlias] = React.useState('')

  const [mutate] = useMutation(API.deploymentController.deployInstance, {
    onSuccess: (data) => {
      setInstanceItems((items) => [...items, data])
    },
  })

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

  const [secondTableTab, setSecondTableTab] = useState(SecondTableTypes.ENVIRONMENT)

  const createdAt = (dateCreated ? new Date(dateCreated) : new Date()).toISOString().split('T')[0]

  return (
    <div>
      <Container className={classes.formControl}>
        <Grid container direction='row' justify='space-around' alignItems='center'>
          <Grid item>
            <Typography variant='h5'>Description: {description}</Typography>
            <Typography variant='h6'>Last release: {createdAt}</Typography>
          </Grid>
          <Grid item>
            <InputLabel className={classes.inputLabelStyle}>Version</InputLabel>
            <FormControl variant='filled'>
              <Select value={version} onChange={handleVersionChange}>
                {versions.map((vers) => (
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
        <Container>
          <Tabs value={secondTableTab} onChange={(e, newTab) => setSecondTableTab(newTab)}>
            <Tab value={SecondTableTypes.ENVIRONMENT} label='ENV' />
            <Tab value={SecondTableTypes.PORTS} label='PORTS' />
            <Tab value={SecondTableTypes.VOLUMES} label='VOLUMS' />
          </Tabs>
        </Container>
      </Container>
      <hr className={classes.hrStyle} />
      <Container>
        <Grid container spacing={5} direction='column'>
          <Box m={2} className={classes.tables}>
            <InstancesTable data={instanceItems} />
            <SecondTable className={classes.secondTable} {...props} type={secondTableTab} />
          </Box>
          <Box m={2}>
            <HistoryLog variant={logs} />
          </Box>
        </Grid>
      </Container>
    </div>
  )
}
