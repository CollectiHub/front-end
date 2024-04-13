export interface LoginResponseDto {
  data: {
    accessToken: string;
  };
  message: string;
}

export interface RegisterResponseDto {
  data: {
    email: string;
    id: string;
    role: string;
    username: string;
    verified: boolean;
  };
  message: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegistrationBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
