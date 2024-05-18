import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const AddFourniseurService = (family) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.post(`/api/add/fournisseur`,family);
    alert(speciality)
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default AddFourniseurService;