import * as React from 'react';
import * as classnames from 'classnames';

import './fan.less';

interface FanProps {
  isOn: boolean;
}

export class Fan extends React.Component<FanProps> {

  render() {
    const { isOn } = this.props;

    const classes = classnames(
      'fan',
      {on: isOn}
    )

    return (
      <div className={classes} />
    );
  }
};