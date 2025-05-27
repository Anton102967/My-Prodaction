import { AsyncThunkAction } from '@reduxjs/toolkit';

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Return, Arg, RejectedValue, State = unknown> {
    dispatch: jest.MockedFn<any>;

    getState: () => State;

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    api: any;

    constructor(
        actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
        state?: State
    ) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as State);
        this.api = { put: jest.fn(), get: jest.fn(), post: jest.fn(), delete: jest.fn() };
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);

        // Вот тут extra = { api }
        // Если твоя санка ожидает extra = { api } - ДОЛЖНО быть так!
        const extra = { api: this.api };

        // action(dispatch, getState, extra)
        const [result] = await Promise.all([action(this.dispatch, this.getState, extra)]);
        return result;
    }
}
