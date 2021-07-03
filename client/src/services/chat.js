import axios from 'axios';
import { baseUrl } from '../constants';

const chat_urls = {
  CHATS_USERS_URL: `${baseUrl}/api/chat/users/`,
  CHAT_USER_URL: `${baseUrl}/api/chat/user/`,
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(chat_urls.CHATS_USERS_URL, {
      withCredentials: true,
    });
    const { users } = response.data;
    if(!users) throw new Error('Unable to fetch');
    return users;
  } catch (error) {
    return [];
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(chat_urls.CHAT_USER_URL + id, {
      withCredentials: true,
    });
    const { user } = response.data;
    if(!user) throw new Error('Unable to fetch');
    return user;
  } catch (error) {
    return undefined;
  }
};
