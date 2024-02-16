import secureFetch from "./SecureFetch";

export const EditUser = async (id) => {
  const url = `http://localhost:8080/api/user/edit?id=${id}`;
  const method = "POST";
  const data = null;
  const headers = {};

  const response = await secureFetch(url, method, data, headers);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const user = await response.json();
  return user;
}