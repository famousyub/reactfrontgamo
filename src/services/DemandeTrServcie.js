import axios from "./CustomAxiosConfig";
import  AuthenticationService from './AuthenticationService';



const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}


export const getAllStudents = () => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.get(`/api/v1/students`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export const addNewStudent = (student) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.post(`/api/v1/students`,student);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};


export const updateStudent = (student) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.put(`/api/v1/students`,student);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export const deleteStudent = (studentId) => {
    let username = AuthenticationService.getLoggedInUser();

    console.log(username);
  try {
    return axios.delete(`api/v1/students/${studentId}`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};


