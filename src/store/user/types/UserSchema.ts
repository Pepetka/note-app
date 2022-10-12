export interface User {
	email: string
	token: string
	id: string
}

export interface UserSchema {
	user: User | null
}
