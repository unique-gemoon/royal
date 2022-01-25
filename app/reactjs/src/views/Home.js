import React, { useState } from 'react'
import Masonry from '@mui/lab/Masonry';
import ItemMasonry from '../components/itemMasonry';
import { StyledEngineProvider } from '@mui/material/styles';
import { ContainerDef, DefaultMain, FooterDefault, OptionsBtnAction } from '../assets/styles/globalStyle';
import {Modal, Row, Col} from 'react-bootstrap';
import imgM1 from "../assets/images/masonry-model1.png";
import imgM2 from '../assets/images/masonry-model2.png';
import imgM3 from '../assets/images/masonry-model3.png';
import imgM4 from '../assets/images/masonry-model4.png';
import imgM5 from '../assets/images/masonry-model5.png';
import ButtonAction from '../components/ui-elements/buttonAction';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NewPli from '../components/NewPli';
import SeeCounter from '../components/ui-elements/seeCounter';
import { dividerClasses } from '@mui/material';
import BlocFolowers from '../components/blocFolowers';
import SearchFolowers from '../components/searchFolowers';
import Notifications from '../components/notifications';
import Messagerie from '../components/messagerie';

export default function Home() {
    const [dataMasonry, setDataMasonry] = useState([
        {
            id: 1,
            image: imgM1,
            namePost: "Jacob",
            isOpen: false
            
        },
        {
            id: 2,
            image: imgM1,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 3,
            image: imgM5,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 4,
            image: imgM2,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 5,
            image: imgM3,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 6,
            image: imgM1,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 7,
            image: imgM5,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 8,
            image: imgM2,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 9,
            image: imgM4,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 10,
            image: imgM3,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 11,
            image: imgM5,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 12,
            image: imgM2,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 13,
            image: imgM2,
            namePost: "Jacob",
            isOpen: false
        },
        {
            id: 14,
            image: imgM4,
            namePost: "Jacob",
            isOpen: false
        },
    ]);
    const [dataNotifs, setDataNotifs] = useState([
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
        for(var i=0; i < cpDataMasonry.length;i++){
            if(cpDataMasonry[i].id==item.id){
                cpDataMasonry[i] = item;
                // console.log(cpDataMasonry[i])   
            }
        }
        setDataMasonry(cpDataMasonry);
    }

    return (
        <DefaultMain>
            <StyledEngineProvider injectFirst>
                <ContainerDef>
                    <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={0}>
                        {dataMasonry.map((item) => (
                            <div key={item.id}>
                                <ItemMasonry item={item} setItem={setItem}/>
                                <Modal show={item.isOpen} onHide={()=>{setItem({...item,isOpen:false})}}>
                                    
                                    <Modal.Body>
                                        <ItemMasonry item={item} setItem={setItem}/>
                                    </Modal.Body>
                                </Modal>
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
                                        <Notifications items={newNotifs.length ? newNotifs : dataNotifs } setNotif={setNewNotif} />
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
