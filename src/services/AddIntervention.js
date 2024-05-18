import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const AddInterventionService = (intervention) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    sweetAlert("add marque !");
    return axios.post(`/api/add/intervention`,intervention);
    alert(speciality)
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default AddInterventionService;