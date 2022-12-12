import {AsyncThunkAction} from '@reduxjs/toolkit';
import axios, {AxiosStatic} from 'axios';
import {StateSchema} from 'store/model/types/StateSchema';

type ActionCreatorType<Returned, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Returned, Arg, { rejectValue: RejectedValue }>

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Returned, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>;

	getState: jest.MockedFn<any>;

	actionCreator: ActionCreatorType<Returned, Arg, RejectedValue>;

	api: jest.MockedFunctionDeep<AxiosStatic>;

	constructor(actionCreator: ActionCreatorType<Returned, Arg, RejectedValue>, state?: DeepPartial<StateSchema>) {
		this.actionCreator = actionCreator;
		this.dispatch = jest.fn();
		this.getState = jest.fn(() => state as StateSchema);
		this.api = mockedAxios;
	}

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg);
		return action(this.dispatch, this.getState, {api: this.api});
	}
}
