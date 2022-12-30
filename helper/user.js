export const setToken = (token, expired) => {
  document.cookie = `hexschool=${token};expires=${new Date(expired)}`;
};

export const getToken = () => {
  const cookies = document.cookie.split("; ");
  const hexschool = cookies.find((item) => item.startsWith("hexschool="));  
  if (hexschool) {
    return hexschool.split("=")[1];
  } else {
    return "";
  }
};
