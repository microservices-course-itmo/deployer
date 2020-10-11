import React from 'react'
// import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import MenuList from '@material-ui/core/MenuList'

import preventClickThrough from '../../utils/preventClickThrough'

const Menu = ({ open, anchorEl, onClose, children, ...otherProps }) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    onClick={(e) => preventClickThrough(e)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...otherProps}
  >
    <MenuList onClick={onClose}>{children}</MenuList>
  </Popover>
)

// Menu.propTypes = {
//   /**
//    * A HTML element, or a function that returns it. It's used to set the position of the menu.
//    */
//   anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
//   /**
//    * Menu contents, normally `MenuItem`s.
//    */
//   children: PropTypes.node,
//   /**
//    * Callback fired when the component requests to be closed.
//    *
//    *
//    * **Signature:**
//    * `function(event: object, reason: string) => void`<br />
//    * *event*: The event source of the callback.<br />
//    * *reason*: Can be: "`escapeKeyDown`", "`backdropClick`", "`tabKeyDown`".
//    */
//   onClose: PropTypes.func,
//   /**
//    * If `true`, the menu is visible.
//    */
//   open: PropTypes.bool.isRequired,
//   /**
//    * This is the point on the anchor where the popover's `anchorEl` will attach to.
//    * This is not used when the anchorReference is 'anchorPosition'.
//    * Options: vertical: [top, center, bottom]; horizontal: [left, center, right].
//    */
//   anchorOrigin: PropTypes.shape({
//     vertical: PropTypes.oneOf(['top', 'center', 'bottom']),
//     horizontal: PropTypes.oneOf(['left', 'center', 'right']),
//   }),
//   /**
//    * This is the point on the popover which will attach to the anchor's origin.
//    * Options: vertical: [top, center, bottom, x(px)]; horizontal: [left, center, right, x(px)].
//    */
//   transformOrigin: PropTypes.shape({
//     vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//     horizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//   }),
//   /**
//    * If `true`, the menu will close when "`onMouseLeave`" event fire.
//    */
//   closeOnMouseLeave: PropTypes.bool,
// }

Menu.defaultProps = {
  anchorEl: undefined,
  children: undefined,
  onClose: undefined,
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  transformOrigin: { vertical: 'top', horizontal: 'left' },
  closeOnMouseLeave: false,
}

export default Menu
