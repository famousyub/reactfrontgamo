import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const BusnissService = () => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.get(`/api/all`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default BusnissService;
