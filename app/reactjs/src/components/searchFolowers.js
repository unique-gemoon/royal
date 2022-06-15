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
  threads = [],
  setThreads = () => {},
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
      autoFocus: false,
    },
    searching: false,
  });

  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (action.search.isOpen) {
      setState({ ...state, search: { ...state.search, autoFocus: true } });
    }
  }, [action.search.isOpen]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [pageUsers, setPageUsers] = useState(1);
  const [endScroll, setEndScroll] = useState(false);
  
  const refContent = useRef(null);
  const onScrollContent = () => {
    const { scrollTop, scrollHeight, clientHeight } = refContent.current;
    if (scrollTop + clientHeight === scrollHeight) {
      if (users.length < totalUsers) {
        setEndScroll(true);
        setPageUsers(pageUsers + 1);
      }
    }
  };

  const refList = useRef(null);
  const onScrollList = () => {
    const { scrollTop, scrollHeight, clientHeight } = refList.current;
    if (scrollTop + clientHeight === scrollHeight) {
      if (users.length < totalUsers) {
        setEndScroll(true);
        setPageUsers(pageUsers + 1);
      }
    }
  };

  useEffect(() => {
    if (!auth.isConnected) {
      setUsers([]);
      setTotalUsers(0);
    }
  }, [auth.isConnected]);

  useEffect(() => {
    getUsers();
  }, [pageUsers]);

  const getUsers = (refresh = false) => {
    const cpPageUsers = refresh ? 1 : pageUsers;
    if (pageUsers != cpPageUsers) {
      setPageUsers(cpPageUsers);
    }
    if (state.search.value.length >= 3) {
      connector({
        method: "get",
        url: `${endPoints.USER_SEARCH_LIST}?page=${pageUsers}&q=${state.search.value}`,
        success: (response) => {
          if (pageUsers == 1) {
            setUsers(response.data.users);
          } else {
            setUsers([...users, ...response.data.users]);
          }

          setTotalUsers(response.data.total);
          setEndScroll(false);
        },
        catch: (error) => {
          console.log(error);
          setEndScroll(false);
        },
      });
    } else {
      setEndScroll(false);
    }
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
              getUsers(true);
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
      <div
        className="content-search-results"
        ref={refContent}
        onScroll={(e) => {
          if (isTabletOrMobile) {
            onScrollContent(e);
          }
        }}
      >
        {showResult && (
          <div
            className="list-result-search"
            ref={refList}
            onScroll={(e) => {
              if (!isTabletOrMobile) {
                onScrollList(e);
              }
            }}
          >
            {users.length > 0 ? (
              users.map((item, index) => (
                <div key={index}>
                  <ItemListFolower
                    key={item.id}
                    item={{ ...item, index }}
                    setItem={setItem}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    threads={threads}
                    setThreads={setThreads}
                    action={action}
                    setAction={setAction}
                    folowersMessage={folowersMessage}
                    setFolowersMessage={setFolowersMessage}
                  />
                </div>
              ))
            ) : (
              <p className="message-not-result">Aucun resultat trouvé </p>
            )}

            {endScroll && <SpinnerLoading />}
          </div>
        )}
      </div>
    </FolowerSearch>
  );
}
