import {AlertSchema} from '../alert/types/AlertSchema';
import {NotesSchema} from '../notes/types/NotesSchema';
import {UserSchema} from '../user/types/UserSchema';

export interface StateSchema {
	alert: AlertSchema
	notes: NotesSchema
	user: UserSchema
}
