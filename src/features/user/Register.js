import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

import RegisterService from   '../../services/RegisterService'

function Register(){

    const INITIAL_REGISTER_OBJ = {
        username : "",
        email :"" ,

        password : "",

        role : "",
        
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)
    const titleCheckboxRefs = useRef([])

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(registerObj.username.trim() === "")return setErrorMessage("Nom requis!")
        if(registerObj.email.trim() === "")return setErrorMessage("Email requis!")
        if(registerObj.password.trim() === "")return setErrorMessage("Mot de passe requis!")
        if(registerObj.role === "")return setErrorMessage("Titre requis!")
        else{
            setLoading(true)
            // Call API to check user credentials and save token in localstorage
            localStorage.setItem("user", registerObj.email)
            localStorage.setItem("role",registerObj.role)
            RegisterService(registerObj).then(res=>{
                  console.table(res);

                  alert("res" + res) ;
                  localStorage.setItem("register",res.data);

            })
            setLoading(false)
            window.location.href = '/login'
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setRegisterObj({...registerObj, [updateType] : value})
    }

    const addTitleCheckboxRef = (ref) => {
        if (ref && !titleCheckboxRefs.current.includes(ref)) {
            titleCheckboxRefs.current.push(ref)
        }
    }

    const checkIfTitleSelected = () => {
        return titleCheckboxRefs.current.some(ref => ref.checked)
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>S'inscrire</h2>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4">

                            <InputText defaultValue={registerObj.username} updateType="username" containerStyle="mt-4" labelTitle="username" updateFormValue={updateFormValue}/>
  

     <br/>
     <br/>
     <br/>
     <br/>

                            <InputText defaultValue={registerObj.email} updateType="email" containerStyle="mt-4" labelTitle="email " updateFormValue={updateFormValue}/>

    <br/>
     <br/>
     <br/>
     <br/>
                            <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Mot De Passe" updateFormValue={updateFormValue}/>
<div className="h-4"></div>






    <br/>
     <br/>
     <br/>
     <br/>
                            <div className="flex flex-wrap justify-center mb-4">
                                <label className="mr-4">
                                    <input type="checkbox" value="A" checked={registerObj.role === "A"} onChange={(e) => updateFormValue({updateType: "role", value: e.target.value})} ref={addTitleCheckboxRef}/>
                                    <span className="ml-2">Admin</span>
                                </label>
                                <label className="mr-4">
                                    <input type="checkbox" value="G" checked={registerObj.role === "G"} onChange={(e) => updateFormValue({updateType: "role", value: e.target.value})} ref={addTitleCheckboxRef}/>
                                    <span className="ml-2">Gestionnaire</span>
                                </label>
                                <label className="mr-4">
                                    <input type="checkbox" value="T" checked={registerObj.role === "T"} onChange={(e) => updateFormValue({updateType: "role", value: e.target.value})} ref={addTitleCheckboxRef}/>
                                    <span className="ml-2">Technicien</span>
                                </label>
                                <label className="mr-4">
                                    <input type="checkbox" value="S" checked={registerObj.role === "S"} onChange={(e) => updateFormValue({updateType: "role", value: e.target.value})} ref={addTitleCheckboxRef}/>
                                    <span className="ml-2">Surveillant</span>
                                </label>
                            </div>
                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>S'inscrire</button>

                        <div className='text-center mt-4'>Vous avez déjà un compte? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Se Connecter</span></Link></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register