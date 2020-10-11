/* eslint-disable react/no-array-index-key */
import React from 'react'
import cx from 'classnames'
import Skeleton from '@material-ui/lab/Skeleton'

import useStyles from '../Table.styles'
import getGridTemplate from '../getGridTemplate'

const TableLoading = ({
  gridTemplate,
  withStartAdornment,
  withEndAdornment,
  withActions,
}) => {
  const classes = useStyles()

  return (
    <>
      {Array.from({ length: 5 }, () => (
        <div
          className={cx(
            classes.gridRoot,
            classes.gridRow,
            withStartAdornment && classes.startAdornmentOffset,
            withEndAdornment && classes.endAdornmentOffset,
            withActions && classes.actionsOffset,
            classes.skeletonRow
          )}
          key={`${new Date().getTime()}_${Math.random()}`}
          style={{
            gridTemplateColumns: getGridTemplate(gridTemplate),
          }}
        >
          {Array.from({ length: gridTemplate.length }, () => (
            <Skeleton key={Math.random()} width='calc(100%)' />
          ))}
        </div>
      ))}
    </>
  )
}

TableLoading.defaultProps = {
  gridTemplate: undefined,
  withStartAdornment: false,
  withEndAdornment: false,
  withActions: false,
  classes: {},
}

export default TableLoading
