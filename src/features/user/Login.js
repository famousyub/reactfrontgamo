import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import  AuthenticateUserDataService from '../../services/AuthenticateUserDataService'


import  AuthenticationService from  '../../services/AuthenticationService';
import LoginService from  '../../services/LoginService';

import styles from  '../../css/Forms.module.css'
import LoginCurentUserService from "../../services/LoginCurrentService"  

import LoadingDotsDark from "./animation/LoadingDotsDark";
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({
    hasLoginFailed: false,
    showSuccessMessage: false,
  });

  const validate = () => {
    const errors = {};

    if (!credentials.username) {
      errors.username = "Username required";
    } else if (credentials.username.length < 4) {
      errors.username = "Minimum 4 characters";
    }

    if (!credentials.password) {
      errors.password = "A password is required";
    }

    return errors;
  };

  const loginClicked = async (event) => {
    event.preventDefault();
    console.log(credentials);

    let errors = validate(credentials);
    setErrors(errors);
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);

      LoginCurentUserService(credentials.username).then((response) => {
        if (!unmounted) {
          
          localStorage.setItem("user", response.data);
          localStorage.setItem("role",response.data.role);
          console.log(response.data);
        }
      });



      const res = await AuthenticateUserDataService(
        credentials.username,
        credentials.password
      );
      console.table(res);
      console.log(res.data);
      console.table(res);

      localStorage.setItem("jwtToken" , res.data.jwtToken);

      if (res.status !== 200) {
        setLoading(false);
        setLoginState((prevState) => ({ ...prevState, hasLoginFailed: true }));
        setLoginState((prevState) => ({
          ...prevState,
          showSuccessMessage: false,
        }));
      } else {

       
        let jwtToken = res.data.jwtToken;
        const token = `Bearer ${jwtToken}`;
        AuthenticationService.setUpToken(token);
        const response = await LoginService(credentials.username, jwtToken);
     
        console.log(response);
        if (response.status !== 200) {
          setLoading(false);
          setLoginState((prevState) => ({
            ...prevState,
            hasLoginFailed: true,
          }));
          setLoginState((prevState) => ({
            ...prevState,
            showSuccessMessage: false,
          }));
        } else if (response.data === "USER") {
          AuthenticationService.registerSuccessfulLoginUser(
            credentials.username
          );
          navigate("/app/userdetail"); //user-home
        } else if (response.data === "BUSINESS_USER") {
          AuthenticationService.registerSuccessfulLoginBusiness(
            credentials.username
          );
          navigate("/app/userdetail");
        }
      }
    }
  };

  return (
    <>

<div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
      <main>
        <form className={styles.form_style}>
          <div className={styles.loginh1}>
            <h1>Login</h1>
          </div>
          <div className={styles.login}>
            {loginState.hasLoginFailed && (
              <div className={styles.midErrors}> Invalid credentials</div>
            )}
            {loginState.showSuccessMessage && (
              <div className={styles.midErrors}>Login successful</div>
            )}
          </div>

          <div className={styles.form_field}>
            <input
              id="username"
              type="text"
              name="username"
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
            />
            <label htmlFor="username" className={styles.label_name}>
              {Object.keys(errors).length === 0 && (
                <span className={styles.content_name}>Username</span>
              )}
              {errors.username && (
                <small className={styles.errors}>{errors.username}</small>
              )}
            </label>
          </div>

          <div className={styles.form_field}>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <label htmlFor="password" className={styles.label_name}>
              {Object.keys(errors).length === 0 && (
                <span className={styles.content_name}>Password</span>
              )}
              {errors.password && (
                <small className={styles.errors}>Password required</small>
              )}
            </label>
          </div>
          <p>
            <Link
              to="/change-password"
              className={styles.button_password_forgot}
            >
              Forgot your password?
            </Link>
          </p>
          {loading && <LoadingDotsDark className={styles.dots} />}  
          {!loading && (
            <button className={styles.button} onClick={loginClicked}>
              Login
            </button>
          )}
        </form>
        <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>

      </main>

      </div>
      </div>
      </div>
      </div>
     
   
    </>
  );
};

export default Login;
