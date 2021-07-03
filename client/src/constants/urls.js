import { baseUrl } from './index';

export const URLS = {
  GET_SESSION: `${baseUrl}/auth/session`,
  POST_LOGIN: `${baseUrl}/auth/login`,
  POST_REGISTER: `${baseUrl}/auth/register`,
}

export default URLS;