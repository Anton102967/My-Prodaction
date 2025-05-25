import { StateSchema } from 'app/providers/StoreProvider';
import { AsyncThunkAction } from '@reduxjs/toolkit';

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue}>
export class TestAsyncThunk<Return, Arg, RejectedValue, Extra = undefined> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    extra: Extra;

    api?: any;

    constructor(
        actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
        extra?: Extra
    ) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();
        this.extra = extra as Extra;
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);
        const result = await action(this.dispatch, this.getState, this.extra);
        return result;
    }
}
