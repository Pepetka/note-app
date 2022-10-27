import {AlertSchema} from '../alert/types/AlertSchema';
import {NotesSchema} from '../notes/types/NotesSchema';
import {UserSchema} from '../user/types/UserSchema';
import {AxiosInstance} from 'axios';
import {NoteFormSchema} from '../noteForm/types/NoteFormSchema';
import {Reducer, ReducersMapObject, CombinedState, AnyAction, EnhancedStore} from '@reduxjs/toolkit';

export interface StateSchema {
	alert: AlertSchema
	notes: NotesSchema
	user: UserSchema
	noteForm?: NoteFormSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
	add: (key: StateSchemaKey, reducer: Reducer) => void
	remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager
}

interface ThunkExtraArg {
	api: AxiosInstance
}

export interface ThunkConfig<T> {
	rejectValue: T,
	state: StateSchema
	extra: ThunkExtraArg
}
