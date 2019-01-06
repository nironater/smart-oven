export interface OvenState {
    program: OvenProgram;
    status: OperationStatus;
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

const DEFAULT_STATE: OvenState = {
    program: OvenProgram.Off,
    status: OperationStatus.Ready,
};

export class SmartOven {

    private _state: OvenState;
    private stateChangeCallback: (state: OvenState) => void;
    private timeoutHandler;

    init(onStateChange: (state: OvenState) => void, initialState: OvenState = DEFAULT_STATE): OvenState {
        this.stateChangeCallback = onStateChange;
        return this._state = initialState;
    }

    setProgram = (newProgram: OvenProgram) => {
        if (newProgram === this._state.program)
            return;

        if (this.timeoutHandler) {
            clearTimeout(this.timeoutHandler); // last unfinished change is not relevant anymore
        }

        console.log(`Program ${newProgram} Set!`);
        this.setState(newProgram, OperationStatus.AdjustingTemp);

        this.timeoutHandler = setTimeout(
            () => {
                console.log(` -= ${newProgram} Ready =- `);
                this.setState(this._state.program, OperationStatus.Ready);
            }
            , 3000
        );
    }

    public get state(): OvenState {
        return { ...this._state };  // return copy of state for protection
    }

    private setState = (program: OvenProgram, status: OperationStatus) => {
        this._state = {
            program: program,
            status: status,
        };
        if (this.stateChangeCallback) {
            this.stateChangeCallback({ ...this._state }); // return copy of state for protection
        }
    }
}