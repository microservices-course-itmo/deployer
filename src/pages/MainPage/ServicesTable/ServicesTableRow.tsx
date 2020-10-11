import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useRecoilState } from 'recoil'
import IconStop from '@material-ui/icons/StopOutlined'
import IconStart from '@material-ui/icons/PlayArrowOutlined'
import IconRestart from '@material-ui/icons/RepeatOneOutlined'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import IconExpand from '@material-ui/icons/KeyboardArrowRight'

import { TableRow } from '../../../components/Table'
import { MenuItem } from '../../../components/Menu'
import atoms from '../atoms'

function ServicesTableRow({ row, gridTemplate, ...otherProps }) {
  const [selected, setSelected] = useRecoilState(atoms.table.selected)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...otherProps}>
      <TableRow
        noBorder={selected === row.name}
        gridTemplate={gridTemplate}
        selected={selected === row.name}
        onClick={() => setSelected(row.name)}
        // eslint-disable-next-line prettier/prettier
        startAdornment={(
          <IconButton
            size='small'
            onClick={() => setSelected(selected ? '' : row.name)}
          >
            <IconExpand
              style={{
                transform: selected === row.name ? 'rotate(90deg)' : undefined,
              }}
            />
          </IconButton>
          // eslint-disable-next-line prettier/prettier
        )}
        // eslint-disable-next-line prettier/prettier
        actions={(
          <>
            <MenuItem startAdornment={<IconStop />}>Stop</MenuItem>
            <MenuItem startAdornment={<IconStart />}>Start</MenuItem>
            <MenuItem startAdornment={<IconRestart />}>Reboot</MenuItem>
          </>
          // eslint-disable-next-line prettier/prettier
      )}
      >
        <Typography>{row.name}</Typography>
        <Typography>{row.status}</Typography>
        <Typography>{row.replicas}</Typography>
        <Typography>{row.version}</Typography>
      </TableRow>
      <Collapse in={selected === row.name}>
        <TableRow gridTemplate={gridTemplate} withStartAdornment withActions>
          <Typography>{row.name}</Typography>
          <Typography>{row.status}</Typography>
          <Typography>{row.replicas}</Typography>
          <Typography>{row.version}</Typography>
        </TableRow>
      </Collapse>
    </div>
  )
}

export default ServicesTableRow
