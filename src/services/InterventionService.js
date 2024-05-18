import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const InterventionService = () => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.get(`/api/all/intervention`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default InterventionService;
