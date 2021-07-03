import axios from "axios";
import { get } from "lodash";
import { URLS } from "../constants/urls";
import { authHeaders } from "./auth";

let headers = {};
headers["Content-Type"] = "application/json";
headers.Accept = "application/json";

headers = authHeaders(headers);

const handleAuthError = async (error) => {
  if (error?.response?.status === 401) {
    try {
      const response = await axios.get(URLS.SESSION, { headers });
      const { error: apiError } = response.data;
      if (apiError) {
        // authError();
      }
    } catch (e) {
      if (error.response.status === 401) {
        // authError();
      }
      throw e;
    }
  }
};

const handleResponse = (res) => {
  const isFailed = get(res, "data.success", false) === false;
  const hasMessage = get(res, "data.message");

  if (isFailed && hasMessage) {
    console.error(hasMessage);
  }
  return res;
};

const getApi = (url, params = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios
    .get(url, { params, headers, withCredentials: true })
    .then((response) => handleResponse(response))
    .catch((e) => {
      handleResponse(e.response);
      handleAuthError(e);
      throw e;
    });
};

const postApi = (url, data = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios
    .post(url, data, { headers, withCredentials: true })
    .then((response) => handleResponse(response))
    .catch((e) => {
      handleResponse(e.response);
      handleAuthError(e);
      throw e;
    });
};

const deleteApi = (url, data = {}, params = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios
    .delete(url, { data, params, headers, withCredentials: true })
    .then((response) => handleResponse(response))
    .catch((e) => {
      handleResponse(e.response);
      handleAuthError(e);
      throw e;
    });
};

const patchApi = (url, data = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios
    .patch(url, data, { headers, withCredentials: true })
    .then((response) => handleResponse(response))
    .catch((e) => {
      handleResponse(e.response);
      handleAuthError(e);
      throw e;
    });
};

const putApi = (url, data = {}, params = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios
    .put(url, data, { params, headers, withCredentials: true })
    .then((response) => handleResponse(response))
    .catch((e) => {
      handleResponse(e.response);
      handleAuthError(e);
      throw e;
    });
};

const apiRequests = {
  get: getApi,
  post: postApi,
  delete: deleteApi,
  patch: patchApi,
  put: putApi,
};
export default apiRequests;
