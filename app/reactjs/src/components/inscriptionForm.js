import React, { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ModalDefault } from '../assets/styles/componentStyle';
import { Backdrop, Button, Fade } from '@mui/material';
import { ModalPopIn } from '../assets/styles/globalStyle';
import InputField from './ui-elements/inputField';
import { Col, Row } from 'react-bootstrap';

export default function InscriptionForm() {
    const [state, setState] = useState({
        nom: {
            label: "Nom d’utilisateur",
            name: "nom",
            value: "Lys",
            type: "text",
            error: true,
            errorMessage: "Nom d’utilisateur déjà existant. Veuillez en choisir un autre.",
            required: true,
        },
        email: {
            label: "Adresse e-mail",
            name: "email",
            value: "",
            type: "text",
            error: true,
            errorMessage: "Un compte avec cette adresse email existe déjà. Veuillez vous connecter ou choisir une autre adresse courriel.",
            required: true,
        },
        password: {
            label: "Mot de passe",
            name: "password",
            value: "",
            type: "password",
            error: false,
            required: true,
        },
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [message, setMessage] = useState(true);
    const [linkForgot, setLinkForgot] = useState("");
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
                        { linkForgot === "messageForgotPass" ?
                                <div className="message-modal-content">
                                    <CheckCircleOutlineIcon />
                                    <p className='titre-message-modal'>E-mail de mise à jour de mot de passe envoyé</p>
                                    <div className='text-message-modal'>
                                        <p>Un e-mail vous a été envoyé.</p>
                                        <p>Suivez les instructions pour mettre à jour votre mot de passe.</p>
                                    </div>
                                    <Button onClick={(e) => { handleClose(); setTimeout(() => { setLinkForgot(null); }, 100); }}>Ok</Button>
                                </div>
                                :
                                <div className="connection-content">
                                    <div className='header-modal'>
                                        <KeyboardBackspaceIcon onClick={() => handleClose()} />
                                    <h2 className='titre-modal'>Inscription</h2>
                                    </div>
                                    <form className='form-connexion'>
                                        

                                        <div className='content-form'>
                                            <Row>
                                                <Col sm={6}>
                                                    <InputField
                                                        {...state.nom}
                                                        onChange={(e) => {
                                                            const cpState = { ...state };
                                                            cpState.nom.value = e.target.value;
                                                            setState(cpState);
                                                        }}
                                                        setMessageField={setMessage}
                                                    />
                                                </Col>
                                                <Col sm={6}>
                                                    <InputField
                                                        {...state.password}
                                                        onChange={(e) => {
                                                            const cpState = { ...state };
                                                            cpState.password.value = e.target.value;
                                                            setState(cpState);
                                                        }}
                                                    />
                                                </Col>
                                                <Col>
                                                    <InputField
                                                        {...state.email}
                                                        onChange={(e) => {
                                                            const cpState = { ...state };
                                                            cpState.email.value = e.target.value;
                                                            setState(cpState);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='bloc-btn-modal'>
                                        <Button onClick={(e) => { setLinkForgot("messageForgotPass"); }}>S'inscrire</Button>
                                        </div>
                                    </form>
                                </div>
                        }

                    </div>
                </Fade>
            </ModalPopIn>
        </ModalDefault>
    )
}
