import axios from "./CustomAxiosConfig";

const LoginService = (username) => {
  try {
    return axios.post(`http://localhost:8180/api/login`, null, {
      params: {
        username,
      },
      
    });
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default LoginService;
