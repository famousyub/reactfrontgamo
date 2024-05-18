// localStorage.setItem("token", jwtToken);


import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const CurentUserService = () => {
    let username = AuthenticationService.getLoggedInUser();

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

export default CurentUserService;