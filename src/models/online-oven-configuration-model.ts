export type OvenConfigurationName = "fast" | "slow";

export interface OnlineOvenConfiguration {
    name: string;
    milisecsPerDegree: number;
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