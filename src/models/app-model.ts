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
    isLoading: boolean;

    init: (ovenConfigurationName?: OvenConfigurationName) => void;
    changeProgram: (program: OvenProgram) => void;
}

export type OvenConfigurationName = "fast" | "slow";

export interface OnlineOvenConfiguration {
    name: string;
    milisecsPerDagree: number;
    programs: OnlineProgramData[];
}

export interface OnlineProgramData {
    id: number;
    name: string;
    settings: OnlineProgramSettings;
}

export interface OnlineProgramSettings {
    temperature: number;
}