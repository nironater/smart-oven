import { OvenState } from './../services/smart-oven-api';
import { observable, action, computed } from 'mobx';

import { IAppStore } from '../models/app-model';
import { SmartOven, OvenProgram, OperationStatus } from '../services/smart-oven-api';

class AppStore implements IAppStore {

    private smartOven: SmartOven;

    @observable
    private _ovenState: OvenState;

    init() {
        this.smartOven = new SmartOven();
        this.setOvenState(this.smartOven.init(this.setOvenState));
    }

    get ovenState(): OvenState {
        return this._ovenState;
    }

    @action
    private setOvenState = (value: OvenState) => {
        this._ovenState = value;
    };

    @computed get program() {
        return this.ovenState.program;
    }

    @computed get operationStatus() {
        return this.ovenState.status;
    }

    @computed get showFan() {
        return this.program === OvenProgram.HotAirGrill;
    }

    @computed get showLight() {
        return this.program !== OvenProgram.Off;
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