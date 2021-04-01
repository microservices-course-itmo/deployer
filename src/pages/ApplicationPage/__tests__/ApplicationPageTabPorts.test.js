import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ApplicationPageTabPorts } from '../tabs/ApplicationPageTabPorts/ApplicationPageTabPorts'
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
        .create(<ApplicationPageTabPorts ports={['88:80']}/>)
        .toJSON()
    
    expect(tree).toMatchSnapshot()
})

describe('ApplicationPageTabPorts', ()=>{
    let ports = ['88:80']
    beforeEach(()=> {
        ports = ['88:80']
    })
      it('Should contain smth', () => {
        const wrapper = shallow(<ApplicationPageTabPorts ports={['88:80']}/>);
        expect(wrapper.find(TableCell)).toHaveLength(4);
      });
})