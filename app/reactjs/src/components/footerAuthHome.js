import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { Backdrop, Button, Fade } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ContainerDef, FooterDefault, ModalPopIn } from '../assets/styles/globalStyle';
import SeeCounter from './ui-elements/seeCounter';
import { ModalDefault } from '../assets/styles/componentStyle';
import InputField from './ui-elements/inputField';
import InscriptionForm from './inscriptionForm';
import ErrorFormMessage from './errorFormMessage';
import * as actionTypes from "../store/functions/actionTypes";

export default function FooterAuthHome({}) {

    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1200px)" });

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [message, setMessage] = useState(true);
    const [linkForgot, setLinkForgot] = useState("");
    const [state, setState] = useState({
      email: {
          label: "Nom d'utilisateur ou adresse e-mail",
          name: "email",
          value: "Lys",
          type: "text",
          error: true,
          errorMessage: "",
          required: true,
      },
      password: {
          label: "Mot de passe",
          name: "password",
          value: "123456",
          type: "password",
          error: false,
          required: true,
      },
      emailForgot: {
          label: "Adresse email",
          name: "emailForgot",
          value: "",
          type: "email",
          error: false,
          errorMessage: "",
          required: true,
      },
  });

  const submitLogin = (e) => {
    e.preventDefault();
    handleClose();
    dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSb3lhbGlzIiwic3ViIjoxLCJ1c2VybmFtZSI6ImF5b3ViIiwiZW1haWwiOiJheW91YkBleGFtcGxlLmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2NDc4NTA0ODE3NTMsImV4cCI6MTY0ODEwOTY4MTc1M30.Y6M5ldfwVr3Z94ALcAqFOLbSNHn2a0TGZbB4ZhnV_0k",
        refreshToken: "test",
    });
  };

    return (<FooterDefault>
      <ContainerDef>
      <Row className='align-items-center justify-content-center'>
              {isDesktopOrLaptop && (
              <Col md={3}>
                  <div className="d-md-flex">
                      <SeeCounter countSee={14} />
                  </div>
              </Col>
              )}
              <Col md={6}>
                  <div className='d-flex justify-content-center'>
                      <InscriptionForm />
                      <ModalDefault className="modal-footer modal-connect">
                          <Button onClick={handleOpen}>Se connecter</Button>
                          <ModalPopIn
                              aria-labelledby="transition-modal-title"
                              aria-describedby="transition-modal-description"
                              open={open}
                              onClose={handleClose}
                              closeAfterTransition
                              BackdropComponent={Backdrop}
                              BackdropProps={{
                                  timeout: 500,
                              }}
                              className="modal-def"
                          >
                              <Fade in={open}>
                              <div className="content-modal">
                                  {linkForgot === "forgotPass" ? 
                                  <div className="connection-content">
                                      <div className='header-modal'>
                                          <KeyboardBackspaceIcon onClick={() => setLinkForgot(null)} />
                                          <h2 className='titre-modal'>Mot de passe oublié ?</h2>
                                      </div>
                                      <form className='form-forgot-pass'>
                                          <div className='content-form'>
                                              <InputField
                                                  {...state.emailForgot}
                                                  onChange={(e) => {
                                                      const cpState = { ...state };
                                                      cpState.emailForgot.value = e.target.value;
                                                      setState(cpState);
                                                      setMessage(null)
                                                  }}
                                              />
                                          </div>
                                          <div className='bloc-btn-modal'>
                                              <Button onClick={(e) => {setLinkForgot("messageForgotPass");}}>Envoyer</Button>
                                          </div>
                                      </form>
                                  </div>
                                          : linkForgot === "messageForgotPass" ?
                                  <div className="message-modal-content">
                                      <CheckCircleOutlineIcon />
                                      <p className='titre-message-modal'>E-mail de mise à jour de mot de passe envoyé</p>
                                      <div className='text-message-modal'>
                                          <p>Un e-mail vous a été envoyé.</p>
                                          <p>Suivez les instructions pour mettre à jour votre mot de passe.</p>
                                      </div>
                                          <Button onClick={(e) => { handleClose(); setTimeout(() => { setLinkForgot(null); }, 100);  }}>Ok</Button>
                                  </div>
                                  :
                                  <div className="connection-content">
                                      <div className='header-modal'>
                                          <KeyboardBackspaceIcon onClick={() => handleClose()} />
                                          <h2 className='titre-modal'>Connexion</h2>
                                      </div>
                                      <form className='form-connexion'  onSubmit={submitLogin}>
                                          {message ? <ErrorFormMessage text="Le nom d’utilisateur ou le mot de passe est incorrect" onClick={() => setMessage(null)} /> : null}

                                          <div className='content-form'>
                                              <InputField
                                                  {...state.email}
                                                  onChange={(e) => {
                                                      const cpState = { ...state };
                                                      cpState.email.value = e.target.value;
                                                      setState(cpState);
                                                      setMessage(null)
                                                  }}
                                              />
                                              <InputField
                                                  className="password-input"
                                                  {...state.password}
                                                  onChange={(e) => {
                                                      const cpState = { ...state };
                                                      cpState.password.value = e.target.value;
                                                      setState(cpState);
                                                      setMessage(null)
                                                  }}
                                              />
                                              <span
                                                  className="pass-oublier"
                                                  onClick={(e) => {
                                                      setLinkForgot("forgotPass");
                                                  }}
                                              >
                                                  Mot de passe oublié ?
                                              </span>
                                          </div>
                                          <div className='bloc-btn-modal'>
                                              <Button type="submit">Se connecter</Button>
                                          </div>
                                      </form>
                                  </div>
                                  }
                                  
                              </div>
                              </Fade>
                          </ModalPopIn>
                      </ModalDefault>
                      
                  </div>
              </Col>
              {isDesktopOrLaptop && (
              <Col md={3}>
              </Col>
              )}
          </Row>
      </ContainerDef>
  
</FooterDefault>);
}
