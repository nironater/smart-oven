import './programs-knob.less';

import * as React from 'react';

import { Knob } from '../knob/knob';
import { OvenProgram } from '../../../../services/smart-oven-api';

interface ProgramsKnobProps {
    selectedProgram: OvenProgram;
    onProgramClick: (program: OvenProgram) => void
}

export class ProgramsKnob extends React.Component<ProgramsKnobProps> {

    render() {
        const { selectedProgram, onProgramClick } = this.props;

        return (
            <div className="programs-knob">
                <Knob numberOfDials={5} pointerLocation={selectedProgram} />
                <div className="program off" onClick={() => onProgramClick(OvenProgram.Off)}>Off</div>
                <div className="program grill-and-fan" onClick={() => onProgramClick(OvenProgram.HotAirGrill)} />
                <div className="program grill" onClick={() => onProgramClick(OvenProgram.Grill)} />
                <div className="program top-bottom-heating" onClick={() => onProgramClick(OvenProgram.TopBottomHeating)} />
                <div className="program light" onClick={() => onProgramClick(OvenProgram.Light)} />
            </div>
        );
    }
};