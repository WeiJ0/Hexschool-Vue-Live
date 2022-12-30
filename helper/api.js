import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.2/esm/axios.min.js";
import { getToken, removeToken } from "./user.js";

const apiURL = "https://vue3-course-api.hexschool.io/v2/";
const apiPath = "weij";

const adminApiURL = `${apiURL}api/${apiPath}/admin/`;

export const login = (username, password) => {
  return axios.post(`${apiURL}admin/signin`, {
    username,
    password,
  });
};

export const logout = () => {
  return axios.post(`${apiURL}logout`);
};

const adminRequest = axios.create({
  baseURL: adminApiURL,
  headers: {
    Authorization: `${getToken()}`,
  },
});


// 取得所有商品
export const getProducts = () => {
  return adminRequest.get("products/all");
};
// 取得所有商品 (分頁、分類)
export const getProductByPage = (page, category) => {
  let path = "products";

  if (page) path += `?page=${page}`;
  if (category) path += `?category=${category}`;

  return adminRequest.get(`${path}`);
};
