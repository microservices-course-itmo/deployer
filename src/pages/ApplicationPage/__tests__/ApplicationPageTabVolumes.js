import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ApplicationPageTabVolumes } from '../tabs/ApplicationPageTabVolumes/ApplicationPageTabVolumes'
import { List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox } from '@material-ui/core'


Enzyme.configure({ adapter: new Adapter() });


describe('ApplicationPageTabVolumes', ()=>{
    let volumes = ['chiko', 'piko', 'koko']
    beforeEach(()=> {
        volumes = ['chiko', 'piko', 'koko']
    })
    it('renders correctly', () => {
        const CheckVol = renderer
          .create(<ApplicationPageTabVolumes volumes={volumes}/>)
          .toJSON();
        expect(CheckVol).toMatchSnapshot();
      });

      it('Should contain 3 checkbox', () => {
        const wrapper = shallow(<ApplicationPageTabVolumes volumes={volumes}/>);
        expect(wrapper.find(ListItem)).toHaveLength(3);
      });

      it('Should contain right hader', () => {
        const wrapper = shallow(<ApplicationPageTabVolumes volumes={volumes}/>);
        expect(wrapper.find('h3').text()).toEqual('ApplicationPageTabVolumes');
      });
})