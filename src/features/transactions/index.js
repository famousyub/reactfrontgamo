import moment from "moment"
import { useEffect, useState,useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import './Settings.css'
import  SettingsForm from  './SettingsForm'

import SettingsList from  './SettingsList'
import BusnissService from "../../services/BusnissService"  

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]
    const dispatch =  useDispatch();
    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }



    useEffect(() => {
        if(searchText == ""){
            removeAppliedFilter()
        }else{
            applySearch(searchText)
        }
    }, [searchText])

    return(
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText}/>
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2"/>Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        locationFilters.map((l, k) => {
                            return  <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div>
        </div>
    )
}



const Settings = ()=>{

    


    const [friends, setFriends] = useState([]);

    useEffect(() => {
      const storedFriends = JSON.parse(localStorage.getItem('settings'));
      if (storedFriends) {
        setFriends(storedFriends);
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('settings', JSON.stringify(friends));
    }, [friends]);
  
    const handleAddFriend = (newFriend) => {
      setFriends([...friends, newFriend]);
    };
  
    const handleEditFriend = (friendToUpdate) => {
      const updatedFriends = friends.map((friend) =>
        friend.id === friendToUpdate.id ? friendToUpdate : friend
      );
      setFriends(updatedFriends);
    };
  
    const handleDeleteFriend = (id) => {
      const updatedFriends = friends.filter((friend) => friend.id !== id);
      setFriends(updatedFriends);
    };
  
    return (
      <div className="App">
        <h1>Settings Notebook</h1>
        <SettingsForm   onAddFriend={handleAddFriend} />
        <SettingsList
          friends={friends}
          onEditFriend={handleEditFriend}
          onDeleteFriend={handleDeleteFriend}
        />
      </div>
    );
  };

function Transactions(){


    const [trans, setTrans] = useState(RECENT_TRANSACTIONS)

    const navigate = useNavigate();
    const [business, setBusiness] = useState([]);
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        let unmounted = false;
    
        BusnissService().then((response) => {
          if (!unmounted) {
            setBusiness(response.data);

            console.log(response.data);
          }
        });
        return () => {
          unmounted = true;
        };
      }, []);

  


    const removeFilter = () => {
        setTrans(RECENT_TRANSACTIONS)
    }

    const applyFilter = (params) => {
        let filteredTransactions = business.filter((t) => {return t.location == params})
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = business.filter((t) => {return t.email.toLowerCase().includes(value.toLowerCase()) ||  t.email.toLowerCase().includes(value.toLowerCase())})
        setTrans(filteredTransactions)
    }

    return(
        <>
               <Settings/>
            <TitleCard title="Recent Transactions" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>}>
 
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>role</th>
                        <th>username</th>
                        <th>creation  Date</th>
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
                                                <div className="mask mask-circle w-12 h-12">
                                                       
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    
                                                <h1>
                                                {l.username} 
                                                           </h1></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.email}</td>
                                    <td>{l.role}</td>
                                    <td>{l.username}</td>
                                    <td>{moment(l.date).format("D MMM")}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
          
            </TitleCard>
        </>
    )
}


export default Transactions