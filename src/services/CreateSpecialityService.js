import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const CreateSpecialityService = (speciality) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.post(`/api/add/speciality`,speciality);
    alert(speciality)
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default CreateSpecialityService;