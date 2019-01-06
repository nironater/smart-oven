import * as React from 'react';
import { observer } from 'mobx-react';

import './knob.less';


type KnobProps = {
  numberOfDials: number;
  pointerLocation: number;
}

export class Knob extends React.Component<KnobProps> {

  render() {
    const { numberOfDials, pointerLocation } = this.props;

    const style: React.CSSProperties = {
      transform: `rotate(${(360/numberOfDials)*pointerLocation}deg)`
    }

    return (
      <div className="knob" style={style}>
        <div className="knob-pointer" />
      </div>
    );
  }
};