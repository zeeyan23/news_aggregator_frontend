import React from 'react'
import {Form,Button,Alert,Spinner} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from '../pages/sign-up.module.css';
import { useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import { mainDevURL, mainURL } from '../Utils/urlis';
export const SignUp = (props) => {

  const navigate=useNavigate();
  const [enteredName,setEnteredName]=useState();
  const [enteredEmail,setEnteredEmail]=useState();
  const [enteredPassword,setEnteredPassword]=useState();
  const [enteredCountry,setEnteredCountry]=useState();
  const [enteredInterests,setEnteredInterests]=useState();
  const [missingInput,setMissingInput]=useState(false);
  const [userFound,setUserFound]=useState(false);
  const [test,setTest]=useState(false);

  const [loading, setLoading]=useState(false);

  function changeNameHandler(event){
    setEnteredName(event.target.value);
  }
  function changeEmailHandler(event){
    setEnteredEmail(event.target.value);
  }
  function changePasswordHandler(event){
    setEnteredPassword(event.target.value)
  }
  function changeInterestsHandler(event){
    setEnteredInterests(event.target.value)
  }
  function changeCountryHandler(event){
    setEnteredCountry(event.target.value)
  }

  function submitHandler(event){
    event.preventDefault();
    setLoading(true);
    if (!enteredName || !enteredEmail || !enteredPassword || !enteredCountry || !enteredInterests) {
      setLoading(false);
      setMissingInput(true); // Display the missing input alert
      return; // Exit the function early to prevent further execution
    }
    const FormData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      country: enteredCountry,
      interests: enteredInterests
    };
    axios.post(`${mainURL}/create_account`,FormData)
    .then((result)=>{
      setLoading(false);
      if (result.data.status === 'error' && result.data.message === 'User with this email already exists.') {
        
        setUserFound(true);
        setMissingInput(false);
      } else if (enteredName === null || enteredEmail === null || enteredPassword === null) {
        setMissingInput(true);
      } else {
        setTest(true);
        navigate('/');
      }
    });
  }
  return (
    <>
      <div className={`container ${classes.backgroundImage} d-grid align-items-center`}>
        <div className={`row ${classes.innerContainer} d-flex align-items-center`}>
          <div className="col">
            <p class="fs-2 text-center text-light ">
              Register now and keep your memories and ideas safe and organized.
            </p>
          </div>
          <div className="col">
            <Form onSubmit={submitHandler} className={classes.signupForm}>
              <Form.Group className='w-auto pt-4 pb-1'> 
                <Form.Control type="name"  placeholder="Enter name" name="name" onChange={changeNameHandler} />
              </Form.Group>
              <Form.Group className='w-auto pt-3 pb-1'> 
                <Form.Control type="email"  placeholder="Enter email" name="email" onChange={changeEmailHandler}/>
              </Form.Group>
              <Form.Group className='w-auto pt-3 pb-1'> 
                <Form.Control type="password"  placeholder="Enter password" name="password" onChange={changePasswordHandler}/>
              </Form.Group>
              <div className="row pt-3 pb-1">
                <div className="col-lg-5 col-md-6 col-sm-12 pb-2">
                  <Form.Control
                    type="text"
                    placeholder="Interests? ex.sports, business etc..."
                    name="interests"
                    onChange={changeInterestsHandler}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    name="country"
                    onChange={changeCountryHandler}
                  />
                </div>
              </div>
              <div className={classes.btn}>
                {!loading ? <Button type="submit" name="save" value="Submit" className={classes.btnStyle}>Submit</Button> : <Spinner animation="border" variant="light" />}
                
              </div>
              <div className="text-center mt-3">
                <p className="text-light">
                  Already have account?{" "}
                  <a href="/" className="text-warning">
                    Login
                  </a>
                </p>
              </div>
              {missingInput && (
                <Alert variant="danger" className={classes.Alert}>
                  <p>Form cannot be empty!</p>
                </Alert>
              )}

              {userFound &&
            <>
              <Alert variant="danger" className={classes.Alert}>User Already found</Alert>
            </>}
            </Form>
            
            
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;


