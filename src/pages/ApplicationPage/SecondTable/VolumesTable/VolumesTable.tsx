import React from 'react'
import { List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface IApplicationPageTabVolumesProps {
  volumes: string[]
}

const useStyles = makeStyles({
  saveBtn: {
    marginTop: 10,
  },
})

export const VolumesTable = ({ volumes = [] }: IApplicationPageTabVolumesProps) => {
  const classes = useStyles()
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

  return (
    <div>
      <List dense>
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
