import React from 'react'
import { Button } from '@material-ui/core/'
import SaveIcon from '@material-ui/icons/Save'

export default function SaveButton() {
  return (
    <Button variant='contained' size='large' startIcon={<SaveIcon />}>
      Save
    </Button>
  )
}
