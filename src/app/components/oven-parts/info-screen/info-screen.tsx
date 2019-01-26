import './info-screen.less';

import * as React from 'react';
import { observer } from 'mobx-react';

import { IAppStore } from '../../../../models/app-model';
import { OperationStatus } from '../../../../services/smart-oven-api';

interface InfoScreenProps {
    appStore: IAppStore;
}

@observer
export class InfoScreen extends React.Component<InfoScreenProps> {

    render() {
        const { appStore } = this.props;

        return (
            <div className="info-screen">
                <div className="text">
                    {appStore.operationStatus == OperationStatus.AdjustingTemp ?
                        `${appStore.temperature}C°`
                        : 'Ready'
                    }
                </div>
            </div>
        );
    }
};