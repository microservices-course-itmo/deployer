import { atom } from 'recoil'

import mock from './mock'
/**
 * Table component atoms.
 */
const atomsTableKey = '__table_atoms'

const rows = atom({
  key: `${atomsTableKey}_rows`,
  default: mock.rows,
})

const order = atom({
  key: `${atomsTableKey}_order`,
  default: 'asc',
})

const orderBy = atom({
  key: `${atomsTableKey}_orderBy`,
  default: 'calories',
})

const selected = atom({
  key: `${atomsTableKey}_selected`,
  default: [],
})

const page = atom({
  key: `${atomsTableKey}_page`,
  default: 0,
})

const rowsPerPage = atom({
  key: `${atomsTableKey}_rowsPerPage`,
  default: 10,
})

export default {
  table: {
    rows,
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
  },
}
