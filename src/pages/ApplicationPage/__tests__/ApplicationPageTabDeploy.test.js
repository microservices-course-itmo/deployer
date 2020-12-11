import React from 'react'
import { FormControl, Container, Grid, MenuItem, Select, Button, InputLabel, TextField, Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { IApplicationInstance, IHistoryLog } from '../../../../types/Application'
import { ApplicationInstanceTable } from './ApplicationInstanceTable/ApplicationInstanceTable'
import { ApplicationHistoryLog } from './ApplicationHistoryLog/ApplicationHistoryLog'

  Enzyme.configure({ adapter: new Adapter() });

describe('ApplicationPageTabDeploy', ()=>{
    let appinstance = ['color', 'bass', 'a']
    beforeEach(()=> {
        appinstance = ['color', 'bass', 'a']
    });
    let historylog = ['no', 'god', 'please']
    beforeEach(()=> {
        historylog = ['no', 'god', 'please']
    });
it('renders correctly', () => {
    const depcheck = renderer
        .create(<ApplicationPageTabDeploy export={[{desctiption: 'testvalue',templateVersion: 'testversion', instances: appinstance, possibleVersions: 'yes', lastRelease: 'Never', history: historylog}]}/>)
        .toJSON()
    expect(depcheck).toMatchSnapshot()
});
})