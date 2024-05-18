import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../familyslice"
import BusnissCreateService from "../../../services/BusnissCreateService"

import AddMarqueService from "../../../services/AddMarqueService"

import CreateSpecialityService from  '../../../services/CreateSpecialityService'

import AddFamilyService from  '../../../services/AddFamilyService'
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
    nomFam:"",

}

function AddFamilyModal({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = () => {
        if(leadObj.nomFam.trim() === "")return setErrorMessage("username Name is required!")
     
        else{
            let newLeadObj = {
               
          
                 "nomFam" : leadObj.nomFam,
      
            }

            AddFamilyService(newLeadObj).then(res=>console.table(res));

            dispatch(addNewLead({newLeadObj}))
            dispatch(showNotification({message : "New marque Added!", status : 1}))
            closeModal()
            //window.location.reload();
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }

    return(
        <> 

              <InputText type="text" defaultValue={leadObj.nomFam} updateType="nomFam" containerStyle="mt-4" labelTitle="nomFam " updateFormValue={updateFormValue}/>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddFamilyModal