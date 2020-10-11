import React, { useRef, useEffect, useState } from 'react'
import cx from 'classnames'
import { List, AutoSizer } from 'react-virtualized'
import { useTheme } from '@material-ui/core/styles'

import TableLoading from './TableLoading'
import TableEmpty from './TableEmpty'

import useStyles from './Table.styles'
import getGridTemplate from './getGridTemplate'

const TABLE_VARIANT = {
  DEFAULT: 'default',
  SCROLLABLE: 'scrollable',
  VIRTUAL: 'virtual',
}

const Table = (
  {
    className,
    gridTemplate,
    withStartAdornment,
    withEndAdornment,
    withActions,
    headerContent,
    footerContent,
    virtualProps,
    scrollProps,
    children,
    emptyText,
    isLoading,
    ...otherProps
  },
  ref
) => {
  const DefaultTheme = useTheme()
  const classes = useStyles()

  const isTableEmpty = React.Children.toArray(children).length === 0

  const tableRef = useRef(null)
  const [tableHeight, setTableHeight] = useState(0)

  useEffect(() => {
    setTableHeight(tableRef.current.clientHeight)
  }, [])

  const tableEdgesHeight =
    // eslint-disable-next-line no-nested-ternary
    footerContent && headerContent
      ? DefaultTheme.spacing(14)
      : footerContent || headerContent
      ? DefaultTheme.spacing(7.5)
      : DefaultTheme.spacing(0)

  return (
    <div
      ref={tableRef}
      className={cx(className, classes.wrapper, classes.root)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {Boolean(headerContent) &&
        React.cloneElement(headerContent, {
          ...headerContent.props,
          gridTemplate: getGridTemplate(
            headerContent.props.gridTemplate || gridTemplate
          ),
          withStartAdornment: Boolean(withStartAdornment),
          withEndAdornment: Boolean(withEndAdornment),
          withActions: Boolean(withActions),
        })}
      {Boolean(isLoading && gridTemplate) && (
        <TableLoading
          gridTemplate={gridTemplate}
          withStartAdornment={Boolean(withStartAdornment)}
          withEndAdornment={Boolean(withEndAdornment)}
          withActions={Boolean(withActions)}
        />
      )}
      {Boolean(isTableEmpty && !isLoading && emptyText) && (
        <TableEmpty
          withStartAdornment={Boolean(withStartAdornment)}
          withEndAdornment={Boolean(withEndAdornment)}
          withActions={Boolean(withActions)}
          emptyText={emptyText}
        />
      )}
      {!isLoading && (
        <AutoSizer
          style={{
            height:
              virtualProps.rowCount && virtualProps.rowHeight
                ? Math.min(
                    tableHeight - tableEdgesHeight,
                    virtualProps.rowCount * virtualProps.rowHeight
                  )
                : tableHeight - tableEdgesHeight,
          }}
        >
          {({ height, width }) => (
            <List
              ref={(newRef) => {
                // eslint-disable-next-line
                ref.current = newRef
              }}
              height={height - tableEdgesHeight}
              width={width}
              onRowsRendered={() => {}}
              rowCount={virtualProps.rowCount}
              rowHeight={virtualProps.rowHeight}
              noRowsRenderer={virtualProps.noRowsRenderer}
              onScroll={virtualProps.onScroll}
              overscanRowCount={virtualProps.overscanRowCount}
              scrollToAlignment={virtualProps.scrollToAlignment}
              scrollToIndex={virtualProps.scrollToIndex}
              scrollTop={virtualProps.scrollTop}
              style={{ outline: 'none', ...virtualProps.style }}
              tabIndex={virtualProps.tabIndex}
              rowRenderer={(props) => {
                return virtualProps.rowRenderer(
                  Object.assign(props, {
                    gridTemplate: getGridTemplate(gridTemplate),
                  })
                )
              }}
            />
          )}
        </AutoSizer>
      )}
      {Boolean(footerContent) &&
        React.cloneElement(footerContent, {
          gridTemplate: getGridTemplate(
            footerContent.props.gridTemplate || gridTemplate
          ),
          withStartAdornment: Boolean(withStartAdornment),
          withEndAdornment: Boolean(withEndAdornment),
          withActions: Boolean(withActions),
          ...footerContent.props,
        })}
    </div>
  )
}

Table.defaultProps = {
  className: undefined,
  headerContent: undefined,
  footerContent: undefined,
  gridTemplate: undefined,
  emptyText: undefined,
  variant: TABLE_VARIANT.DEFAULT,
  isLoading: false,
  withStartAdornment: false,
  withEndAdornment: false,
  withActions: false,
  children: undefined,
  classes: {},
  virtualProps: {
    isRowLoaded: () => {},
    loadMoreRows: () => {},
    totalRows: 0,
    rowCount: 0,
    threshold: 15,
    noRowsRenderer: () => {},
    onScroll: () => {},
    overscanRowCount: 10,
    scrollToAlignment: 'auto',
    scrollToIndex: undefined,
    scrollTop: undefined,
    style: undefined,
    tabIndex: undefined,
  },
  scrollProps: {},
}

export default React.forwardRef(Table)
