import React, { useState } from 'react'
import Masonry from '@mui/lab/Masonry';
import ItemMasonry from '../../components/itemMasonry/itemMasonry';
import { StyledEngineProvider } from '@mui/material/styles';
import { ContainerDef, DefaultMain, FooterDefault, HeaderMobile, ModalPopIn, OptionsBtnAction } from '../../assets/styles/globalStyle';
import { Row, Col } from 'react-bootstrap';
import imgPli from '../../assets/images/image-pli-1.png';
import videoPli from '../../assets/images/video.mp4';
import ButtonAction from '../../components/ui-elements/buttonAction';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NewPli from '../../components/newPli';
import SeeCounter from '../../components/ui-elements/seeCounter';
import BlocFolowers from '../../components/blocFolowers';
import SearchFolowers from '../../components/searchFolowers';
import Notifications from '../../components/notifications';
import Messagerie from '../../components/messagerie';
import ProfileMenu from '../../components/profileMenu';
import { useMediaQuery } from "react-responsive";
import logoType from '../../assets/images/Logotype.png';
import PopinModal from '../../components/popinModal';
import { ModalDefault } from '../../assets/styles/componentStyle';
import { Backdrop, Button, Fade, Link, Modal } from '@mui/material';
import InputField from '../../components/ui-elements/inputField';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import InscriptionForm from '../../components/inscriptionForm';
import ErrorFormMessage from '../../components/errorFormMessage';

