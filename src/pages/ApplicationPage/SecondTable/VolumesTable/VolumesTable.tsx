import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  TextField,
  Grid,
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

interface IApplicationPageTabVolumesProps {
  volumes: string[]
}

const useStyles = makeStyles({
  saveBtn: {
    marginTop: 10,
  },
  ListContainer: {
    width: '350px',
    backgroundColor: '#ffffff',
  },
  listItemHeader: {
    textAlign: 'center',
  },
  listItemH2: {
    margin: 0,
  },
})

export const VolumesTable = ({ volumes }: IApplicationPageTabVolumesProps) => {
  const classes = useStyles()
  const [vols, setVols] = React.useState(volumes)
  const [newVol, setNewVol] = React.useState('')

  const onClickAddNewVolume = (volume: string) => {
    let isExist = false
    if (
      vols.map((vol) => {
        if (vol === volume) {
          isExist = true
        }
        return 0
      })
    )
      if (newVol === '') {
        alert('Поле пустое. Введите значение!')
      } else if (isExist) {
        alert('Такой порт уже сущетсвует! Измените существующую')
      } else {
        setVols((prevState) => [...prevState, volume])
      }
  }

  const onClickDelete = (v: string) => {
    setVols(vols.filter((vol) => vol !== v))
  }

  const handleChangeVolume = (index: number) => (event: any) => {
    const { value } = event.target
    // eslint-disable-next-line prefer-const
    let newArr = [...vols]
    newArr[index] = value
    setVols(newArr)
  }

  const handleChangeNewVolume = (event: any) => {
    const { value } = event.target
    setNewVol(value)
  }

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <List className={classes.ListContainer}>
        <ListItem>
          <ListItemText className={classes.listItemHeader}>
            <h2 className={classes.listItemH2}>Volumes</h2>
          </ListItemText>
        </ListItem>
        {vols.map((vol, index) => (
          <ListItem>
            <TextField id='standard' variant='filled' value={vol} onChange={handleChangeVolume(index)} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => onClickDelete(vol)} aria-label='delete'>
                <DeleteIcon fontSize='large' />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem>
          <TextField label='Volume' id='standard' onChange={handleChangeNewVolume} variant='filled' value={newVol} />
          <ListItemSecondaryAction>
            <IconButton aria-label='add'>
              <AddCircleOutlineIcon
                onClick={() => onClickAddNewVolume(newVol)}
                fontSize='large'
                style={{ color: '#3F51B5' }}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Grid container direction='row' justify='flex-end' alignItems='center'>
        <Button className={classes.saveBtn} variant='contained' size='large' color='primary'>
          Save
        </Button>
      </Grid>
    </Grid>
  )
}
