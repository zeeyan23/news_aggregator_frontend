import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Alert,Spinner} from 'react-bootstrap';
import { useState } from 'react';
import classes from '../pages/sign-in.module.css'
import { useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { mainURL } from '../Utils/urlis';

export const SignIn = () => {

  const navigate=useNavigate();
  const [enteredEmail,setEnteredEmail]=useState('');
  const [enteredPassword,setEnteredPassword]=useState('');
  const [missingInput,setMissingInput]=useState(false);
  const [userNotFound,setUserNotFound]=useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function changeEmailHandler(event){
    setEnteredEmail(event.target.value);
  }
  function changePasswordHandler(event){
    setEnteredPassword(event.target.value)
  }

  function formHandler(event){
    event.preventDefault();
    setIsLoading(true);

    if (!enteredEmail || !enteredPassword ) {
      setMissingInput(true); // Display the missing input alert
      setIsLoading(false);
      return; // Exit the function early to prevent further execution
    }
    const FormData={
      email: enteredEmail,
      password: enteredPassword,
    }

    
    axios.post(`${mainURL}/api/user_login`,FormData)
    .then((result)=>{
      setIsLoading(false);
      if(result.data.message==='Invalid email or password.'){
        
        setUserNotFound(true);
        setMissingInput(false);
      }else if(result.data==""){
        setMissingInput(true);
      }
      else{
        setUserNotFound(false);
        window.localStorage.setItem('name', result.data.name);
        window.localStorage.setItem('email', result.data.email);
        window.localStorage.setItem('id', result.data.id);

        navigate('/dashboard');
      }
    }).catch((error) => {
      console.error('Error:', error.response || error.message);
      // Optionally, display the error message to the user
      alert('An error occurred. Please try again.');
    })
  }

  return (
    <>
    <div className={`container ${classes.backgroundImage} d-grid align-items-center`}>
      <div className={`row ${classes.innerContainer} d-flex align-items-center`}>
        <div className="col">
          <p class="fs-2 text-center text-light ">
          Welcome Back!
          </p>
        </div>
        <div className="col">
          <Form onSubmit={formHandler} className={classes.Form}>
            <Form.Group className='w-auto pt-4'>
              <Form.Control type="email"  placeholder="Enter email" name="email" value={enteredEmail} onChange={changeEmailHandler}/>
            </Form.Group>
            <Form.Group className='w-auto pt-4 pb-3'>
              <Form.Control type="password"  placeholder="Password" name="password" value={enteredPassword} onChange={changePasswordHandler}/>
            </Form.Group>
            <div className={classes.btn}>
              {!isLoading ? <Button type="submit" name="save" value="Submit" className={classes.btnStyle}>Submit</Button> : <Spinner animation="border" variant="light" />}
            </div>
            <div className="text-center mt-3">
              <p className="text-light">
                Don't have an account?{" "}
                <a href="/signup" className="text-warning">
                  Register here
                </a>
              </p>
            </div>
            {missingInput && 
            <Alert variant="danger" className={classes.Alert}>
              <p>
                Something went wrong...
              </p>
            </Alert>}
            {userNotFound && <Alert variant="danger" className={classes.Alert}>
              <p>
                User Not Found
              </p>
            </Alert>}
            
          </Form>
            
            
        </div>
      </div>
    </div>
    </>
  )
}

export default SignIn;