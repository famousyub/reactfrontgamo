import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const FamilyService = () => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.get(`/api/all/family`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default FamilyService;
