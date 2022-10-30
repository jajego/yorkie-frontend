import axios from "axios";
const baseUrl = "http://api.yorkie.city/auth/register";

const register = async (credentials) => {
  const response = await axios.request({
    method: "post",
    url: baseUrl,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      username: credentials.username,
      password: credentials.password,
    },
  });
  return response.data;
};

export default { register };
