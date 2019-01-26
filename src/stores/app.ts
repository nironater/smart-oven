import { observable, action, computed } from 'mobx';

import { IAppStore } from '../models/app-model';
import { OvenConfigurationName } from '../models/online-oven-configuration-model';
import { SmartOven, OvenProgram, OvenState, OvenOptions } from './../services/smart-oven-api';
import { getOvenOptions } from '../services/online-oven-configuration-service';

class AppStore implements IAppStore {

    @observable
    private smartOven: SmartOven;

    @observable
    private _ovenState: OvenState;

    @observable
    private _isLoading: boolean = true;

    init(ovenConfigurationName: OvenConfigurationName = "slow") {
        this.setIsLoading(true);
        return getOvenOptions(ovenConfigurationName)
            .then(this.initSmartOven)
            .catch(this.handleGetOvenOptionsError);
    }

    @action
    initSmartOven = (ovenOptions?: OvenOptions) => {
        if (!this.smartOven) {
            this.setSmartOven(new SmartOven());
        }
        this.smartOven.init(this.setOvenState, ovenOptions);
        this.setIsLoading(false);
    }

    @action
    handleGetOvenOptionsError = (error) => {
        window.alert(`Opps... i couldn't find oven configuration. Falling back to default configuration`);
        this.initSmartOven();
    }

    get ovenState(): OvenState {
        return this._ovenState;
    }

    @action
    private setOvenState = (value: OvenState) => {
        this._ovenState = value;
    };

    get isLoading(): boolean {
        return this._isLoading;
    }

    @action
    private setIsLoading = (value: boolean) => {
        this._isLoading = value;
    };

    @action
    private setSmartOven = (value: SmartOven) => {
        this.smartOven = value;
    };

    @computed get program() {
        return this.ovenState.program;
    }

    @computed get operationStatus() {
        return this.ovenState.status;
    }

    @computed get temperature() {
        return this.ovenState.temp;
    }

    @computed get targetTemperature() {
        return this.smartOven.getProgramTemperature(this.program);
    }

    @computed get showFan() {
        return this.program === OvenProgram.HotAirGrill;
    }

    @computed get showLight() {
        return this.program == OvenProgram.Light;
    }

    @computed get showGrill() {
        return this.program === OvenProgram.Grill || this.program === OvenProgram.HotAirGrill;
    }

    @computed get showTopBottomHeating() {
        return this.program === OvenProgram.TopBottomHeating;
    }

    changeProgram = (program: OvenProgram) => {
        this.smartOven.setProgram(program);
    };
}

export const appState: IAppStore = new AppStore();
export default appState;