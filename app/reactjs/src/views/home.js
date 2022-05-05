import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Masonry from "@mui/lab/Masonry";
import { StyledEngineProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation } from 'react-router-dom';
import imgPli from "../assets/images/image-pli-1.png";
import logoType from "../assets/images/Logotype.png";
import videoPli from "../assets/images/video.mp4";
import {
  ContainerDef,
  DefaultMain,
  HeaderMobile
} from "../assets/styles/globalStyle";
import FooterAuthHome from "../components/footerAuthHome";
import FooterHome from "../components/footerHome";
import ItemMasonry from "../components/itemMasonry/itemMasonry";
import MessageNotif from "../components/messageNotif";
import ProfileMenu from "../components/profileMenu";
import SeeCounter from "../components/ui-elements/seeCounter";
import { ROLES } from "../config/vars";
import * as actionTypes from "../store/functions/actionTypes";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });


  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     content: "Voici mon nouveau son du moment, qu'est ce que vous en pensez ?",
  //     duration: 120,
  //     user: { id: 1, username: "Jacob" },
  //     ouverture: "my ouverture",
  //     media: [
  //       {
  //         id: 1,
  //         type: "music",
  //         name: "Plants",
  //         genre: "Crumb",
  //         path: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
  //         isOuverture: false,
  //         createdAt: "2022-04-11 12:30:00",
  //         sondageOptions: [{ id: 1, option: "Emmanuel Macron" }]
  //       }
  //     ],
  //     createdAt: "2022-04-11 12:30:00"
  //   }
  // ]);


  const [dataMasonry, setDataMasonry] = useState([
    {
      id: 1,
      namePost: "Jacob",
      abonnes: 109,
      abonnements: 109,
      statutAbonne: false,
      etatOuvert: false,
      nv1: { 
        media:{
          music: {
            id: 12,
            name: "Plants",
            genre: "Crumb",
            lien: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
          }
        },
      },
      nv2: {
        description:
          "Voici mon nouveau son du moment, qu'est ce que vous en pensez ?",

        media: {
          music: {
            id: 22,
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
          video: {
            id: 1,
            src: videoPli
          }
        },
      },
      comments: [
        {
          id: 1,
          user: "Dan",
          subject: "J'aime bien cette citation !",
          time: "3mn",
          citation: {
            citationUser: "Jacquou",
            citationText: "Voici une citation"
          },
          reponses: [
            {
              id: 1,
              user: "Lys",
              subject: "J'aime bien cette citation !",
              time: "2mn",
              userRep: "Dan"
            },
            {
              id: 2,
              user: "Dan",
              subject: "J'aime bien cette citation !",
              time: "2mn",
              userRep: "Lys"
            },
            {
              id: 3,
              user: "Jacquou",
              subject: "J'aime bien cette citation !",
              time: "2mn",
              userRep: "Dan"
            },
            {
              id: 4,
              user: "Dan",
              subject: "J'aime bien cette citation !",
              time: "2mn",
              userRep: "Jacquou"
            },
          ],
        },
        {
          id: 2,
          user: "Dan",
          subject: "J'aime bien cette citation !",
          time: "3mn",
          cotte: true,
          reponses: [
            {
              id: 1,
              user: "Lys",
              subject: "J'aime bien cette citation !",
              time: "2mn",
              userRep: "Dan"
            },
          ],
        },
        {
          id: 3,
          user: "Dan",
          subject: "J'aime bien cette citation !",
          time: "3mn",
        },
        {
          id: 4,
          user: "Dan",
          subject: "J'aime bien cette citation !",
          time: "3mn",
        }
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
        media: {
          music: {
            id: 32,
            name: "Plants",
            genre: "Crumb",
            lien: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
          },
        }
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
        media: {
          sondage: [
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
        }
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
        media: {
          sondage: [
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
        }
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
        media: {
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
        media: {
          video: {
            id: 2,
            src: videoPli
          },
        }
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
        media: {
          sondage: [
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
        }
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
        media: {
          video: {
            id: 3,
            src: videoPli
          },
        }
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
        media: {
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
        media: {
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
        media: {
          photos: [
            {
              id: 1,
              source: imgPli,
            },
          ],
        }
      },
    },
  ]);

  const [dataNotifs, setDataNotifs] = useState([
    {
      id: 1,
      title: "Création du compte",
      timer: "2mn",
      isRead: false,
    },
    {
      id: 2,
      title: "Création du compte1",
      timer: "21mn",
      isRead: false,
    },
    {
      id: 3,
      title: "Création du compte2",
      timer: "45mn",
      isRead: true,
    },
    {
      id: 4,
      title: "Création du compte2",
      timer: "45mn",
      isRead: true,
    },
    {
      id: 5,
      title: "Création du compte2",
      timer: "45mn",
      isRead: true,
    },
    {
      id: 6,
      title: "Création du compte2",
      timer: "45mn",
      isRead: true,
    },
    {
      id: 7,
      title: "Création du compte2",
      timer: "45mn",
      isRead: true,
    },
  ]);

  const [msgNotifTop, setMsgNotifTop] = useState(null);

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

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

  const setMsgNotifTopTime = (msg, time) => {
    setMsgNotifTop(msg);
    setTimeout(() => {
      setMsgNotifTop(false);
    }, time);
  };

  const query = new URLSearchParams(useLocation().search);
  const tokenRestPassword = query.get("tokenRestPassword") || null;

  const checkIsConnected = () => {
    if (auth.roles.includes(ROLES.ROLE_USER)) {
      return true;
    } else {
      dispatch({
        type: actionTypes.TO_LOGIN,
        toLogin: true,
      });
      return false;
    }
  };

  useEffect(() => {
    if (tokenRestPassword) {
      checkIsConnected();
    }
  }, [tokenRestPassword]);
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemPlayer, setActiveItemPlayer] = useState(null);


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
              {auth.roles.includes(ROLES.ROLE_USER) && (
                <ProfileMenu setMsgNotifTop={setMsgNotifTop} />
              )}
            </div>
          </HeaderMobile>
        )}
        <ContainerDef>
          {msgNotifTop && (
            <MessageNotif
              setMessage={() => {
                setMsgNotifTop(null);
              }}
              message={msgNotifTop}
            />
          )}
          <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={3}>
            {dataMasonry.map((item) => (
              <div key={item.id}>
                <ItemMasonry
                  item={item}
                  setItem={setItem}
                  action={action}
                  setAction={setAction}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  activeItemPlayer={activeItemPlayer}
                  setActiveItemPlayer={setActiveItemPlayer}
                />
              </div>
            ))}
          </Masonry>
        </ContainerDef>

        {!auth.roles.includes(ROLES.ROLE_USER) && auth.toLogin ? (
          <FooterAuthHome setMsgNotifTopTime={setMsgNotifTopTime} />
        ) : (
          <FooterHome
            action={action}
            setAction={setAction}
            dataNotifs={dataNotifs}
            setDataNotifs={setDataNotifs}
            setMsgNotifTop={setMsgNotifTop}
            setMsgNotifTopTime={setMsgNotifTopTime}
          />
        )}
      </StyledEngineProvider>
    </DefaultMain>
  );
}
