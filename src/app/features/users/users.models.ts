export enum UserRole {
  Regular = 'regular',
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

export interface UpdateUserBody {
  email: string;
  username: string;
}

export interface ChangePasswordBody {
  new_password: string;
  old_password: string;
}

export interface VerifyPasswordResetBody {
  code: string;
  new_password: string;
}
