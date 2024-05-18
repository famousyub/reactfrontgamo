// localStorage.setItem("token", jwtToken);


import axios from "./CustomAxiosConfig";



const LoginCurentUserService = (username) => {
   

    console.log(username);
  try {
    return axios.get(`/api/curent/user/${username}`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default LoginCurentUserService;