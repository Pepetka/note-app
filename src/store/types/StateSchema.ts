import {AlertSchema} from '../alert/types/AlertSchema';
import {NotesSchema} from '../notes/types/NotesSchema';
import {UserSchema} from '../user/types/UserSchema';
import {AxiosInstance} from 'axios';

export interface StateSchema {
	alert: AlertSchema
	notes: NotesSchema
	user: UserSchema
}

interface ThunkExtraArg {
	api: AxiosInstance
}

export interface ThunkConfig<T> {
	rejectValue: T,
	state: StateSchema
	extra: ThunkExtraArg
}
