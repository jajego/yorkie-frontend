import axios from "axios";
const baseUrl = "http://localhost:5000/auth/register";

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
