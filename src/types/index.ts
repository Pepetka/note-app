export interface Note {
	id?: string
	title: string
	content?: string
	date: string
	isImportant: boolean
	isDisable: boolean
	order: number
}

export enum FilterTypes {
	ALL = 'all',
	DISABLE = 'isDisable',
	IMPORTANT = 'isImportant',
	ACTIVE = 'active'
}

export interface FirebaseState {
	notes: Note[]
	loading: boolean
	filter: FilterTypes
	error: {
		get: string | null
		update: string | null
	}
}

export interface User {
	email: string | null
	token: string | null
	id: string | null
}
