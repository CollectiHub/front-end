export interface ResponseWithTokenDto {
  data: {
    access_token: string;
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
}

export interface RefreshTokenDto {
  data: {
    access_token: string;
  };
  message: string;
}
