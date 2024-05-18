import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const AddMarqueService = (marque) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    sweetAlert("add marque !");
    return axios.post(`/api/add/marque`,marque);
    alert(speciality)
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default AddMarqueService;