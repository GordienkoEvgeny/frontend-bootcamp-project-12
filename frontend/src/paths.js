const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  loginPagePath: () => '/login',
  usersPath: () => [apiPath, 'data'].join('/'),
  chatPath: () => '/',
};
