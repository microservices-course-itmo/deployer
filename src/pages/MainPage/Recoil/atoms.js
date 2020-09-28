import { atom } from 'recoil'

/**
 * Table component atoms.
 */
const atomsTableKey = '__table_atoms'
export const atomsTable = {}

const order = atom({
  key: `${atomsTableKey}_order`,
  default: 'asc',
})
atomsTable.order = order

const orderBy = atom({
  key: `${atomsTableKey}_orderBy`,
  default: 'calories',
})
atomsTable.orderBy = orderBy

const selected = atom({
  key: `${atomsTableKey}_selected`,
  default: [],
})
atomsTable.selected = selected

const page = atom({
  key: `${atomsTableKey}_page`,
  default: 0,
})
atomsTable.page = page

const rowsPerPage = atom({
  key: `${atomsTableKey}_rowsPerPage`,
  default: 5,
})
atomsTable.rowsPerPage = rowsPerPage
