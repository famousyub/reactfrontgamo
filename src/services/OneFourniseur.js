import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const OneFourniseurService = (id) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.get(`/api/fourniseur/`+ id);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default OneFourniseurService;
