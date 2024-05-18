import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"
import BusnissCreateService from "../../../services/BusnissCreateService"
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
    businessName:"",
    address : "",
    username:"",
    email : "" ,
    role : "",
    password: "" 
}

function AddLeadModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = () => {
        if(leadObj.username.trim() === "")return setErrorMessage("username Name is required!")
        else if(leadObj.email.trim() === "")return setErrorMessage("Email id is required!")
        else{
            let newLeadObj = {
               
          
                 "businessName" : leadObj.businessName,
                "address" : leadObj.address,
                "username":leadObj.username,
                "email" : leadObj.email ,
                "role" : leadObj.role,
                "password": leadObj.password 
            }

            BusnissCreateService(newLeadObj).then(res=>console.table(res));

            dispatch(addNewLead({newLeadObj}))
            dispatch(showNotification({message : "New Lead Added!", status : 1}))
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

              <InputText type="text" defaultValue={leadObj.businessName} updateType="businessName" containerStyle="mt-4" labelTitle="businessName " updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.address} updateType="address" containerStyle="mt-4" labelTitle="address " updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.username} updateType="username" containerStyle="mt-4" labelTitle="username" updateFormValue={updateFormValue}/>

            <InputText type="email" defaultValue={leadObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.role} updateType="role" containerStyle="mt-4" labelTitle="role " updateFormValue={updateFormValue}/>

<InputText type="password" defaultValue={leadObj.password} updateType="password" containerStyle="mt-4" labelTitle="password " updateFormValue={updateFormValue}/>


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddLeadModalBody