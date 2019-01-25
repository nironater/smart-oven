export interface OvenInitialState {
    program: OvenProgram;
    status: OperationStatus;
}

export interface OvenState extends OvenInitialState {
    temp: number;
}

export const enum OvenProgram {
    Off,
    TopBottomHeating,
    HotAirGrill,
    Grill,
    Light
}

export const enum OperationStatus {
    AdjustingTemp,
    Ready
}

export type ProgramsConfiguration = Map<OvenProgram, ProgramConfiguration>;

export interface ProgramConfiguration {
    temperature: number
};

export interface OvenOptions {
    initialState?: OvenInitialState;
    millisecsPerDagree?: number;
    programsConfiguration?: ProgramsConfiguration
}

const DEFAULT_MILLISECONDS_PER_DAGREE: number = 10;
const TEMPERATURE_RESOLUTION: number = 10;

export class SmartOven {

    private _state: OvenState;
    private stateChangeCallback: (state: OvenState) => void;
    private _millisecsPerDagree: number;
    private _programsConfiguration: ProgramsConfiguration;
    private counter: Counter;

    init(onStateChange: (state: OvenState) => void, ovenOptions: OvenOptions = {}): OvenState {
        const {
            programsConfiguration,
            initialState = this.defaultOvenInitialState,
            millisecsPerDagree = DEFAULT_MILLISECONDS_PER_DAGREE,
        } = ovenOptions;

        if (this.counter) this.counter.stop();
        this.counter = new Counter();

        this.stateChangeCallback = onStateChange;
        this._millisecsPerDagree = millisecsPerDagree;

        this._programsConfiguration = this.defaultProgramsConfiguration;
        if (programsConfiguration) {
            // override default programs configuration to user's configuration
            programsConfiguration.forEach((configuration, program) => this._programsConfiguration.set(program, configuration))
        }

        this._state = { ...initialState, temp: this.getProgramTemperature(initialState.program) };

        return { ...this._state };
    }

    setProgram = (newProgram: OvenProgram) => {
        if (newProgram === this._state.program)
            return;

        // any unfinished change is not relevant anymore if exists
        this.counter.stop();

        const transitionTime = this.calculateTransitionTime(newProgram);


        if (transitionTime > 0) {
            this.updateState({ program: newProgram, status: OperationStatus.AdjustingTemp });
        } else {
            this.updateState({ program: newProgram });
        }

        console.log(`Program ${newProgram} Set! Expected transition time: ${transitionTime} milliseconds`);

        const targetTemp = this.getProgramTemperature(this.state.program);
        this.counter.start(
            TEMPERATURE_RESOLUTION * this._millisecsPerDagree,
            transitionTime,
            () => {
                let newTemp: number;
                if (this.state.temp < targetTemp) {
                    newTemp = Math.min(targetTemp, this.state.temp + TEMPERATURE_RESOLUTION);
                } else {
                    newTemp = Math.max(targetTemp, this.state.temp - TEMPERATURE_RESOLUTION);
                }
                this.updateState({ temp: newTemp });
                console.log(` ~ ${this.state.temp}C°`);
            },
            () => {
                this.updateState({ status: OperationStatus.Ready, temp: targetTemp });
                console.log(` -= ${newProgram} Ready =- `);
            }
        )
    }

    get state(): OvenState {
        return { ...this._state };  // return copy of state for protection
    }

    getProgramTemperature(program: OvenProgram) {
        return this._programsConfiguration.get(program).temperature;
    }

    private updateState = (newState: Partial<OvenState>) => {
        this._state = { ...this._state, ...newState }
        if (this.stateChangeCallback) {
            this.stateChangeCallback({ ...this._state }); // return copy of state for protection
        }
    }

    private calculateTransitionTime(toProgram: OvenProgram): number {
        const fromTemp = this.state.temp;
        const toTemp = this.getProgramTemperature(toProgram);

        return this._millisecsPerDagree * Math.abs(toTemp - fromTemp);
    }

    private get defaultProgramsConfiguration(): ProgramsConfiguration {
        return new Map([
            [OvenProgram.Off, { temperature: 0 }],
            [OvenProgram.TopBottomHeating, { temperature: 180 }],
            [OvenProgram.HotAirGrill, { temperature: 300 }],
            [OvenProgram.Grill, { temperature: 250 }],
            [OvenProgram.Light, { temperature: 0 }],
        ]);
    };

    private get defaultOvenInitialState(): OvenInitialState {
        return {
            program: OvenProgram.Off,
            status: OperationStatus.Ready,
        };
    }
}

class Counter {
    private handler;
    isStopped: boolean = false;

    start(interval: number, totalTime: number, onInterval: () => void, onComplete: () => void) {
        clearInterval(this.handler);
        this.isStopped = false;
        const startTime = new Date().valueOf();
        this.handler = setInterval(
            () => {
                if (this.isStopped) return;

                const now = new Date().valueOf();
                const elpasedTime = now - startTime;

                if (elpasedTime >= totalTime) {
                    this.stop();
                    onComplete();
                } else {
                    onInterval();
                }

            },
            interval
        );

    }

    stop() {
        this.isStopped = true;
        clearInterval(this.handler);
    }
}