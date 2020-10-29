import React from 'react'

const ConfigPage = () => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: '250px', background: 'black', height: '100vh' }} />
    <div>
      <h1>Config</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input type="text" value="Docker_registry"/>
        <input type="text"/>
      </div>

    </div>
  </div>
)
export default ConfigPage
