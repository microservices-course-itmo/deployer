import React from 'react'
// import PropTypes from 'prop-types'
import MuiMenuItem from '@material-ui/core/MenuItem'

import useStyles from './MenuItem.styles'

const MenuItem = React.forwardRef(
  (
    {
      button,
      children,
      disabled,
      onClick,
      selected,
      startAdornment,
      endAdornment,
      className,
      ...otherProps
    },
    ref
  ) => {
    const classes = useStyles()

    return (
      <MuiMenuItem
        ref={ref}
        button={button}
        classes={{ root: classes.root }}
        onClick={onClick}
        selected={selected}
        className={className}
        disabled={disabled}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      >
        {startAdornment && (
          <div className={classes.startAdornment}>{startAdornment}</div>
        )}
        <div className={classes.children}>{children}</div>
        {endAdornment && (
          <div className={classes.endAdornment}>{endAdornment}</div>
        )}
      </MuiMenuItem>
    )
  }
)

// MenuItem.propTypes = {
//   /**
//    * If `true`, the list item will be a button (using `ButtonBase`).
//    * Props intended for `ButtonBase` can then be applied to `ListItem`.
//    */
//   button: PropTypes.bool,
//   /**
//    * The content of the component. If a `ListItemAction` is used it must be the last child.
//    */
//   children: PropTypes.node,
//   /**
//    * If true, the list item will be disabled.
//    */
//   disabled: PropTypes.bool,
//   /**
//    * Callback fired when a "click" event is detected.
//    */
//   onClick: PropTypes.func,
//   /**
//    * Use to apply selected styling.
//    */
//   selected: PropTypes.bool,
//   /**
//    * The element to add on the start of the component
//    */
//   startAdornment: PropTypes.oneOfType([
//     PropTypes.node,
//     PropTypes.element,
//     PropTypes.string,
//   ]),
//   /**
//    * Applies classes to the component.
//    */
//   className: PropTypes.string,
//   /**
//    * The element to add in the end of the component
//    */
//   endAdornment: PropTypes.oneOfType([
//     PropTypes.node,
//     PropTypes.element,
//     PropTypes.string,
//   ]),
// }

MenuItem.defaultProps = {
  button: true,
  children: undefined,
  disabled: false,
  onClick: undefined,
  selected: false,
  icon: undefined,
  className: '',
  endAdornment: undefined,
}

export default MenuItem
