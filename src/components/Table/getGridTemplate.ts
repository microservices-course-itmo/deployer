export default (gridTemplate) =>
  (typeof gridTemplate === 'string'
    ? gridTemplate.split(' ')
    : (gridTemplate || []).map((item) =>
        typeof item === 'number' ? `${item}px` : item
      )
  ).join(' ')
