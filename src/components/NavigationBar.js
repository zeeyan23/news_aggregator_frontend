import React, { useState } from 'react'
import {Navbar,Container,Button, Modal, Nav, NavDropdown, Offcanvas, Form as EditForm, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import classes from '../components/NavigationBar.module.css';
import logo from '../Utils/website_logo/website-logo.webp';
import { mainURL } from '../Utils/urlis';
import axios from 'axios';

export const NavigationBar = () => {

  const navigate=useNavigate();
  const [show, setShow] = useState(false);
  const user_name = window.localStorage.getItem("name");
  const email = window.localStorage.getItem("email");
  const user_id = window.localStorage.getItem("id");




  function handleClose(){
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    setShow(false);
    navigate('/');

  }

  function closeModal(){
    setShow(false)
  }

  function logoutHandler(){
    setShow(true)
  }

  const startsWithAlphabet = (name) => /^[a-zA-Z]/.test(name);

  

  return (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
            <Container>
                <Navbar.Brand href={`http://localhost:3000/dashboard`}>
                <img
                  alt=""
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                News aggregator
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" className={classes.resnavbar}>
                <Nav className="me-auto justify-content-end" id={classes.btnStyle}>
                  <Nav.Link href="/personalized/news_feed/" className="nav-link text-light btn btn-outline-info" id={classes.link}>Personalized search</Nav.Link>   
                  <Nav.Link href="/saved_articles/" className="nav-link text-light btn btn-outline-info" id={classes.link}>Saved articles</Nav.Link>                                 
                </Nav>
                <Nav className='justify-content-end' id={classes.btn}>
                  <Button variant="outline-danger" onClick={logoutHandler}>Log out</Button>
                  {user_name && startsWithAlphabet(user_name) ? (
                    <button
                      
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        border: "none",
                        fontSize: "20px",
                        cursor: "pointer",
                        marginLeft:8
                      }}
                    >
                      {user_name[0].toUpperCase()}
                    </button>
                  ) : (
                    <button
                      
                      style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        border: "2px solid #dc3545",
                        background: "transparent",
                        color: "#dc3545",
                        cursor: "pointer",
                      }}
                    >
                      {user_name}
                    </button>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to logout</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                No
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          
        </>
  )
}

export default NavigationBar;