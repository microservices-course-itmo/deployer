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
import { Appbar } from '../Appbar/Appbar'

const useStyles = makeStyles(({ spacing }) => ({
  formControl: {
    marginTop: '5%',
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
    width: '30%',
  },
  tables: {
    display: 'flex',
  },
}))

export const Deploy = ({ data }: { data: IApplicationData }) => {
  const { versions = [], instances, dateCreated, description, logs } = data

  const classes = useStyles()
  const { name: appName } = useParams<{ name: string }>()

  const [version, setVersion] = React.useState(versions[versions.length - 1])
  const [instanceItems, setInstanceItems] = React.useState<IApplicationInstance[]>(instances)
  const [alias, setAlias] = React.useState('')

  const [mutate] = useMutation(API.deploymentController.deployInstance, {
    onSuccess: (newItems) => {
      setInstanceItems((items) => [...items, newItems])
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
      <Appbar />
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
            <Tab value={SecondTableTypes.VOLUMES} label='VOLUMES' />
          </Tabs>
        </Container>
      </Container>
      <hr className={classes.hrStyle} />
      <div style={{ display: 'flex' }}>
        <Container style={{ width: '70%' }}>
          <InstancesTable data={instanceItems} />
          <HistoryLog variant={logs} />
        </Container>
        <SecondTable className={classes.secondTable} data={data} type={secondTableTab} />
      </div>
    </div>
  )
}
