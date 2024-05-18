// user/signup


import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const RegisterService = (user) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.post(`/api/user/signup`,user);
    alert(user)
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default RegisterService;