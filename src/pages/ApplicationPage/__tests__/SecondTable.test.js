import React from 'react'
import { SecondTable } from '../SecondTable'
import { mockData } from '../mock'
import renderer from 'react-test-renderer'

describe('SecondTable', ()=>{

it('renders correctly', () => {
    const depcheck = renderer
        .create(<SecondTable data={mockData} type={0}/>)
        .toJSON()
    expect(depcheck).toMatchSnapshot()
});
})