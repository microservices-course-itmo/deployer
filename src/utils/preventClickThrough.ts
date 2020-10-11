import { SyntheticEvent } from 'react'

export default (e: SyntheticEvent, cb: (arg1: SyntheticEvent) => void) => {
  if (e) {
    if (e.stopPropagation) {
      e.stopPropagation()
    }
    if (e.nativeEvent && e.nativeEvent.stopPropagation) {
      e.nativeEvent.stopPropagation()
    }
    // Trigger callback if it was provided
    if (cb && typeof cb === 'function') {
      return cb(e)
    }
  }
  return e
}
