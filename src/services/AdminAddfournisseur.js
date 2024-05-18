import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';


const AdminAddfournisseur = (fourniseur) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.post(`/api/admin/add/fornisseur`,fourniseur);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default AdminAddfournisseur;
