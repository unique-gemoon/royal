import React, { useState, useEffect } from 'react'
import Masonry from '@mui/lab/Masonry';
import ItemMasonry from '../components/itemMasonry/itemMasonry';
import { StyledEngineProvider } from '@mui/material/styles';
import { ContainerDef, DefaultMain, FooterDefault, HeaderMobile, OptionsBtnAction } from '../assets/styles/globalStyle';
import { Row, Col } from 'react-bootstrap';
import imgPli from '../assets/images/image-pli-1.png';
import videoPli from '../assets/images/video.mp4';
import ButtonAction from '../components/ui-elements/buttonAction';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NewPli from '../components/NewPli';
import SeeCounter from '../components/ui-elements/seeCounter';
import BlocFolowers from '../components/blocFolowers';
import SearchFolowers from '../components/searchFolowers';
import Notifications from '../components/notifications';
import Messagerie from '../components/messagerie';
import ProfileMenu from '../components/profileMenu';
import { useMediaQuery } from "react-responsive";
import logoType from '../assets/images/Logotype.png';

export default function Home() {

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
    const [dataNotifs] = useState([
        {
            id: 1,
            title: "Création du compte",
            timer: "2mn",
            statut: "new"
        },
        {
            id: 2,
            title: "Création du compte1",
            timer: "21mn",
            statut: "new"
        },
        {
            id: 3,
            title: "Création du compte2",
            timer: "45mn",
            statut: "old"
        },
        {
            id: 4,
            title: "Création du compte2",
            timer: "45mn",
            statut: "old"
        },
        {
            id: 5,
            title: "Création du compte2",
            timer: "45mn",
            statut: "old"
        },
        {
            id: 6,
            title: "Création du compte2",
            timer: "45mn",
            statut: "old"
        },
        {
            id: 7,
            title: "Création du compte2",
            timer: "45mn",
            statut: "old"
        },
    ]);
    const [newNotifs, setNewNotif] = useState(dataNotifs.filter((newNotif) => newNotif.statut === "new"));
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

    const updateAction = (e,name) => {
        const cpAction =  {
            ...action, notification: { ...action.notification, isOpen: false }, folower: { ...action.folower, isOpen: false }, search: { ...action.search, isOpen: false }
            , messagerie: { ...action.messagerie, isOpen: false } };
        cpAction[name].isOpen = e.isOpen;
        setAction(cpAction);
    }
    
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
                            <ProfileMenu />
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
                    {isDesktopOrLaptop && (
                        <ContainerDef>
                            <Row className='align-items-center'>
                                <Col md={3}>
                                    <div className="d-md-flex">
                                        <ProfileMenu />
                                        <SeeCounter countSee={14} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <NewPli action={action} setAction={setAction} />
                                </Col>
                                <Col md={3}>
                                    <OptionsBtnAction>
                                        <ButtonAction 
                                        className='messages-bloc-action' 
                                        setCount={2} 
                                        action={action.messagerie} 
                                        icon={action.messagerie.icon}
                                        setAction={(e) => {
                                            setAction({ ...action, messagerie: { ...action.messagerie, isOpen: e.isOpen }})
                                        }}
                                        >
                                            <Messagerie />
                                        </ButtonAction>
                                        <ButtonAction
                                        className='search-bloc-action' 
                                        action={action.search} 
                                        icon={action.search.icon} 
                                        setAction={(e) => {
                                            setAction({ ...action, search: { ...action.search, isOpen: e.isOpen } })
                                        }}
                                        >
                                            <SearchFolowers />
                                        </ButtonAction>
                                        <ButtonAction 
                                        className='abonnee-bloc-action' 
                                        action={action.folower} 
                                        setCount={2} 
                                        icon={action.folower.icon} 
                                        setAction={(e) => {
                                            setAction({ ...action, folower: { ...action.folower, isOpen: e.isOpen } })
                                        }}
                                        >
                                            <BlocFolowers />
                                        </ButtonAction>
                                        <ButtonAction 
                                        className='notification-bloc-action' 
                                        action={action.notification} 
                                        setCount={newNotifs.length} 
                                        icon={action.notification.icon} 
                                        setAction={(e) => {
                                            setAction({ ...action, notification: { ...action.notification, isOpen: e.isOpen } })
                                        }}
                                        >
                                            <Notifications items={newNotifs.length ? newNotifs : dataNotifs} setNotif={setNewNotif} />
                                        </ButtonAction>
                                    </OptionsBtnAction>
                                </Col>
                            </Row>
                        </ContainerDef>
                    )}
                    {isTabletOrMobile && (
                        <OptionsBtnAction>
                            <ButtonAction
                                className='messages-bloc-action'
                                setCount={2}
                                action={action.messagerie}
                                icon={action.messagerie.icon}
                                setAction={(e) => { updateAction(e, 'messagerie'); }}
                            >
                                <Messagerie />
                            </ButtonAction>
                            <ButtonAction
                                className='search-bloc-action'
                                action={action.search}
                                icon={action.search.icon}
                                setAction={(e) => { updateAction(e, 'search'); }}
                            >
                                <SearchFolowers />
                            </ButtonAction>
                            <NewPli action={action} setAction={setAction} />
                            <ButtonAction
                                className='abonnee-bloc-action'
                                action={action.folower}
                                setCount={2}
                                icon={action.folower.icon}
                                setAction={(e) => { updateAction(e, 'folower'); }}
                            >
                                <BlocFolowers />
                            </ButtonAction>
                            <ButtonAction
                                className='notification-bloc-action'
                                action={action.notification}
                                setCount={newNotifs.length}
                                icon={action.notification.icon}
                                setAction={(e) => { updateAction(e, 'notification'); }}
                            >
                                <Notifications items={newNotifs.length ? newNotifs : dataNotifs} setNotif={setNewNotif} />
                            </ButtonAction>
                        </OptionsBtnAction>
                    )}
                    
                </FooterDefault>
            </StyledEngineProvider>
        </DefaultMain>
    )
}
