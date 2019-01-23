import { OvenProgram, OperationStatus } from "../services/smart-oven-api";

export interface IAppStore {
    program: OvenProgram;
    operationStatus: OperationStatus;
    temperature: number;
    targetTemperature: number;
    showFan: boolean;
    showLight: boolean;
    showGrill: boolean;
    showTopBottomHeating: boolean;

    init: () => void;
    changeProgram: (program: OvenProgram) => void;
}