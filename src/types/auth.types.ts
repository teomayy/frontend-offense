export interface IAuthForm {
	login: string
	password: string
}

export interface IUser {
	id: string
	name: string
	login: string
	password?: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
