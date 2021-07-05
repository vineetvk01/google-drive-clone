import { baseUrl } from './index';

export const URLS = {
  GET_SESSION: `${baseUrl}/auth/session`,
  POST_LOGIN: `${baseUrl}/auth/login`,
  POST_REGISTER: `${baseUrl}/auth/register`,
  POST_LOGOUT: `${baseUrl}/auth/logout`,

  FILES: `${baseUrl}/drive/files`,
}

export default URLS;