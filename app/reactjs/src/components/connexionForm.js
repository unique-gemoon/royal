import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Backdrop, Button, Fade } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ModalPopIn } from "../assets/styles/globalStyle";
import { ModalDefault } from "../assets/styles/componentStyle";
import InputField from "./ui-elements/inputField";
import ErrorFormMessage from "./errorFormMessage";
import * as actionTypes from "../store/functions/actionTypes";
import ButtonDef from "./ui-elements/buttonDef";
import { clearErrors, validateEmail } from "../helper/form";
import endPoints from "../config/endPoints";
import connector from "../connector";

export default function ConnexionForm({ setMsgNotifTop = () => {} }) {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [linkForgot, setLinkForgot] = useState("");
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState({
    email: {
      label: "Nom d'utilisateur ou adresse e-mail",
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

  const submitLogin = (e) => {
    e.preventDefault();
    if (!submitting) {
      setState(clearErrors(state));
      const cpState = { ...state };
      let email = state.email.value;
      let password = state.password.value;
      let msg = "";

      if (!email && !password) {
        msgErrors({
          email: false,
          password: false,
          msg: "Le nom d'utilisateur ou le mot de passe est incorrect",
          submit: false,
        });
      } else {
        if (!validateEmail(email)) {
          email = false;
          cpState.email = {
            ...cpState.email,
            error: true,
            errorMessage: "Votre email n'est pas correctement renseigné.",
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

        if (email && password) {
          msgErrors({ submit: true });
          connector({
            method: "post",
            url: endPoints.LOGIN,
            data: { email, password },
            success: (response) => {
              msgErrors({ submit: false });
              setMsgNotifTop(
                "Bonjour, vous êtes désormais connecté à votre compte."
              );
              dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                token: response.data.token,
                refreshToken: response.data.refreshToken,
              });
              handleClose();
            },
            catch: (error) => {
              msg = "Vos identifiants sont incorrects";
              if (error.response.data.message !== undefined) {
                msg = error.response.data.message;
              }
              msgErrors({ msg, submit: false });
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
            {linkForgot === "forgotPass" ? (
              <div className="connection-content">
                <div className="header-modal">
                  <KeyboardBackspaceIcon onClick={() => setLinkForgot(null)} />
                  <h2 className="titre-modal">Mot de passe oublié ?</h2>
                </div>
                <form className="form-forgot-pass">
                  <div className="content-form">
                    <InputField
                      {...state.emailForgot}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.emailForgot.value = e.target.value;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />
                  </div>
                  <div className="bloc-btn-modal">
                    <Button
                      onClick={() => {
                        setLinkForgot("messageForgotPass");
                      }}
                    >
                      Envoyer
                    </Button>
                  </div>
                </form>
              </div>
            ) : linkForgot === "messageForgotPass" ? (
              <div className="message-modal-content">
                <CheckCircleOutlineIcon />
                <p className="titre-message-modal">
                  E-mail de mise à jour de mot de passe envoyé
                </p>
                <div className="text-message-modal">
                  <p>Un e-mail vous a été envoyé.</p>
                  <p>
                    Suivez les instructions pour mettre à jour votre mot de
                    passe.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    handleClose();
                    setTimeout(() => {
                      setLinkForgot(null);
                    }, 100);
                  }}
                >
                  Ok
                </Button>
              </div>
            ) : (
              <div className="connection-content">
                <div className="header-modal">
                  <KeyboardBackspaceIcon onClick={() => handleClose()} />
                  <h2 className="titre-modal">Connexion</h2>
                </div>
                <form className="form-connexion" onSubmit={submitLogin}>
                  {message ? (
                    <ErrorFormMessage
                      text={message}
                      onClick={() => setMessage(null)}
                    />
                  ) : null}

                  <div className="content-form">
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
                    />
                    <InputField
                      className="password-input"
                      {...state.password}
                      state={state.password}
                      setState={(e) => {
                        setState({ ...state, password: e });
                      }}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.password.value = e.target.value;
                        cpState.password.errorMessage = null;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />
                    <span
                      className="pass-oublier"
                      onClick={() => {
                        setLinkForgot("forgotPass");
                      }}
                    >
                      Mot de passe oublié ?
                    </span>
                  </div>
                  <div className="bloc-btn-modal">
                    <ButtonDef
                      spinner={submitting}
                      textButton={"Se connecter"}
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
