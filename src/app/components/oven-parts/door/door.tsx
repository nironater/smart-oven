import './door.less';

import * as React from 'react';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';

import { IAppStore } from '../../../../models/app-model';
import { OvenProgram } from '../../../../services/smart-oven-api';
import { Fan } from '../fan/fan';

interface DoorProps {
    appStore: IAppStore;
    className?: string;
}

@observer
export class Door extends React.Component<DoorProps> {

    render() {
        const { appStore, className } = this.props;

        const transparentGlassClasses = classnames(
            "transparent-glass",
            { "top-heat-effect": appStore.program == OvenProgram.Grill },
            { "top-bottom-heat-effect": appStore.program == OvenProgram.TopBottomHeating },
            { "center-heat-effect": appStore.program == OvenProgram.HotAirGrill },
            { "light-effect": appStore.program == OvenProgram.Light }
        );

        return (
            <div className={classnames("door", className)}>
                <div className="inner-area">
                    <div className="handle" />
                    <div className={transparentGlassClasses}>
                        <div className="transparent-screen" />
                        {appStore.showLight && <div className="light-element" />}
                        {appStore.showTopBottomHeating && <div className="heater-element top" />}
                        {appStore.showGrill && <div className="grill-element" />}
                        {appStore.showFan && <Fan isOn />}
                        {appStore.showTopBottomHeating && <div className="heater-element bottom" />}
                    </div>
                    <div className="separator" />
                    <div className="logo">® Nir</div>
                </div>
            </div>
        );
    }
};