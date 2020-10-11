import React from 'react'
import cx from 'classnames'

import useStyles from '../Table.styles'

const TableHead = ({
  className,
  style,
  gridTemplate,
  withStartAdornment,
  withEndAdornment,
  withActions,
  children,
  ...otherProps
}) => {
  const classes = useStyles()

  return (
    <div
      className={cx(
        className,
        classes.gridRoot,
        classes.gridEdge,
        classes.gridHead,
        {
          [classes.startAdornmentOffset]: Boolean(withStartAdornment),
          [classes.endAdornmentOffset]: Boolean(withEndAdornment),
          [classes.actionsOffset]: Boolean(withActions),
          [classes.endAdornmentWithActionsOffset]: Boolean(
            withEndAdornment && withActions
          ),
        }
      )}
      style={{ gridTemplateColumns: gridTemplate, ...(style || {}) }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {React.Children.map(children, (child) =>
        child ? React.cloneElement(child) : null
      )}
    </div>
  )
}

TableHead.defaultProps = {
  className: undefined,
  style: undefined,
  gridTemplate: undefined,
  withStartAdornment: false,
  withEndAdornment: false,
  withActions: false,
  classes: {},
}

export default TableHead
