export interface Note {
	id?: string
	title: string
	content?: string
	date: string
	isImportant: boolean
	isDisable: boolean
	order: number
}

export interface FirebaseState {
	notes: Note[]
	loading: boolean
	filter: string
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
