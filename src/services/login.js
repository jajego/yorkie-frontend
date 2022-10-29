import axios from "axios";
const baseUrl = "http://localhost:5000/auth/login";

const login = async (credentials) => {
  const response = await axios.request({
    method: "post",
    url: baseUrl,
    "Access-Control-Allow-Origin": "*",
    data: {
      username: credentials.username,
      password: credentials.password,
    },
  });
  return response.data;
};

export default { login };
