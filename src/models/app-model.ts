import { OvenProgram, OperationStatus } from "../services/smart-oven-api";

export interface IAppStore {
    program: OvenProgram;
    operationStatus: OperationStatus;
    showFan: boolean;
    showLight: boolean;
    showGrill: boolean;
    showTopBottomHeating: boolean;

    init: () => void;
    changeProgram: (program: OvenProgram) => void;
}