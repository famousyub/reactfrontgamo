import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const BusnissCreateService = (technicien) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.post(`/api/add/technicien`,technicien);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default BusnissCreateService;