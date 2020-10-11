import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useRecoilValue } from 'recoil'

import { Table, TableHead } from '../../../components/Table'
import ServicesTableRow from './ServicesTableRow'
import atoms from '../atoms'

function ServicesTable({ className }) {
  const rows = useRecoilValue(atoms.table.rows)
  const searchQuery = useRecoilValue(atoms.search.searchQuery)
  const expandedRow = useRecoilValue(atoms.table.selected)

  const filteredRows = rows.filter((row) =>
    (row.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const expandedRowIdx = filteredRows.findIndex(
    (row) => row.name === expandedRow
  )

  const tableRef = React.useRef(null)

  React.useEffect(() => {
    if (expandedRowIdx !== -1) {
      tableRef.current.recomputeRowHeights()
      tableRef.current.scrollToRow(expandedRowIdx)
    }
  }, [expandedRowIdx])

  return (
    <Table
      ref={tableRef}
      className={className}
      gridTemplate={[
        'minmax(80px, 2fr)',
        'minmax(80px, 1fr)',
        'minmax(80px, 1fr)',
        'minmax(80px, 1fr)',
      ]}
      // eslint-disable-next-line prettier/prettier
      headerContent={(
        <TableHead>
          <Typography>Service name</Typography>
          <Typography>Status</Typography>
          <Typography>Replicas</Typography>
          <Typography>Version</Typography>
        </TableHead>
        // eslint-disable-next-line prettier/prettier
      )}
      virtualProps={{
        rowCount: filteredRows.length,
        rowHeight: ({ index }) => (index === expandedRowIdx ? 45 * 2 : 45),
        rowRenderer: ({ index, key, style, gridTemplate }) => (
          <ServicesTableRow
            key={key}
            style={style}
            row={filteredRows[index]}
            // eslint-disable-next-line react/jsx-props-no-spreading
            gridTemplate={gridTemplate}
          />
        ),
      }}
    />
  )
}

export default ServicesTable
