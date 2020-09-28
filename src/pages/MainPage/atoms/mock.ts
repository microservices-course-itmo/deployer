function createData(name, status, replicas, version, actions) {
  return { name, status, replicas, version, actions }
}

const rows = [
  createData('Cupcake', 'Active', 3.7, 67, '-'),
  createData('Donut', 'Disabled', 25.0, 51, '-'),
  createData('Eclair', 'Pending', 16.0, 24, '-'),
  createData('Frozen yoghurt', 'Rebooting', 6.0, 24, '-'),
  createData('Gingerbread', 'Active', 16.0, 49, '-'),
  createData('Honeycomb', 'Active', 3.2, 87, '-'),
  createData('Ice cream sandwich', 237, 9.0, 37, '-'),
  createData('Jelly Bean', 'Disabled', 0.0, 94, '-'),
  createData('KitKat', 'Disabled', 26.0, 65, '-'),
  createData('Lollipop', 'Active', 0.2, 98, '-'),
  createData('Marshmallow', 318, 0, 81, '-'),
  createData('Nougat', 'Rebooting', 19.0, 9, '-'),
  createData('Oreo', 'Active', 18.0, 63, '-'),
]

export default {
  rows,
}
