import { useLayoutEffect, useState } from 'react'

function useModuleSize() {
  const [size, setSize] = useState({ height: 0, width: 0 })

  useLayoutEffect(() => {
    const updateSize = () =>
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      })

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export default useModuleSize
