import React, { useState } from "react";
import Masonry from "@mui/lab/Masonry";
import ItemMasonry from "../components/itemMasonry/itemMasonry";
import FooterOptionsBtn from "../components/footerOptionsBtn";
import { StyledEngineProvider } from "@mui/material/styles";
import {
  ContainerDef,
  DefaultMain,
  FooterDefault,
  HeaderMobile,
} from "../assets/styles/globalStyle";
import { Row, Col } from "react-bootstrap";
import imgPli from "../assets/images/image-pli-1.png";
import videoPli from "../assets/images/video.mp4";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NewPli from "../components/newPli";
import SeeCounter from "../components/ui-elements/seeCounter";
import ProfileMenu from "../components/profileMenu";
import { useMediaQuery } from "react-responsive";
import logoType from "../assets/images/Logotype.png";
import MessageNotif from "../components/messageNotif";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1200px)" });

  const [showMessage, setShowMessage] = useState(true);

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
        },
      },
      nv2: {
        description:
          "Voici mon nouveau son du moment, qu’est ce que vous en pensez ?",
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
      comments: [
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
          ],
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
      ],
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
        },
      },
    },
    {
      id: 3,
      namePost: "Jacob",
      abonnes: 109,
      abonnements: 109,
      statutAbonne: true,
      etatOuvert: false,
      nv1: {
        description: "On the 10th anniversary of the passage of the #CVAA10",
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
          },
        ],
      },
    },
    {
      id: 4,
      namePost: "Jacob",
      abonnes: 109,
      abonnements: 109,
      statutAbonne: false,
      etatOuvert: false,
      nv1: {
        description: (
          <>
            On the 10th anniversary of the passage of the #CVAA10, we celebrate
            the brilliant minds and technologies that continue to build a more
            equitable world.
            <br />
            On the 10th anniversary of the passage of the #CVAA10, we celebrate
            the brilliant minds and technologies that continue to build a more
            equitable world and technologies that continue to build a more
            equitable world.{" "}
          </>
        ),
      },
      nv2: {
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
          },
        ],
      },
    },
    {
      id: 5,
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
          {
            id: 4,
            source: imgPli,
          },
        ],
      },
    },
    {
      id: 6,
      namePost: "Jacob",
      abonnes: 109,
      abonnements: 109,
      statutAbonne: false,
      etatOuvert: false,
      nv1: {
        description: "On the 10th anniversary of the passage of the #CVAA10",
        video: videoPli,
      },
    },
    {
      id: 7,
      namePost: "Jacob",
      abonnes: 109,
      abonnements: 109,
      statutAbonne: true,
      etatOuvert: false,
      nv1: {
        description: "On the 10th anniversary of the passage of the #CVAA10",
        soundage: [
          {
            id: 1,
            label: "Emmanuel Macron",
            countQte: "38%",
            choix: false,
            value: "Emmanuel-Macron1",
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
          },
        ],
      },
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
      },
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
      },
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
      },
    },
    {
      id: 11,
      namePost: "Jacob",
      abonnes: 109,
      abonnements: 109,
      statutAbonne: false,
      etatOuvert: false,
      nv1: {
        description: (
          <>
            On the 10th anniversary of the passage of the #CVAA10, we celebrate
            the brilliant minds and technologies that continue to build a more
            equitable world.
            <br />
            On the 10th anniversary of the passage of the #CVAA10, we celebrate
            the brilliant minds and technologies that continue to build a more
            equitable world and technologies that continue to build a more
            equitable world.{" "}
          </>
        ),
      },
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
      },
    },
  ]);

  const [dataNotifs] = useState([
    {
      id: 1,
      title: "Création du compte",
      timer: "2mn",
      statut: "new",
    },
    {
      id: 2,
      title: "Création du compte1",
      timer: "21mn",
      statut: "new",
    },
    {
      id: 3,
      title: "Création du compte2",
      timer: "45mn",
      statut: "old",
    },
    {
      id: 4,
      title: "Création du compte2",
      timer: "45mn",
      statut: "old",
    },
    {
      id: 5,
      title: "Création du compte2",
      timer: "45mn",
      statut: "old",
    },
    {
      id: 6,
      title: "Création du compte2",
      timer: "45mn",
      statut: "old",
    },
    {
      id: 7,
      title: "Création du compte2",
      timer: "45mn",
      statut: "old",
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
  };

  const [action, setAction] = useState({
    notification: {
      icon: <NotificationsNoneOutlinedIcon />,
      isOpen: false,
    },
    folower: {
      icon: <PeopleOutlineRoundedIcon />,
      isOpen: false,
    },
    search: {
      icon: <SearchRoundedIcon />,
      isOpen: false,
    },
    messagerie: {
      icon: <MailOutlineRoundedIcon />,
      isOpen: false,
    },
  });

  return (
    <DefaultMain>
      <StyledEngineProvider injectFirst>
        {isTabletOrMobile && (
          <HeaderMobile>
            <div className="logo">
              <img src={logoType} alt="Royalis" />
            </div>
            <div className="d-flex">
              <SeeCounter countSee={14} />
              <ProfileMenu />
            </div>
          </HeaderMobile>
        )}
        <ContainerDef>
          <MessageNotif
            showMessage={showMessage}
            setShowMessage={setShowMessage}
            textNotif={
              <>
                Votre pli a bien été publié sur la page universelle ! <br /> Il
                reste 1 minute avant qu’il ne disparaisse si aucun délai
                supplémentaire ne lui est ajouté par les utilisateurs.
              </>
            }
          />
          <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={3}>
            {dataMasonry.map((item) => (
              <div key={item.id}>
                <ItemMasonry
                  item={item}
                  setItem={setItem}
                  open={false}
                  action={action}
                  setAction={setAction}
                />
              </div>
            ))}
          </Masonry>
        </ContainerDef>

        <FooterDefault>
          {isDesktopOrLaptop && (
            <ContainerDef>
              <Row className="align-items-center">
                <Col md={3}>
                  <div className="d-md-flex">
                    <ProfileMenu />
                    <SeeCounter countSee={14} />
                  </div>
                </Col>
                <Col md={6}>
                  <NewPli action={action} setAction={setAction} setShowMessage={setShowMessage}/>
                </Col>
                <Col md={3}>
                  <FooterOptionsBtn
                    action={action}
                    setAction={setAction}
                    dataNotifs={dataNotifs}
                    setShowMessage={setShowMessage}
                  />
                </Col>
              </Row>
            </ContainerDef>
          )}
          {isTabletOrMobile && (
            <FooterOptionsBtn
              action={action}
              setAction={setAction}
              dataNotifs={dataNotifs}
              setShowMessage={setShowMessage}
            />
          )}
        </FooterDefault>
      </StyledEngineProvider>
    </DefaultMain>
  );
}
