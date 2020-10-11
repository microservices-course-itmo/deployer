import React from 'react'
import cx from 'classnames'
import Typography from '@material-ui/core/Typography'

import useStyles from '../Table.styles'

const TableEmpty = ({
  emptyText,
  withStartAdornment,
  withEndAdornment,
  withActions,
}) => {
  const classes = useStyles()

  return (
    <div
      className={cx(
        classes.gridRoot,
        classes.gridRow,
        classes.emptyText,
        classes.rowNoHover,
        withStartAdornment && classes.startAdornmentOffset,
        withEndAdornment && classes.endAdornmentOffset,
        withActions && classes.actionsOffset
      )}
    >
      <Typography>{emptyText}</Typography>
    </div>
  )
}

TableEmpty.defaultProps = {
  withStartAdornment: false,
  withEndAdornment: false,
  withActions: false,
  classes: {},
}

export default TableEmpty
