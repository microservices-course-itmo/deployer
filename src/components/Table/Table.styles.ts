import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ palette, spacing }) => ({
  wrapper: {
    width: '100%',
    height: 'inherit',
    overflow: 'hidden',
  },
  gridRoot: {
    width: '100%',
    display: 'grid',
    columnGap: spacing(1.25),
  },
  gridEdge: {
    padding: spacing(1.25),
    height: spacing(7),
    backgroundColor: palette.grey['200'],
    alignItems: 'center',
  },
  gridHead: {
    borderBottom: `1px solid ${palette.grey['400']}`,
  },
  gridFooter: {
    borderTop: `1px solid ${palette.grey['400']}`,
  },
  gridRow: {
    position: 'relative',
    padding: spacing(1.25),
    minHeight: spacing(4.5),
    borderBottom: `1px solid ${palette.grey['400']}`,
    '&:hover': {
      backgroundColor: palette.action.hover,
      '&> $rowAction': {
        opacity: 1,
      },
    },
    '&:last-child': {
      borderBottom: 0,
    },
  },
  rowNoHover: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  rowPointer: {
    cursor: 'pointer',
  },
  rowNoBorder: {
    borderBottom: 0,
  },
  startAdornmentOffset: {
    paddingLeft: spacing(4.75),
  },
  endAdornmentOffset: {
    paddingRight: spacing(4.75),
  },
  actionsOffset: {
    paddingRight: spacing(3.75),
  },
  endAdornmentWithActionsOffset: {
    paddingRight: spacing(8),
  },
  rowAdornmentHover: {
    opacity: 0,
    '$gridRow:hover &': {
      opacity: 1,
    },
  },
  rowStartAdornment: {
    position: 'absolute',
    top: spacing(1.25),
    left: spacing(0.5),
  },
  rowEndAdornment: {
    position: 'absolute',
    top: spacing(1.25),
    right: spacing(0.5),
  },
  rowEndAdornmentWithActions: {
    right: spacing(3.75),
  },
  rowAction: {
    opacity: 0,
    position: 'absolute',
    top: spacing(0.75),
    right: spacing(0.25),
  },
  emptyText: {
    textAlign: 'center',
    borderBottom: 0,
  },
  centered: {
    alignItems: 'center',
  },
  centeredAdornment: {
    top: '50%',
    transform: 'translateY(-50%)',
  },
  rowSelected: {
    backgroundColor: palette.action.selected,
  },
  rowSelectedPrimary: {
    backgroundColor: palette.primary.light,
  },
  rowSelectedError: {
    backgroundColor: palette.error.light,
  },
  rowSelectedWarning: {
    backgroundColor: palette.warning.light,
  },
  rowSelectedSuccess: {
    backgroundColor: palette.success.light,
  },
  skeletonRow: {
    display: 'grid',
    justifyItems: 'center',
    columnGap: spacing(1.25),
    minHeight: spacing(4.5),
    padding: spacing(1.25),
  },
}))
