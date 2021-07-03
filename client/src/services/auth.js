import axios from 'axios';
import { baseUrl } from '../constants';

const auth_urls = {
  LOGIN_URL: `${baseUrl}/auth/login`,
  USER_PROFILE_URL: `${baseUrl}/auth/session`,
  LOGOUT_URL: `${baseUrl}/api/user/me/logout/`,
  SIGNUP_URL: `${baseUrl}/auth/register`,
};

export const userAuthStatus = async () => {
  try {
    const response = await axios.get(auth_urls.USER_PROFILE_URL, {
      withCredentials: true,
    });
    const { session, user } = response.data;
    if (session === 'active') {
      return user;
    }
    throw new Error('Unable to fetch');
  } catch (error) {
    return false;
  }
};

export const authenticateUser = async (credentials) => {
  try {
    const response = await axios.post(auth_urls.LOGIN_URL, credentials, {
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-type' :  'application/json'}
    });
    return response.data
  } catch (error) {
    console.log(error)
    const data = (error.response && error.response.data) || { status: 'failure', error: 'Server Not Reachable', };
    return data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      auth_urls.LOGOUT_URL,
      {},
      {
        withCredentials: true,
      },
    );
    return Boolean(response.status === 200);
  } catch (error) {
    return false;
  }
};

export const signupUser = async ({firstName, lastName, phone, email, password}) => {
  try {
    const response = await axios.post(
      auth_urls.SIGNUP_URL,
      { first_name: firstName,
        last_name: lastName, 
        email, 
        phone,
        password 
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    const data = (error.response && error.response.data) || { status: 'failure', error: 'Server Not Reachable', };
    return data;
  }
};