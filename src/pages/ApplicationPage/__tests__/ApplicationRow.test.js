import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import { TableCell, TableRow, IconButton, Tooltip, CircularProgress, Grid } from '@material-ui/core'
// import { IApplicationInstance } from 'types/Application'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import ReplayIcon from '@material-ui/icons/Replay'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import { ApplicationInstanceRow } from '../InstancesTable/ApplicetionInstanceRow'
import { TableCell, TableRow, IconButton, Tooltip, CircularProgress, Grid } from '@material-ui/core'
Enzyme.configure({ adapter: new Adapter() });



describe('ApplicationInstanceRow', ()=>{
    let data = {status: 'RUNNING'}
    beforeEach(()=> {
        data = {status: 'RUNNING'}
    })
    it('renders correctly', () => {
        const CheckRow = renderer
          .create(<ApplicationInstanceRow data={data}/>)
          .toJSON();
        expect(CheckRow).toMatchSnapshot();
      });

      it('Should contain at least 4 sells', () => {
        const wrapper = shallow(<ApplicationInstanceRow data={data}/>);
        expect(wrapper.find(TableCell).length).toBeGreaterThan(3);
      });

      it('Should contain at least 4 sells', () => {
        const wrapper = shallow(<ApplicationInstanceRow data={data}/>);
        expect(wrapper.find(TableCell).length).toBeLessThan(10);
      });

      // it('Should contain right hader', () => {
      //   const wrapper = shallow(<ApplicationInstanceRow data={data}/>);
      //   expect(wrapper.find('h3').text()).toEqual('ApplicationPageTabdata');
      // });
})