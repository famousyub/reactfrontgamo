import ApiService from "./ApiService";


const PATIENT_API_BASE_URL = '/gestionnaire';
const CITIES = '/cities';
class PatientService {

    getPatients() {
        return ApiService.getAll(PATIENT_API_BASE_URL + "/ogestion");
    }

    getPatientById(patientId) {
        return ApiService.getOneById(PATIENT_API_BASE_URL + '/ogestion/' + patientId);
    }

    // fetchPatientByEmail(email) {
    //     return axios.get(PATIENT_API_BASE_URL + '/find-by-email/' + email);
    // }

    deletePatient(Id) {
        return ApiService.deleteById(PATIENT_API_BASE_URL + '/ogestion/' + Id);
    }

    addPatient(patient) {
        return ApiService.post(PATIENT_API_BASE_URL+"/ogestion", patient);
    }

    editPatient(patient) {
        return ApiService.put(PATIENT_API_BASE_URL + '/ogestion/' + patient.patientid, patient);
    }
    getCities() {
        return ApiService.getAllDatas(PATIENT_API_BASE_URL+CITIES);
    }
}

export default new PatientService();