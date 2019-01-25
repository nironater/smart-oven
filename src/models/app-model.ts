import { OvenProgram, OperationStatus } from "../services/smart-oven-api";
import { OvenConfigurationName } from "./online-oven-configuration-model";

export interface IAppStore {
    program: OvenProgram;
    operationStatus: OperationStatus;
    temperature: number;
    targetTemperature: number;
    showFan: boolean;
    showLight: boolean;
    showGrill: boolean;
    showTopBottomHeating: boolean;
    isLoading: boolean;

    init: (ovenConfigurationName?: OvenConfigurationName) => void;
    changeProgram: (program: OvenProgram) => void;
}