import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../InterventionSlice"
import BusnissCreateService from "../../../services/BusnissCreateService"

import AddInterventionService from "../../../services/AddIntervention"

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
 

     statutInter : "",

      dateInter : "",

  descriptionIner : ""

}

function AddInterventionModal({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = () => {
        if(leadObj.statutInter.trim() === "")return setErrorMessage("username Name is required!")
     
        else{
            let newLeadObj = {
               
          
                 "statutInter" : leadObj.statutInter,
                 "dateInter": leadObj.dateInter ,
                 "descriptionIner" :leadObj.descriptionIner,
             
               
      
            }

            AddInterventionService(newLeadObj).then(res=>console.table(res));

            dispatch(addNewLead({newLeadObj}))
            dispatch(showNotification({message : "New intervention  Added!", status : 1}))
            closeModal()
           // window.location.reload();
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }

    return(
        <> 

              <InputText type="text" defaultValue={leadObj.statutInter} updateType="statutInter" containerStyle="mt-4" labelTitle="statutInter " updateFormValue={updateFormValue}/>
              <InputText type="date" defaultValue={leadObj.dateInter} updateType="dateInter" containerStyle="mt-4" labelTitle="dateInter " updateFormValue={updateFormValue}/>
              <InputText type="text" defaultValue={leadObj.descriptionIner} updateType="descriptionIner" containerStyle="mt-4" labelTitle="descriptionIner " updateFormValue={updateFormValue}/>
   
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddInterventionModal