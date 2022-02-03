import React, { useState } from 'react'
import Masonry from '@mui/lab/Masonry';
import ItemMasonry from '../components/itemMasonry/itemMasonry';
import { StyledEngineProvider } from '@mui/material/styles';
import { ContainerDef, DefaultMain, FooterDefault, OptionsBtnAction } from '../assets/styles/globalStyle';
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

export default function Home() {
    const [dataMasonry, setDataMasonry] = useState([
        {
            id: 1,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
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

            }
        },
        {
            id: 2,
            namePost: "Jacob",
            abonnes: 109,
            abonnements: 109,
            statutAbonne: false,
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
    
    
    return (
        <DefaultMain>
            <StyledEngineProvider injectFirst>
                <ContainerDef>
                    <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={3}>
                        {dataMasonry.map((item) => (
                            <div key={item.id}>
                                <ItemMasonry item={item} setItem={setItem} open={false} />
                            </div>
                        ))}
                    </Masonry>
                </ContainerDef>

                <FooterDefault>
                    <ContainerDef>
                        <Row className='align-items-center'>
                            <Col md={3}>
                                <SeeCounter countSee={14} />
                            </Col>
                            <Col md={6}>
                                <NewPli />
                            </Col>
                            <Col md={3}>
                                <OptionsBtnAction>
                                    <ButtonAction className='messages-bloc-action' setCount={2} icon={<MailOutlineRoundedIcon />}>
                                        <Messagerie />
                                    </ButtonAction>
                                    <ButtonAction className='search-bloc-action' icon={<SearchRoundedIcon />} >
                                        <SearchFolowers />
                                    </ButtonAction>
                                    <ButtonAction className='abonnee-bloc-action' setCount={2} icon={<PeopleOutlineRoundedIcon />} >
                                        <BlocFolowers />
                                    </ButtonAction>
                                    <ButtonAction className='notification-bloc-action' setCount={newNotifs.length} icon={<NotificationsNoneOutlinedIcon />} >
                                        <Notifications items={newNotifs.length ? newNotifs : dataNotifs} setNotif={setNewNotif} />
                                    </ButtonAction>
                                </OptionsBtnAction>
                            </Col>
                        </Row>
                    </ContainerDef>
                </FooterDefault>
            </StyledEngineProvider>
        </DefaultMain>
    )
}
