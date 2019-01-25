import { OvenConfigurationName, OnlineOvenConfiguration, OnlineProgramData } from "../models/online-oven-configuration-model";
import { OvenOptions, ProgramsConfiguration, ProgramConfiguration, OvenProgram } from "./smart-oven-api";
import { getResource } from "./http-service";

export function getOvenOptions(configurationName: OvenConfigurationName): Promise<OvenOptions> {
    return getResource<OnlineOvenConfiguration[]>(`ovenConfigurations/?name=${configurationName}`)
        .then(handleGetOvenConfigurations);
};

const handleGetOvenConfigurations = (onlineOvenConfigurations: OnlineOvenConfiguration[]): OvenOptions => {
    const onlineOvenConfiguration = onlineOvenConfigurations[0];
    const programsConfiguration = extractProgramsConfigurationFromOnlineOvenConfiguration(onlineOvenConfiguration);
    const ovenOptions: OvenOptions = {
        programsConfiguration,
        millisecsPerDagree: onlineOvenConfiguration.milisecsPerDagree
    };
    return ovenOptions;
}

const extractProgramsConfigurationFromOnlineOvenConfiguration = (onlineOvenConfiguration: OnlineOvenConfiguration): ProgramsConfiguration => {
    const result = new Map<OvenProgram, ProgramConfiguration>();

    onlineOvenConfiguration.programs.forEach(({ id, settings }: OnlineProgramData) => {
        result.set(id, { temperature: settings.temperature } );
    });

    return result;
}