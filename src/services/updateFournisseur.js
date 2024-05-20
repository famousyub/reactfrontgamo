import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const updateFourniseurService = (id,family) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.put(`/api/fournisseur/${id}`,family);
    alert(speciality)
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default updateFourniseurService;