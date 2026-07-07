import { UserDetailedDto } from '../../../user/store/types';

export type LoginDto = {
 accessToken: string,
 name?: string,
 inviteToken?: string,
}

export type CheckEmailDto = {
 email: string,
}

export type CheckEmailResponseDto = {
 isExists: boolean,
}

export type LoginResponseDto = {
 user: UserDetailedDto;
 isNewUser: boolean,
}
