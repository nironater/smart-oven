import './oven.less';

import * as React from 'react';
import { observer } from 'mobx-react';

import { IAppStore } from '../../../../models/app-model';

import { SmartPanel } from '../smart-panel/smart-panel';
import { Door } from '../door/door';

interface OvenProps {
    appStore: IAppStore;
}

@observer
export class Oven extends React.Component<OvenProps> {

    render() {
        const { appStore } = this.props;

        return (
            <div className="oven">
                <div className="inner-wrapper">
                    <SmartPanel appStore={appStore} className="oven-smart-panel" />
                    <Door appStore={appStore} className="oven-door" />
                </div>
            </div>
        );
    }
};