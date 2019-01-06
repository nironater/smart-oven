import './temp-knob.less';

import * as React from 'react';

import { Knob } from '../knob/knob';

type TempKnobProps = {
    temperture?: number;
}

export class TempKnob extends React.Component<TempKnobProps> {

    render() {
        const { temperture = 0 } = this.props;

        return (
            <div className="temp-knob">
                <Knob numberOfDials={360} pointerLocation={temperture} />
                <div className="temp off">0</div>
                <div className="temp temp-50">50</div>
                <div className="temp temp-100">100</div>
                <div className="temp temp-150">150</div>
                <div className="temp temp-200">200</div>
                <div className="temp temp-250">250</div>
                <div className="temp temp-300">300</div>
            </div>
        );
    }
};