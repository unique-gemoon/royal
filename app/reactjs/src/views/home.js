import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Masonry from 'react-masonry-css'
import { StyledEngineProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import logoType from "../assets/images/Logotype.png";
import {
  ContainerDef,
  DefaultMain,
  HeaderMobile,
} from "../assets/styles/globalStyle";
import FooterAuthHome from "../components/footerAuthHome";
import FooterHome from "../components/footerHome";
import ItemMasonry from "../components/itemMasonry/itemMasonry";
import MessageNotif from "../components/messageNotif";
import ProfileMenu from "../components/profileMenu";
import SeeCounter from "../components/ui-elements/seeCounter";
import endPoints from "../config/endPoints";
import { ROLES } from "../config/vars";
import connector from "../connector";
import { getMsgError, getTime } from "../helper/fonctions";
import * as actionTypes from "../store/functions/actionTypes";
import ModalMessage from "../components/modalMessage";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });

  const [plis, setPlis] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemPlayer, setActiveItemPlayer] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showBlocModalMessage, setShowBlocModalMessage] = useState(null);
  const [openModalMessage, setOpenModalMessage] = useState(false);

  useEffect(() => {
    if (plis.length) {
      updateDurations();
    }
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPlis = () => {
    connector({
      method: "get",
      url: `${endPoints.PLIS}`,
      success: (response) => {
        setPlis(response.data.plis);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

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

  useEffect(() => {
    getPlis();
  }, [auth.roles]);

  const setItem = (item) => {
    const cpPlis = [...plis];
    for (var i = 0; i < cpPlis.length; i++) {
      if (cpPlis[i].id == item.id) {
        cpPlis[i] = item;
      }
    }
    setPlis(cpPlis);
  };

  const updateDurations = () => {
    if (plis.length) {
      let hour, minute, second;
      const cpPlis = [];
      for (let i = 0; i < plis.length; i++) {
        const cpPli = { ...plis[i] };
        [hour, minute, second] = String(cpPli.duration).split(":");
        hour = parseInt(hour);
        minute = parseInt(minute);
        second = parseInt(second);
        if (second == 0) {
          if (minute == 0) {
            if (hour > 0) {
              hour--;
              minute = 59;
              second = 59;
            }
          } else {
            minute--;
            second = 59;
          }
        } else {
          second--;
        }
        cpPli.duration = getTime(hour, minute, second);
        if (hour > 0 || minute > 0 || second > 0) {
          cpPlis.push(cpPli);
        }
      }
      setPlis(cpPlis);
    }
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
  const tokenConfirmEmail = query.get("tokenConfirmEmail") || null;

  const checkIsConnected = () => {
    if (auth.roles.includes(ROLES.ROLE_USER)) {
      return true;
    } else {
      setMsgNotifTopTime("Vous devez être connecté pour pouvoir ajouter ou enlever du temps, publier, commenter, partager ou envoyer des messages",10000);
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

  useEffect(() => {
    if (tokenConfirmEmail) {
      checkTokenConfirmEmail();
    }
  }, [tokenConfirmEmail]);

  const checkTokenConfirmEmail = () => {
    if (!submitting) {
      msgErrors({ submit: true });
      connector({
        method: "post",
        url: endPoints.CONFIRM_EMAIL,
        data: { tokenConfirmEmail },
        success: (response) => {
          msgErrors({ submit: false });
          setOpenModalMessage(true);
          setShowBlocModalMessage("confirmEmail");
        },
        catch: (error) => {
          msgErrors({ msg: getMsgError(error), submit: false });
        },
      });
    }
  };

  const msgErrors = (e) => {
    if (e.submit !== undefined) setSubmitting(e.submit);
    if (e.msg !== undefined)  setMsgNotifTopTime(e.msg,10000);
  };
  const breakpointColumnsObj = {
    default: 3,
    993: 2,
    500: 1
  };
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
          <Masonry
            // columns={{ xs: 1, md: 2, lg: 3 }}
            // spacing={3}
            // className={plis.length < 3 && "masonry-two-columns"}
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            
          >
            {plis &&
              plis.map((item) => (
                  <ItemMasonry
                    key={item.id}
                    item={item}
                    setItem={setItem}
                    action={action}
                    setAction={setAction}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    activeItemPlayer={activeItemPlayer}
                    setActiveItemPlayer={setActiveItemPlayer}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                  />
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
            getPlis={getPlis}
          />
        )}
        <ModalMessage
          showBloc={showBlocModalMessage}
          setShowBloc={setShowBlocModalMessage}
          checkIsConnected={checkIsConnected}
          open={openModalMessage}
          setOpen={setOpenModalMessage}
        />
      </StyledEngineProvider>
    </DefaultMain>
  );
}
