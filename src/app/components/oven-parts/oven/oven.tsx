import './oven.less';

import * as React from 'react';
import { observer } from 'mobx-react';
import * as classnames from 'classnames';

import { IAppStore } from '../../../../models/app-model';

import { SmartPanel } from '../smart-panel/smart-panel';
import { Fan } from '../fan/fan';
import { OvenProgram } from '../../../../services/smart-oven-api';


type OvenProps = {
    appStore: IAppStore;
}

@observer
export class Oven extends React.Component<OvenProps> {

    render() {
        const { appStore } = this.props;

        const transparentGlassClasses = classnames(
            "transparent-glass",
            { "top-heat-effect": appStore.program == OvenProgram.Grill },
            { "top-bottom-heat-effect": appStore.program == OvenProgram.TopBottomHeating },
            { "center-heat-effect": appStore.program == OvenProgram.HotAirGrill },
            { "light-effect": appStore.program == OvenProgram.Light }
        );

        return (
            <div className="oven">
                <div className="inner-wrapper">
                    <SmartPanel appStore={appStore} />
                    <div className="door">
                        <div className="inner-area">
                            <div className="handle" />
                            <div className={transparentGlassClasses}>
                                <div className="transparent-screen" />
                                {appStore.program == OvenProgram.Light && <div className="light-element" />}
                                {appStore.showTopBottomHeating && <div className="heater-element top" />}
                                {appStore.showGrill && <div className="grill-element" />}
                                {appStore.showFan && <Fan isOn />}
                                {appStore.showTopBottomHeating && <div className="heater-element bottom" />}
                            </div>
                            <div className="separator" />
                            <div className="logo">® Nir</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};