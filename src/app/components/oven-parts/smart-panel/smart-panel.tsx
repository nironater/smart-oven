import './smart-panel.less';

import * as React from 'react';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';

import { IAppStore } from '../../../../models/app-model';

import { InfoScreen } from '../info-screen/info-screen';
import { ProgramsKnob } from '../programs-knob/programs-knob';
import { TempKnob } from '../temp-knob/temp-knob';


type SmartPanelProps = {
    appStore: IAppStore;
    className?: string;
}

@observer
export class SmartPanel extends React.Component<SmartPanelProps> {

    render() {
        const { appStore, className } = this.props;

        return (
            <div className={classnames("smart-panel", className)}>
                <ProgramsKnob selectedProgram={appStore.program} onProgramClick={appStore.changeProgram} />
                <InfoScreen appStore={appStore} />
                <TempKnob temperture={appStore.targetTemperature} />
            </div>
        );
    }
};