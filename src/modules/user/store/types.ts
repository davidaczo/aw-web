export interface UserMinDto {
	id: string,
	firstName: string,
	lastName: string,
	fullName: string,
}

export type UserDetailedDto = UserMinDto & {
	email: string,
	isEmailVerified: boolean,
	name: string,
	socketToken: string,
	apiVersion: string,
}

export type UpdateMeDto = {
	email: string;
	firstName: string;
	lastName: string;
}

export type PasswordChangeDto = {
	currentPassword: string,
	newPassword: string,
}

export type PwdResTokenValidationDto = {
	email: string,
	firstName: string,
	lastName: string,
	passwordExists: boolean,
}

export type PasswordResetDto = {
	token: string,
	password: string,
}
