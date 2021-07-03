
export const authHeaders = (headers) => {
  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
