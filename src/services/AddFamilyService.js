import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const AddFamilyService = (family) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.post(`/api/add/family`,family);
    alert(speciality)
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default AddFamilyService;