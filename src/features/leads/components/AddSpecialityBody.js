import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"
import BusnissCreateService from "../../../services/BusnissCreateService"

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
    nomSpec:"",

}

function AddSpecialityModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = () => {
        if(leadObj.nomSpec.trim() === "")return setErrorMessage("username Name is required!")
     
        else{
            let newLeadObj = {
               
          
                 "nomSpec" : leadObj.nomSpec,
      
            }

            CreateSpecialityService(newLeadObj).then(res=>console.table(res));

            dispatch(addNewLead({newLeadObj}))
            dispatch(showNotification({message : "New Lead Added!", status : 1}))
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

              <InputText type="text" defaultValue={leadObj.nomSpec} updateType="nomSpec" containerStyle="mt-4" labelTitle="nomSpec " updateFormValue={updateFormValue}/>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddSpecialityModalBody