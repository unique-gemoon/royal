import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ModalDefault } from "../assets/styles/componentStyle";
import { Backdrop, Button, Fade } from "@mui/material";
import { ModalPopIn } from "../assets/styles/globalStyle";
import InputField from "./ui-elements/inputField";
import ErrorFormMessage from "./errorFormMessage";
import ButtonDef from "./ui-elements/buttonDef";
import * as actionTypes from "../store/functions/actionTypes";
import { clearErrors, validateEmail } from "../helper/form";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { getMsgError } from "../helper/fonctions";

export default function InscriptionForm({}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState(true);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({});
  const [state, setState] = useState({
    username: {
      label: "Nom d'utilisateur",
      name: "username",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    email: {
      label: "Adresse e-mail",
      name: "email",
      value: "",
      type: "email",
      error: false,
      errorMessage: "",
      required: true,
    },
    password: {
      label: "Mot de passe",
      name: "password",
      value: "",
      type: "password",
      error: false,
      errorMessage: "",
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

  const submitRegister = (e) => {
    e.preventDefault();
    if (!submitting) {
      setState(clearErrors(state));
      const cpState = { ...state };
      let username = state.username.value;
      let email = state.email.value;
      let password = state.password.value;
      let msg = "";

      if (!username && !email && !password) {
        msgErrors({
          username: false,
          email: false,
          password: false,
          msg: "Veuillez insérer votre adresse courriel de connexion.",
          submit: false,
        });
      } else {
        if (String(username).length < 1) {
          username = false;
          cpState.username = {
            ...cpState.username,
            error: true,
            errorMessage: "Veuillez insérer votre nom d'utilisateur .",
          };
        }
        if (!validateEmail(email)) {
          email = false;
          cpState.email = {
            ...cpState.email,
            error: true,
            errorMessage:
              "Votre adresse email semble comporter une erreur, veuillez vérifier.",
          };
        }
        if (String(password).length < 6) {
          password = false;
          cpState.password = {
            ...cpState.password,
            error: true,
            errorMessage:
              "Votre mot de passe doit contenir au moins 6 caractères.",
          };
        }

        if (username && email && password) {
          msgErrors({ submit: true });
          connector({
            method: "post",
            url: endPoints.REGISTER,
            data: { username, email, password },
            success: (response) => {
              msgErrors({ submit: false });
              setModalSuccess(true);
              setData({
                type: actionTypes.LOGIN_SUCCESS,
                token: response.data.token,
                refreshToken: response.data.refreshToken,
              });
            },
            catch: (error) => {
              msgErrors({ msg: getMsgError(error), submit: false });
            },
          });
        } else {
          setState({ ...cpState });
        }
      }
    }
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage(e.msg);
    const cpState = { ...state };
    if (e.email !== undefined) cpState.email.error = e.email;
    if (e.username !== undefined) cpState.username.error = e.username;
    if (e.password !== undefined) cpState.password.error = e.password;
    if (e.submit !== undefined) setSubmitting(e.submit);
    setState(cpState);
  };

  return (
    <ModalDefault className="modal-footer modal-sinscrir">
      <Button onClick={handleOpen}>S'inscrire</Button>
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
            {modalSuccess ? (
              <div className="message-modal-content">
                <CheckCircleOutlineIcon />
                <p className="titre-message-modal">
                  Inscription réalisée avec succès
                </p>
                <div className="text-message-modal">
                  <p>
                    Votre inscription s'est bien réalisée. Veuillez vérifier
                    votre adresse e-mail pour confirmer votre inscription.
                  </p>
                </div>
                <ButtonDef
                  spinner={submitting}
                  textButton={"Ok"}
                  onClick={(e) => {
                    handleClose();
                    setTimeout(() => {
                      setModalSuccess(false);
                      dispatch(data);
                    }, 100);
                  }}
                />
              </div>
            ) : (
              <div className="connection-content">
                <div className="header-modal">
                  <KeyboardBackspaceIcon onClick={() => handleClose()} />
                  <h2 className="titre-modal">Inscription</h2>
                </div>
                <form className="form-connexion" onSubmit={submitRegister}>
                  {message ? (
                    <ErrorFormMessage
                      text={message}
                      onClick={() => setMessage(null)}
                    />
                  ) : null}
                  <div className="content-form">
                    <Row>
                      <Col sm={6}>
                        <InputField
                          {...state.username}
                          state={state.username}
                          setState={(e) => {
                            setState({ ...state, username: e });
                          }}
                          onChange={(e) => {
                            const cpState = { ...state };
                            cpState.username.value = e.target.value;
                            cpState.username.error = false;
                            cpState.username.errorMessage = null;
                            setState(cpState);
                            setMessage(null);
                          }}
                        />
                      </Col>
                      <Col sm={6}>
                        <InputField
                          {...state.password}
                          state={state.password}
                          setState={(e) => {
                            setState({ ...state, password: e });
                          }}
                          onChange={(e) => {
                            const cpState = { ...state };
                            cpState.password.value = e.target.value;
                            cpState.password.error = false;
                            cpState.password.errorMessage = null;
                            setState(cpState);
                            setMessage(null);
                          }}
                        />
                      </Col>
                      <Col>
                        <InputField
                          {...state.email}
                          state={state.email}
                          setState={(e) => {
                            setState({ ...state, email: e });
                          }}
                          onChange={(e) => {
                            const cpState = { ...state };
                            cpState.email.value = e.target.value;
                            cpState.email.error = false;
                            cpState.email.errorMessage = null;
                            setState(cpState);
                            setMessage(null);
                          }}
                          state={state.email}
                          setState={(email) => setState({ ...state, email })}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="bloc-btn-modal">
                    <ButtonDef
                      spinner={submitting}
                      textButton={"S'inscrire"}
                      className="btn-form-def"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </Fade>
      </ModalPopIn>
    </ModalDefault>
  );
}
