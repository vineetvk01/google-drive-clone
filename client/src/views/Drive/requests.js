import apiRequest from '../../utils/apiRequests';
import URLS from '../../constants/urls';


export const fetchFiles = (parentId = 'root') => {
  return apiRequest.get(`${URLS.FILES}/${parentId}`);
}

export const createFile = (fileName, type, parentId) => {
  return apiRequest.post(`${URLS.FILES}/${parentId}`, {
    type,
    fileName,
  });
}

export const renameFile = (fileName, parentId, childId) => {
  return apiRequest.put(`${URLS.FILES}/${parentId}`, {
    childId,
    fileName,
  });
}

export const deleteFile = (parentId, childId) => {
  return apiRequest.delete(`${URLS.FILES}/${parentId}`, {
    childId
  });
}