export default function Login() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });
    const isDesktopOrLaptop = useMediaQuery({  query: "(min-width: 1200px)"});
    const [dataMasonry, setDataMasonry] = useState([
        {
            id: 1,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1: {
                music: {
                    id: 1,
                    name: "Plants",
                    genre: "Crumb",
                    lien: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
                }
            },
            nv2:{
                description: "Voici mon nouveau son du moment, qu’est ce que vous en pensez ?",
                music: {
                    id: 1,
                    name: "Plants",
                    genre: "Crumb",
                    lien: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
                },
                photos: [
                    {
                        id: 1,
                        source: imgPli,
                    },
                ],
                video: videoPli,
            },
            comments:[
                {
                    id: 1,
                    user: "Dan",
                    subject: "J’aime bien cette citation !",
                    time: "il y a 3mn",
                    reponses: [
                        {
                            id: 1,
                            user: "Dan",
                            subject: "J’aime bien cette citation !",
                            time: "il y a 2mn",
                        },
                        {
                            id: 2,
                            user: "Jacquou",
                            subject: "J’aime bien cette citation !",
                            time: "il y a 2mn",
                        },
                        {
                            id: 3,
                            user: "Dan",
                            subject: "J’aime bien cette citation !",
                            time: "il y a 2mn",
                        },
                    ]
                },
                {
                    id: 2,
                    user: "Dan",
                    subject: "J’aime bien cette citation !",
                    time: "il y a 3mn",
                    reponses: [
                        {
                            id: 1,
                            user: "Dan",
                            subject: "J’aime bien cette citation !",
                            time: "il y a 2mn",
                        },
                    ],
                },
            ]
        },
        {
            id: 2,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1: {
                music: {
                    id: 1,
                    name: "Plants",
                    genre: "Crumb",
                    lien: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
                }
            }
        },
        {
            id: 3,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: true,
            etatOuvert: false,
            nv1: {
                description: 'On the 10th anniversary of the passage of the #CVAA10',
                soundage: [
                    {
                        id: 1,
                        label: "Emmanuel Macron",
                        countQte: "38%",
                        choix: false,
                        value: "Emmanuel-Macron0",
                    },
                    {
                        id: 2,
                        label: "Eric Zemmour",
                        countQte: "35%",
                        choix: false,
                        value: "Eric-Zemmour0",
                    },
                    {
                        id: 3,
                        label: "Marine Le Pen",
                        countQte: "27%",
                        choix: false,
                        value: "Marine-Pen0",
                    }
                ],
            }
        },
        {
            id: 4,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1:{
                description: <>On the 10th anniversary of the passage of the #CVAA10, we celebrate the brilliant minds and technologies that continue to build a more equitable world.<br />
                    On the 10th anniversary of the passage of the #CVAA10, we celebrate the brilliant minds and technologies that continue to build a more equitable world and technologies that continue to build a more equitable world. </>,
            },
            nv2:{
                soundage: [
                    {
                        id: 1,
                        label: "Emmanuel Macron",
                        countQte: "38%",
                        choix: false,
                        value: "Emmanuel-Macron3",
                    },
                    {
                        id: 2,
                        label: "Eric Zemmour",
                        countQte: "35%",
                        choix: false,
                        value: "Eric-Zemmour3",
                    },
                    {
                        id: 3,
                        label: "Marine Le Pen",
                        countQte: "27%",
                        choix: false,
                        value: "Marine-Pen3",
                    }
                ],
            }
        },
        {
            id: 5,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1:{
                description: "On the 10th anniversary of the passage of the #CVAA10",
                photos: [
                    {
                        id: 1,
                        source: imgPli,
                    },
                    {
                        id: 2,
                        source: imgPli,
                    },
                    {
                        id: 3,
                        source: imgPli,
                    },
                    {
                        id: 4,
                        source: imgPli,
                    },
                ],
            }
        },
        {
            id: 6,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1:{
                description: "On the 10th anniversary of the passage of the #CVAA10",
                video: videoPli,
            }
        },
        {
            id: 7,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: true,
            etatOuvert: false,
            nv1: {
                description: 'On the 10th anniversary of the passage of the #CVAA10',
                soundage: [
                    {
                        id: 1,
                        label: "Emmanuel Macron",
                        countQte: "38%",
                        choix: false,
                        value: 'Emmanuel-Macron1',
                    },
                    {
                        id: 2,
                        label: "Eric Zemmour",
                        countQte: "35%",
                        choix: false,
                        value: "Eric-Zemmour1",
                    },
                    {
                        id: 3,
                        label: "Marine Le Pen",
                        countQte: "27%",
                        choix: false,
                        value: "Marine-Pen1",
                    }
                ],
            }
        },
        {
            id: 8,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1: {
                description: "On the 10th anniversary of the passage of the #CVAA10",
                video: videoPli,
            }
        },
        {
            id: 9,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1: {
                description: "On the 10th anniversary of the passage of the #CVAA10",
                photos: [
                    {
                        id: 1,
                        source: imgPli,
                    },
                    {
                        id: 2,
                        source: imgPli,
                    },
                ],
            }
        },
        {
            id: 10,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1: {
                description: "On the 10th anniversary of the passage of the #CVAA10",
                photos: [
                    {
                        id: 1,
                        source: imgPli,
                    },
                    {
                        id: 2,
                        source: imgPli,
                    },
                    {
                        id: 3,
                        source: imgPli,
                    },
                ],
            }
        },
        {
            id: 11,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1: {
                description: <>On the 10th anniversary of the passage of the #CVAA10, we celebrate the brilliant minds and technologies that continue to build a more equitable world.<br />
                    On the 10th anniversary of the passage of the #CVAA10, we celebrate the brilliant minds and technologies that continue to build a more equitable world and technologies that continue to build a more equitable world. </>,
            }
        },
        {
            id: 12,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
            etatOuvert: false,
            nv1: {
                description: "On the 10th anniversary of the passage of the #CVAA10",
                photos: [
                    {
                        id: 1,
                        source: imgPli,
                    },
                ],
            }
        },
    ]);

    const setItem = (item) => {
        const cpDataMasonry = [...dataMasonry];
        for (var i = 0; i < cpDataMasonry.length; i++) {
            if (cpDataMasonry[i].id == item.id) {
                cpDataMasonry[i] = item; 
            }
        }
        setDataMasonry(cpDataMasonry);
    }
    const [action, setAction] = useState({
        notification: {
            icon: <NotificationsNoneOutlinedIcon />,
            isOpen: false
        },
        folower: {
            icon: <PeopleOutlineRoundedIcon />,
            isOpen: false
        },
        search: {
            icon: <SearchRoundedIcon />,
            isOpen: false
        },
        messagerie: {
            icon: <MailOutlineRoundedIcon />,
            isOpen: false
        }
    })

    const [state, setState] = useState({
        email: {
            label: "Nom d’utilisateur ou adresse e-mail",
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [message, setMessage] = useState(true);
    const [linkForgot, setLinkForgot] = useState("");
    return (
        <DefaultMain>
            <StyledEngineProvider injectFirst>
                {isTabletOrMobile && (
                    <HeaderMobile>
                        <div className='logo'>
                            <img src={logoType} alt="Royalis" />
                        </div>
                        <div className="d-flex">
                            <SeeCounter countSee={14} />
                        </div>
                    </HeaderMobile>
                )}
                <ContainerDef>
                    <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={3}>
                        {dataMasonry.map((item) => (
                            <div key={item.id}>
                                <ItemMasonry item={item} setItem={setItem} open={false} action={action} setAction={setAction} />
                            </div>
                        ))}
                    </Masonry>
                </ContainerDef>

                <FooterDefault>
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
                                                        <form className='form-connexion'>
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
                                                                <Button>Se connecter</Button>
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
                    
                </FooterDefault>
            </StyledEngineProvider>
        </DefaultMain>
    )
}
