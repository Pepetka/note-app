import {StateSchema} from 'store/types/StateSchema';
import {Note} from '../../types/NotesSchema';

export type ThunkApi = {
	rejectValue: string
	state: StateSchema
}

export interface ResponseType {
	[id: string]: Note
}
