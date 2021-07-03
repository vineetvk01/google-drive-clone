import { URLS } from "../../constants/urls";
import apiRequests from "../../utils/apiRequests";

export const fetchSession = () =>
  apiRequests.get(`${URLS.GET_SESSION}`);
