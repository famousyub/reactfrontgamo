import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const DeleteFourniseurService = (id) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.delete(`/api/fournisseur/${id}`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default DeleteFourniseurService;
