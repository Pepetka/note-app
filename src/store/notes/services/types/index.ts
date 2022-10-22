import {StateSchema} from 'store/types/StateSchema';
import {Note} from '../../types/NotesSchema';
import {AxiosInstance} from 'axios';
import {NavigateFunction} from 'react-router-dom';

interface ThunkExtraArg {
	api: AxiosInstance
	navigate?: NavigateFunction
}

export interface ThunkConfig<T> {
	rejectValue: T,
	state: StateSchema
	extra: ThunkExtraArg
}

export interface ResponseType {
	[id: string]: Note
}
