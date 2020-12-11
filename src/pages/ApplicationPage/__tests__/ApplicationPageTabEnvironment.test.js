import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ApplicationPageTabEnvironment } from '../tabs/ApplicationPageTabEnvironment/ApplicationPageTabEnvironment'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Grid,
    // Checkbox,
  } from '@material-ui/core'

  Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer
        .create(<ApplicationPageTabEnvironment env={[{name: 'POSTGRES_HOST',value: 'postgres'}]}/>)
        .toJSON()
    
    expect(tree).toMatchSnapshot()
})
/*
describe('ApplicationPageTabEnvironment', ()=>{
    let env = [{name: 'POSTGRES_HOST',value: 'postgres'}]
    beforeEach(()=> {
        ports = [{name: 'POSTGRES_HOST',value: 'postgres'}]
    })
      it('Should contain smth', () => {
        const wrapper = shallow(<ApplicationPageTabPorts ports={[{name: 'POSTGRES_HOST',value: 'postgres'}]}/>);
        expect(wrapper.find(TableCell)).toHaveLength(4);
      });
})
*/