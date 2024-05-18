import axios from "axios";

const AuthenticateUserDataService = (username, password) => {
  return axios
    .post(`http://localhost:8180/api/authenticate`, {
      //"username":username,
      //"password" :password
      username,
      password
    })
    .then((res) => {
      if (res != null) {
        console.log(res);
        alert(res);
        return res;
      }
    })
    .catch((err) => {
      let error = "";

      if (err.response) {
        error += err.response;
      }
      return error;
    });
};

export default AuthenticateUserDataService;
