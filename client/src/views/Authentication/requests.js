import apiRequest from '../../utils/apiRequests';
import URLS from '../../constants/urls';


export const loginUser = (username, password ) => {
  return apiRequest.post(URLS.POST_LOGIN, {
    username, password 
  });
}

export const registerUser = (name, username, password ) => {
  return apiRequest.post(URLS.POST_REGISTER, {
    name, username, password 
  });
}