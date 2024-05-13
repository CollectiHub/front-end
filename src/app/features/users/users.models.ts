export enum UserRole {
  Regular = 'regular',
}
export interface VerifyPasswordResetBody {
  code: string;
  new_password: string;
}

export interface UserDataResponseDto {
  data: UserDataDto;
  message: string;
}

export interface UserDataDto {
  email: string;
  id: string;
  role: UserRole;
  username: string;
  verified: boolean;
}
