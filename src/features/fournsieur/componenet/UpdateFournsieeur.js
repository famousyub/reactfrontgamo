import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../fournsieurSlice"
import BusnissCreateService from "../../../services/BusnissCreateService"

import AddFourniseurService from "../../../services/CreateFournsieurService"

import CreateSpecialityService from  '../../../services/CreateSpecialityService'


/*
const INITIAL_LEAD_OBJ = {
    first_name : "",
    last_name : "",
    email : ""
}




"businessName":  "test" ,
    "address" : "nabel",
    "username":"ttest",
    "email" : "est@gmail.com" ,
    "role" : "technicien",
    "password":"electronic" 
  
*/
const INITIAL_LEAD_OBJ ={
    nomF:"",
    prenomF:"",
    adresseF:"",
    TelF:"",
    EmailF:"",

    matriculeFiscale:""

}

function AddFournisseurModal({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = () => {
        if(leadObj.nomF.trim() === "")return setErrorMessage("username Name is required!")
     
        else{
            let newLeadObj = {
               
          
                 "nomF" : leadObj.nomF,
                 "prenomF": leadObj.prenomF ,
                 "adresseF" :leadObj.adresseF,
                 "TelF":leadObj.TelF,
                 "EmailF" : leadObj.EmailF ,
                 "matriculeFiscale" : leadObj.matriculeFiscale,
         
               
      
            }

            AddFourniseurService(newLeadObj).then(res=>console.table(res));

            dispatch(addNewLead({newLeadObj}))
            dispatch(showNotification({message : "New marque Added!", status : 1}))
            closeModal()
            window.location.reload();
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }

    return(
        <> 

              <InputText type="text" defaultValue={leadObj.nomF} updateType="nomF" containerStyle="mt-4" labelTitle="nomF " updateFormValue={updateFormValue}/>
              <InputText type="text" defaultValue={leadObj.adresseF} updateType="adresseF" containerStyle="mt-4" labelTitle="adresseF " updateFormValue={updateFormValue}/>
              <InputText type="text" defaultValue={leadObj.prenomF} updateType="prenomF" containerStyle="mt-4" labelTitle="prenomF " updateFormValue={updateFormValue}/>
              <InputText type="text" defaultValue={leadObj.EmailF} updateType="EmailF" containerStyle="mt-4" labelTitle="EmailF " updateFormValue={updateFormValue}/>
              <InputText type="text" defaultValue={leadObj.TelF} updateType="TelF" containerStyle="mt-4" labelTitle="TelF " updateFormValue={updateFormValue}/>
              <InputText type="text" defaultValue={leadObj.matriculeFiscale} updateType="matriculeFiscale" containerStyle="mt-4" labelTitle="matriculeFiscale " updateFormValue={updateFormValue}/>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddFournisseurModal