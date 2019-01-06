import './smart-panel.less';

import * as React from 'react';
import { observer } from 'mobx-react';

import { IAppStore } from '../../../../models/app-model';

import { InfoScreen } from '../info-screen/info-screen';
import { ProgramsKnob } from '../programs-knob/programs-knob';
import { TempKnob } from '../temp-knob/temp-knob';


type SmartPanelProps = {
    appStore: IAppStore;
}

@observer
export class SmartPanel extends React.Component<SmartPanelProps> {

    render() {
        const { appStore } = this.props;

        return (
            <div className="smart-panel">
                <ProgramsKnob selectedProgram={appStore.program} onProgramClick={appStore.changeProgram}/>
                <InfoScreen appStore={appStore} />
                <TempKnob />
            </div>
        );
    }
};