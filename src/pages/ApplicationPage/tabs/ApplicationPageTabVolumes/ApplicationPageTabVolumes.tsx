import React from 'react'
import { List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

interface IApplicationPageTabVolumesProps {
  volumes: string[]
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: '#DFDFDF',
    },
  })
)
export const ApplicationPageTabVolumes = ({ volumes }: IApplicationPageTabVolumesProps) => {
  const [checked, setChecked] = React.useState(volumes)

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  const classes = useStyles()
  return (
    <div>
      <h3>ApplicationPageTabVolumes</h3>
      <List dense className={classes.root}>
        {volumes.map((vol) => {
          const labelId = `checkbox-list-secondary-label-${vol}`
          return (
            <ListItem key={vol} button>
              <ListItemText id={labelId} primary={`Volume: ${vol}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge='end'
                  onChange={handleToggle(vol)}
                  checked={checked.indexOf(vol) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
