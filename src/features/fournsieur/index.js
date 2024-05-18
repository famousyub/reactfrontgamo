import moment from "moment"
import { useEffect,useLayoutEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./fournsieurSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'


import MarqueService from "../../services/MarqueService" 



import specialityService from "../../services/SpecialityService" 
import BusnissCreateService from "../../services/BusnissCreateService"  
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FourniseurService from "../../services/FourniseurService"




const TopSideButtons = () => {

    const navigate = useNavigate();
    const [business, setBusiness] = useState([]);

    const dispatch = useDispatch()

    const openAddNewLeadModal1 = () => {
        dispatch(openModal({title : "Add New fourniseuer", bodyType : MODAL_BODY_TYPES.Fourniseur_ADD_NEW}))
    }

    const openAddNewLeadModal= () => {
        dispatch(openModal({title : "Add New Fourniseur", bodyType : MODAL_BODY_TYPES.Fourniseur_ADD_NEW}))
    }


    useLayoutEffect(() => {
        let unmounted = false;
    
        MarqueService().then((response) => {
          if (!unmounted) {
            setBusiness(response.data);

            console.log(response.data);
          }
        });
        return () => {
          unmounted = true;
        };
      }, []);

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal1()}>Add fourniseur</button>

        
        </div>
    )
}



const TopSideButtonsSpeciality = () => {

    const navigate = useNavigate();
    const [business, setBusiness] = useState([]);

    const dispatch = useDispatch()

    const openAddNewLeadModal1 = () => {
        dispatch(openModal({title : "Add New fourniseur", bodyType : MODAL_BODY_TYPES.Fourniseur_ADD_NEW}))
    }

    const openAddNewLeadModal= () => {
        dispatch(openModal({title : "Add New Lead", bodyType : MODAL_BODY_TYPES.Fourniseur_ADD_NEW}))
    }


    useLayoutEffect(() => {
        let unmounted = false;
    
        FourniseurService().then((response) => {
          if (!unmounted) {
            setBusiness(response.data);

            console.log(response.data);
          }
        });
        return () => {
          unmounted = true;
        };
      }, []);

    return(
        <div className="inline-block float-right">
        

            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal1()}>Add Speciality </button>
        </div>
    )
}

function Fournisseur(){

    const {leads } = useSelector(state => state.lead)


    const navigate = useNavigate();
    const [business, setBusiness] = useState([]);
    const [speciality, setSpeciality] = useState([]);

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Add New marque", bodyType : MODAL_BODY_TYPES.MARQUE_ADD_NEW}))
    }

 
    useLayoutEffect(() => {
        let unmounted = false;
    
        FourniseurService().then((response) => {
          if (!unmounted) {
            setBusiness(response.data);

            console.log(response.data);
          }
        });

        specialityService().then(res=>{
            setSpeciality(res.data);
            console.table(res.data);
        })

        return () => {
          unmounted = true;
        };
      }, []);

    useEffect(() => {
        dispatch(getLeadsContent())
    }, [])

    

    const getDummyStatus = (index) => {
        if(index % 5 === 0)return <div className="badge">Not Interested</div>
        else if(index % 5 === 1)return <div className="badge badge-primary">In Progress</div>
        else if(index % 5 === 2)return <div className="badge badge-secondary">Sold</div>
        else if(index % 5 === 3)return <div className="badge badge-accent">Need Followup</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const deleteCurrentLead = (index) => {
        dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Are you sure you want to delete this lead?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index}}))
    }

    return(
        <>
            
            <TitleCard title="Current Leads" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Status</th>
                      
                        <th>nomf</th>

                        <th>prenomf</th>
                        <th>EmailF</th>
                        <th>matriculeFiscale</th>
                        <th>TelF</th>

                        <th>Assigned To</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            business.map((l, k) => {
                                return(
                                    <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                {getDummyStatus(k)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{l.nomF}</div>
                                                <div className="text-sm opacity-50">{l.matriculeFiscale}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.prenomF}</td>
                                    <td> {l.telF}</td>
                                    <td> {l.adresseF}</td>
                                    <td>{l.EmailF}</td>                               
                                    <td>{moment(new Date()).add(-5*(k+2), 'days').format("DD MMM YY")}</td>
                                    <td>{l.nomMarque}</td>
                              
                                    <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(k)}><TrashIcon className="w-5"/></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            
                <TitleCard title="Current Speciality" topMargin="mt-2" TopSideButtons={<TopSideButtonsSpeciality />}>

                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Status</th>
                        <th>speciality name Id</th>
                       
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            speciality.map((l, k) => {
                                return(
                                    <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                {getDummyStatus(k)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{l.nomSpec}</div>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.nomSpec}</td>
                                    <td>{moment(new Date()).add(-5*(k+2), 'days').format("DD MMM YY")}</td>
                                
                                    <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(k)}><TrashIcon className="w-5"/></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                </TitleCard>


            </div>
            </TitleCard>
        </>
    )
}


export default Fournisseur