export interface User {
	email: string
	token: string
	id: string
}

export interface UserSchema {
	user: User | null
	error: string | null
	loading: boolean
}
