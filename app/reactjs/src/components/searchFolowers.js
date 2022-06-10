import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FolowerSearch } from "../assets/styles/componentStyle";
import endPoints from "../config/endPoints";
import connector from "../connector";
import ItemListFolower from "./itemListFolower";
import { socket } from "./socket";
import SpinnerLoading from "./spinnerLoading";
import Input from "./ui-elements/input";
import { useMediaQuery } from "react-responsive";

export default function SearchFolowers({
  action,
  setAction = () => {},
  folowersMessage,
  setFolowersMessage = () => {},
  setMsgNotifTopTime = () => {},
  updateSubscriberStatus = () => {},
  threads=[],
  setThreads= () => {},
}) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 993px)" });
  const auth = useSelector((store) => store.auth);
  const [showResult, setShowResult] = useState(false);
  const [state, setState] = useState({
    search: {
      type: "text",
      id: "search-folowers",
      value: "",
      placeholder: "Qui recherchez-vous ?",
      className: "search-input",
      autoFocus : false
    },
    searching: false,
  });

  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (action.search.isOpen) {
      setState({ ...state, search: { ...state.search, autoFocus: true }});
    }
  }, [action.search.isOpen]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    connector({
      method: "get",
      url: `${endPoints.USER_SEARCH_LIST}`,
      success: (response) => {
        let cpUsers = [];
        for (let i = 0; i < response.data.users.length; i++) {
          cpUsers.push({ ...response.data.users[i], show: true });
        }
        setUsers(cpUsers);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const setItem = (item) => {
    if (item.index !== undefined) {
      if (users[item.index]) {
        const cpUsers = [...users];
        cpUsers[item.index] = item;
        setUsers(cpUsers);
      }

      updateSubscriberStatus(item);
    }
  };

  useEffect(() => {
    const updateSubscriber = (item) => {
      if (auth.user.id == item.user.id) {
        const cpUsers = [...users];
        for (let i = 0; i < cpUsers.length; i++) {
          const user = cpUsers[i];
          if (user.id == item.subscriber.id) {
            cpUsers[i].isSubscribed = item.isSubscribed;
            break;
          }
        }
        setUsers(cpUsers);
      }
    };
    socket.on("SERVER_SUBSCRIBER_UPDATED", updateSubscriber);

    return () => {
      socket.off("SERVER_SUBSCRIBER_UPDATED", updateSubscriber);
    };
  }, [users]);

  const [endScroll, setEndScroll] = useState(false)
  const ref = useRef(null);
  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (scrollTop + clientHeight === scrollHeight) {
      setEndScroll(true);
    }
  }
  return (
    <FolowerSearch>
      <div className="form-search-folower">
        <button>
          <SearchRoundedIcon />
        </button>
        <Input
          {...state.search}
          autoFocus={true}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.search.value = e.target.value;
            setState(cpState);

            if (cpState.search.value.length >= 3) {
              setShowResult(true);
              setState({ ...state, searching: true });
              let cpUsers = [...users];
              for (let i = 0; i < cpUsers.length; i++) {
                const user = cpUsers[i];
                let show = false;
                if (String(user.username).indexOf(cpState.search.value) == 0) {
                  show = true;
                }
                cpUsers[i].show = show;
              }
              setUsers(cpUsers);
            } else {
              setShowResult(false);
              setState({ ...state, searching: false });
            }
          }}
        />
        {state.searching && (
          <span
            className="reset-search"
            onClick={() => {
              const cpState = { ...state };
              cpState.search.value = "";
              setState(cpState);
              setShowResult(false);
              setState({ ...state, searching: false });
            }}
          >
            <CloseOutlinedIcon />
          </span>
        )}
      </div>
      <div className="content-search-results" ref={ref} onScroll={(e) => { if (isTabletOrMobile) { onScroll(e) } }}>
        {showResult && <div className="list-result-search" ref={ref} onScroll={(e) => { if (!isTabletOrMobile) { onScroll(e) } }}>
          {users.length > 0 ? users.map((item, index) => (
            <div key={index}>
              {item.show && (
                <ItemListFolower
                  key={item.id}
                  item={{ ...item, index }}
                  setItem={setItem}
                  setMsgNotifTopTime={setMsgNotifTopTime}
                  threads={threads}
                  setThreads={setThreads}
                  onClick={() => {
                    if (!isTabletOrMobile){
                      const cpAction = {
                        ...action,
                        notification: { ...action.notification, isOpen: false },
                        folower: { ...action.folower, isOpen: false },
                        search: { ...action.search, isOpen: true },
                        messagerie: { ...action.messagerie, isOpen: true },
                      };
                      setAction(cpAction);
                    }else{
                      const cpAction = {
                        ...action,
                        notification: { ...action.notification, isOpen: false },
                        folower: { ...action.folower, isOpen: false },
                        search: { ...action.search, isOpen: false },
                        messagerie: { ...action.messagerie, isOpen: true },
                      };
                      setAction(cpAction);
                    }
                  }}
                />
              )}
            </div>
            )) : 
            <p className="message-not-result">Aucun resultat trouvé </p>
          }
          {endScroll && <SpinnerLoading />}
        </div> 
        }
          
        </div>
    </FolowerSearch>
  );
}
