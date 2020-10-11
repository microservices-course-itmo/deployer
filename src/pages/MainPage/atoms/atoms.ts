import { atom } from 'recoil'

import mock from './mock'

/**
 * Table component atoms.
 */
const atomsTableKey = '__table-atoms'

const rows = atom({
  key: `${atomsTableKey}_rows`,
  default: mock.rows,
})

const selected = atom({
  key: `${atomsTableKey}_selected`,
  default: '',
})

/**
 * SearchField component atoms.
 */
const searchQuery = atom({
  key: `${atomsTableKey}_search-query`,
  default: '',
})

export default {
  table: {
    rows,
    selected,
  },
  search: {
    searchQuery,
  },
}
