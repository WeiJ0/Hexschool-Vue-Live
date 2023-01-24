import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.2/esm/axios.min.js";
import { getToken, removeToken } from "./user.js";
import { showError } from "./notify.js";

const apiURL = "https://vue3-course-api.hexschool.io/v2/";
const apiPath = "weij0";

// Base URL API
const customApiURL = `${apiURL}api/${apiPath}/`;
const adminApiURL = `${apiURL}api/${apiPath}/admin/`;

// 登入
export const login = (username, password) => {
  return axios.post(`${apiURL}admin/signin`, {
    username,
    password,
  });
};
// 登出
export const logout = () => {
  removeToken();
  return axios.post(`${apiURL}logout`);
};

const customRequest = axios.create({
  baseURL: customApiURL,
});

const adminRequest = axios.create({
  baseURL: adminApiURL,
  headers: {
    Authorization: `${getToken()}`,
  },
});

// 設定攔截器
adminRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeToken();
      showError("登入逾時，請重新登入");
      window.location = "./index.html";
    }
    return Promise.reject(error);
  }
);

// 取得所有商品
export const getProducts = () => {
  return customRequest.get("products/all");
};
// 取得所有商品 (分頁、分類)
export const getProductByPage = (page = '', category = '') => {
  let path = "products";

  if (page) path += `?page=${page}`;
  if (category) path += `?category=${category}`;

  return customRequest.get(`${path}`);
};
// 取得單一商品
export const getProduct = (id) => {
  return customRequest.get(`product/${id}`);
};

// 取得購物車資料
export const getCart = () => {
  return customRequest.get("cart");
};
// 新增購物車
export const addCart = (product_id, qty) => {
  return customRequest.post("cart", {
    data: {
      product_id,
      qty,
    },
  });
};
// 編輯購物車
export const editCart = (product_id, qty) => {
  return customRequest.put(`cart/${product_id}`, {
    data: {
      product_id,
      qty,
    },
  });
};
// 刪除購物車
export const deleteCart = (product_id) => {
  return customRequest.delete(`cart/${product_id}`);
};
// 清空購物車
export const clearCart = () => {
  return customRequest.delete("carts");
};
// 套用優惠券
export const applyCoupon = (code) => {
  return customRequest.post("coupon", {
    data: {
      code,
    },
  });
};

// 取得訂單資料
export const getOrder = () => {
  return customRequest.get("order");
};
// 取得單一訂單
export const getOrderById = (id) => {
  return customRequest.get(`order/${id}`);
};
// 新增訂單
export const addOrder = (order) => {
  return customRequest.post("order", {
    data: order,
  });
};
// 付款
export const payOrder = (order_id) => {
  return customRequest.post(`pay/${order_id}`);
};

// 取得文章列表
export const getArticle = () => {
  return customRequest.get("articles");
};
// 取得單一文章
export const getArticleById = (id) => {
  return customRequest.get(`article/${id}`);
};

/* Admin 管理者 API */

// 取得所有商品
export const getProductsByAdmin = () => {
  return adminRequest.get("products/all");
};
// 取得所有商品 (分頁、分類)
export const getProductByPageByAdmin = (page, category) => {
  let path = "products";

  if (page) path += `?page=${page}`;
  if (category) path += `?category=${category}`;

  return adminRequest.get(`${path}`);
};
// 新增商品
export const addProduct = (product) => {
  return adminRequest.post("product", {
    data: product,
  });
};
// 編輯商品
export const editProduct = (product) => {
  const id = product.id;
  return adminRequest.put(`product/${id}`, {
    data: product,
  });
};
// 刪除商品
export const deleteProduct = (id) => {
  return adminRequest.delete(`product/${id}`);
};

// 取得所有訂單
export const getOrders = () => {
  return adminRequest.get("orders");
};
// 編輯訂單
export const editOrder = (order) => {
  const id = order.id;
  return adminRequest.put(`order/${id}`, {
    data: order,
  });
};
// 刪除訂單
export const deleteOrder = (id) => {
  return adminRequest.delete(`order/${id}`);
};
// /清除訂單
export const clearOrder = () => {
  return adminRequest.delete(`orders/all`);
};

// 取得所有優惠券
export const getCoupons = () => {
  return adminRequest.get("coupons");
};
// 新增優惠券
export const addCoupon = (coupon) => {
  return adminRequest.post("coupon", {
    data: coupon,
  });
};
// 編輯優惠券
export const editCoupon = (coupon) => {
  const id = coupon.id;
  return adminRequest.put(`coupon/${id}`, {
    data: coupon,
  });
};
// 刪除優惠券
export const deleteCoupon = (id) => {
  return adminRequest.delete(`coupon/${id}`);
};

/* 上傳圖片 */
const adminFormDataRequest = axios.create({
  baseURL: adminApiURL,
  headers: {
    Authorization: `${getToken()}`,
    "Content-Type": "multipart/form-data",
  },
});

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file-to-upload", file);
  return adminFormDataRequest.post("upload", formData);
};
