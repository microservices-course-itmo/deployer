import React from 'react'
import renderer from 'react-test-renderer'
import { ApplicationPageTabPorts } from '../tabs/ApplicationPageTabPorts/ApplicationPageTabPorts'

it('renders correctly', () => {
    const tree = renderer
        .create(<ApplicationPageTabPorts ports={['88:80']}/>)
        .toJSON()
    
    expect(tree).toMatchSnapshot()
})
