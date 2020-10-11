import React, { useState } from 'react'
import cx from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { Menu } from '../../Menu'
import preventClickThrough from '../../../utils/preventClickThrough'
import useStyles from '../Table.styles'

const TableRow = ({
  className,
  style,
  gridTemplate,
  centered,
  noHover,
  noBorder,
  color,
  selected,
  children,
  startAdornment,
  endAdornment,
  actions,
  withActions,
  withStartAdornment,
  withEndAdornment,
  startAdornmentShow,
  endAdornmentShow,
  onClick,
  component: Component,
  ...otherProps
}) => {
  const [actionsAnchor, setActionsAnchor] = useState(null)
  const classes = useStyles()

  return (
    <Component
      className={cx(className, classes.gridRoot, classes.gridRow, {
        [classes.rowNoHover]: noHover,
        [classes.rowNoBorder]: noBorder,
        [classes.rowPointer]: Boolean(onClick),
        [classes.centered]: centered,
        [classes.startAdornmentOffset]: Boolean(
          startAdornment || withStartAdornment
        ),
        [classes.endAdornmentOffset]: Boolean(endAdornment || withEndAdornment),
        [classes.actionsOffset]: Boolean(actions || withActions),
        [classes.endAdornmentWithActionsOffset]: Boolean(
          (endAdornment || withEndAdornment) && (actions || withActions)
        ),
        [classes.rowSelected]: selected && color === 'default',
        [classes.rowSelectedPrimary]: selected && color === 'primary',
        [classes.rowSelectedError]: selected && color === 'error',
        [classes.rowSelectedWarning]: selected && color === 'warning',
        [classes.rowSelectedSuccess]: selected && color === 'success',
      })}
      style={{ gridTemplateColumns: gridTemplate, ...(style || {}) }}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {Boolean(startAdornment && startAdornmentShow !== 'never') &&
        React.cloneElement(startAdornment, {
          className: cx(classes.rowStartAdornment, {
            [classes.centeredAdornment]: centered,
            [classes.rowAdornmentHover]: startAdornmentShow === 'hover',
          }),
        })}
      {React.Children.map(children, (child) => child)}
      {Boolean(endAdornment && endAdornmentShow !== 'never') &&
        React.cloneElement(endAdornment, {
          className: cx(classes.rowEndAdornment, {
            [classes.centeredAdornment]: centered,
            [classes.rowAdornmentHover]: endAdornmentShow === 'hover',
            [classes.rowEndAdornmentWithActions]: Boolean(
              actions || withActions
            ),
          }),
        })}
      {Boolean(actions) && (
        <>
          <IconButton
            size='small'
            className={cx(classes.rowAction, {
              [classes.centeredAdornment]: centered,
            })}
            onClick={(e) => {
              return preventClickThrough(e, () => setActionsAnchor(e.target))
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            open={Boolean(actionsAnchor)}
            anchorEl={actionsAnchor}
            onClose={() => setActionsAnchor(null)}
            anchorOrigin={{ horizontal: 'right' }}
            transformOrigin={{ horizontal: 'right' }}
          >
            {actions}
          </Menu>
        </>
      )}
    </Component>
  )
}

TableRow.defaultProps = {
  className: undefined,
  style: undefined,
  gridTemplate: undefined,
  noHover: false,
  centered: false,
  noBorder: false,
  selected: false,
  color: 'default',
  actions: undefined,
  withActions: false,
  withStartAdornment: false,
  withEndAdornment: false,
  startAdornment: undefined,
  endAdornment: undefined,
  onClick: undefined,
  classes: {},
  component: 'div',
  startAdornmentShow: 'always',
  endAdornmentShow: 'always',
}

export default TableRow
