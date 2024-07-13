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
    collection: {
      getCollectionInfo: `${apiUrl}collection/info`,
      getByRarity: `${apiUrl}collection/get-by-rarity`,
      update: `${apiUrl}collection/update`,
      search: `${apiUrl}collection/search`,
    },
    users: {
      base: `${apiUrl}users`,
      getUserData: `${apiUrl}users/me`,
      verifyEmail: `${apiUrl}users/verify-email`,
      requestPasswordReset: `${apiUrl}users/request-password-reset`,
      verifyPasswordReset: `${apiUrl}users/verify-password-reset`,
      resendVerificationEmail: `${apiUrl}users/resend-veririfcation-email`,
      changePassword: `${apiUrl}users/change-password`,
    },
  },
};
