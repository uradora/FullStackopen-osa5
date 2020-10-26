import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (id, updatedBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return res.data;
};

export default { getAll, create, setToken, update };
