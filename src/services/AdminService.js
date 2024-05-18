import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const AdminTechService = (tech) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.post(`/api/admin/add/tech`,tech);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default AdminTechService;
