import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
//import checkAuth from './app/auth';
import initializeApp from './app/init';
import UserCreate from './features/settings/billing/UserCreate';
import UserUpdate from './features/settings/billing/UserUpdate';
import UserList from './features/settings/billing/Users';
import { useState } from 'react';
import Leads from './features/leads';
import Fournisseur from './features/fournsieur';
import Transactions from './features/transactions';
import Parameter from './features/parameter';
import   Welcome from   './pages/protected/Welcome'
import Marques from './features/marque';
// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))


// Initializing different libraries
initializeApp()


// Check for login and initialize axios
//const token = checkAuth()

const token = localStorage.getItem("token");
const   rolem = localStorage.getItem("role");


function App() {
  

  useEffect(() => {
    // 👆 daisy UI themes initialization
    
   //technicien


  

  //alert(rolem);


    themeChange(false)
  }, [])


  if (rolem=="user_admin")


  return(

    <>
    <Router>
      <Routes>
        
      <Route exact path='/' component={UserList} />
          <Route exact path='/create' component={UserCreate} />
          <Route exact path='/update/:id' component={UserUpdate} />
      <Route path="/app/leads" element={<Fournisseur />} />
          <Route path="/app/users" element={<Leads />} />
          <Route path="/app/paramaeter" element={<Parameter/>} />
          <Route path="/app/users" element={<Layout />} />
          <Route path="/app/marques" element={<Marques />} />
          <Route path="/app/*" element={<Layout />} />

          
          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />}/>
      </Routes>
    </Router>
    </>
     
  )



   else  


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />

          <Route exact path='/users' component={UserList} />
          <Route exact path='/create' component={UserCreate} />
          <Route exact path='/update/:id' component={UserUpdate} />
          
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />
          
   
     




          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
