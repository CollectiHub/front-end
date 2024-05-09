const apiUrl = 'http://some-api.com/';

export const environment = {
  production: true,
  endpoints: {
    auth: {
      login: `${apiUrl}auth/login`,
      logout: `${apiUrl}auth/logout`,
      refreshToken: `${apiUrl}auth/refresh-token`,
      register: `${apiUrl}auth/register`,
    },
    users: {
      verifyEmail: `${apiUrl}users/verify-email`,
    },
  },
};
