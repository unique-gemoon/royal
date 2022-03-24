import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Backdrop, Button, Fade } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { ModalDefault } from "../assets/styles/componentStyle";
import { ModalPopIn } from "../assets/styles/globalStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import { getMsgError } from "../helper/fonctions";
import { clearValues, clearErrors, validateEmail } from "../helper/form";
import * as actionTypes from "../store/functions/actionTypes";
import ErrorFormMessage from "./errorFormMessage";
import ButtonDef from "./ui-elements/buttonDef";
import InputField from "./ui-elements/inputField";

export default function ConnexionForm({ setMsgNotifTopTime = () => {} }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showModal, setShowModal] = useState(null);
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
    passwordConfirmation: {
      label: "Confirmation mot de passe",
      name: "passwordConfirmation",
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
  const query = new URLSearchParams(useLocation().search);
  const tokenRestPassword = query.get("tokenRestPassword") || null;

  useEffect(() => {
    if (tokenRestPassword) {
      setShowModal("restPassword");
      handleOpen();
    }
  }, [tokenRestPassword]);

  const submitLogin = (e) => {
    e.preventDefault();
    if (!submitting) {
      setState(clearErrors(state));
      const cpState = { ...state };
      let email = state.email.value;
      let password = state.password.value;

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
              setMsgNotifTopTime(
                "Bonjour, vous êtes désormais connecté à votre compte.",
                5000
              );
              dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                token: response.data.token,
                refreshToken: response.data.refreshToken,
              });
              handleClose();
              setState(clearValues(state));
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

  const submitForgotPassword = (e) => {
    e.preventDefault();
    if (!submitting) {
      setState(clearErrors(state));
      const cpState = { ...state };
      let emailForgot = state.emailForgot.value;

      if (!emailForgot || !validateEmail(emailForgot)) {
        emailForgot = false;
        cpState.emailForgot = {
          ...cpState.emailForgot,
          error: true,
          errorMessage: "Votre email n'est pas correctement renseigné.",
        };
      }

      if (emailForgot) {
        msgErrors({ submit: true });
        connector({
          method: "post",
          url: endPoints.FORGOT_PASSWORD,
          data: { email: emailForgot },
          success: (response) => {
            msgErrors({ submit: false });
            setShowModal("messageForgotPassword");
            setState(clearValues(state));
          },
          catch: (error) => {
            msgErrors({ msg: getMsgError(error), submit: false });
          },
        });
      } else {
        setState({ ...cpState });
      }
    }
  };

  const submitRestPassword = (e) => {
    e.preventDefault();
    if (!submitting) {
      setState(clearErrors(state));
      const cpState = { ...state };
      let password = state.password.value;
      let passwordConfirmation = state.passwordConfirmation.value;

      if (!password && !passwordConfirmation) {
        msgErrors({
          email: false,
          password: false,
          msg: "Pour réinitialiser votre mot de passe, veuillez renseigner un mot de passe.",
          submit: false,
        });
      } else {
        if (String(password).length < 6) {
          password = false;
          cpState.password = {
            ...cpState.password,
            error: true,
            errorMessage:
              "Votre mot de passe doit contenir au moins 6 caractères.",
          };
        }
        if (password != passwordConfirmation) {
          passwordConfirmation = false;
          cpState.passwordConfirmation = {
            ...cpState.passwordConfirmation,
            error: true,
            errorMessage: "Les deux mots de passe ne sont pas identiques.",
          };
        }

        if (password && passwordConfirmation) {
          msgErrors({ submit: true });
          connector({
            method: "post",
            url: endPoints.REST_PASSWORD,
            data: { password, token: tokenRestPassword },
            success: (response) => {
              msgErrors({ submit: false });
              setShowModal("messageRestPassword");
              history.push("/");
              setState(clearValues(state));
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
    if (e.emailForgot !== undefined) cpState.emailForgot.error = e.emailForgot;
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
            {showModal === "forgotPassword" && (
              <div className="connection-content">
                <div className="header-modal">
                  <KeyboardBackspaceIcon
                    onClick={() => {
                      setShowModal(null);
                      setMessage(null);
                    }}
                  />
                  <h2 className="titre-modal">Mot de passe oublié ?</h2>
                </div>
                <form
                  className="form-forgot-pass"
                  onSubmit={submitForgotPassword}
                >
                  {message ? (
                    <ErrorFormMessage
                      text={message}
                      onClick={() => setMessage(null)}
                    />
                  ) : null}
                  <div className="content-form">
                    <InputField
                      {...state.emailForgot}
                      state={state.emailForgot}
                      setState={(e) => {
                        setState({ ...state, emailForgot: e });
                      }}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.emailForgot.value = e.target.value;
                        cpState.emailForgot.error = false;
                        cpState.emailForgot.errorMessage = null;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />
                  </div>
                  <div className="bloc-btn-modal">
                    <ButtonDef
                      spinner={submitting}
                      textButton={"Envoyer"}
                      className="btn-form-def"
                    />
                  </div>
                </form>
              </div>
            )}

            {showModal === "messageForgotPassword" && (
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
                <ButtonDef
                  onClick={() => {
                    handleClose();
                    setMessage(null);
                    setTimeout(() => {
                      setShowModal(null);
                    }, 100);
                  }}
                  textButton={"Ok"}
                />
              </div>
            )}

            {showModal === "restPassword" && (
              <div className="connection-content">
                <div className="header-modal">
                  <KeyboardBackspaceIcon
                    onClick={() => {
                      handleClose();
                      setMessage(null);
                      setTimeout(() => {
                        setShowModal(null);
                      }, 100);
                    }}
                  />
                  <h2 className="titre-modal">
                    Réinitialisation du mot de passe
                  </h2>
                </div>
                <form className="form-connexion" onSubmit={submitRestPassword}>
                  {message ? (
                    <ErrorFormMessage
                      text={message}
                      onClick={() => setMessage(null)}
                    />
                  ) : null}

                  <div className="content-form">
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
                    <InputField
                      className="password-input"
                      {...state.passwordConfirmation}
                      state={state.passwordConfirmation}
                      setState={(e) => {
                        setState({ ...state, passwordConfirmation: e });
                      }}
                      onChange={(e) => {
                        const cpState = { ...state };
                        cpState.passwordConfirmation.value = e.target.value;
                        cpState.passwordConfirmation.errorMessage = null;
                        setState(cpState);
                        setMessage(null);
                      }}
                    />
                  </div>
                  <div className="bloc-btn-modal">
                    <ButtonDef
                      spinner={submitting}
                      textButton={"Soumettre"}
                      className="btn-form-def"
                    />
                  </div>
                </form>
              </div>
            )}

            {showModal === "messageRestPassword" && (
              <div className="message-modal-content">
                <CheckCircleOutlineIcon />
                <p className="titre-message-modal">
                  Réinitialisation du mot de passe
                </p>
                <div className="text-message-modal">
                  <p>Votre mot de passe a été réinitialisé.</p>
                </div>
                <ButtonDef
                  onClick={() => {
                    handleClose();
                    setTimeout(() => {
                      setShowModal(null);
                    }, 100);
                  }}
                  textButton={"Ok"}
                />
              </div>
            )}

            {!showModal && (
              <div className="connection-content">
                <div className="header-modal">
                  <KeyboardBackspaceIcon
                    onClick={() => {
                      handleClose();
                      setMessage(null);
                    }}
                  />
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
                        setShowModal("forgotPassword");
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
