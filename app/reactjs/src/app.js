import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import Router from './router';
import {
  REFRESH_TOKEN,
  REFRESH_TOKEN_FAIL,
} from "./store/functions/actionTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import "./assets/styles/globalStyle";
import "./assets/styles/fonts.css";
import "./index.css";
import connector from './connector';
import endPoints from './config/endPoints';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token === undefined || refreshToken === undefined) {
      setIsDone(true);
      return;
    }
    let dateExp =
      token !== null ? new Date(jwtDecode(token).exp * 1000) : false;
    if (dateExp !== false && dateExp > Date.now()) {
      dispatch({
        type: REFRESH_TOKEN,
        token: token,
      });
      setIsDone(true);
    } else if (refreshToken !== null)
      connector({
        method: "post",
        url: endPoints.REFRESH_TOKEN,
        data: {
          refreshToken: refreshToken,
        },
        success: (response) => {
          dispatch({
            type: REFRESH_TOKEN,
            token: response.data.token,
          });
          setIsDone(true);
        },
        catch: (error) => {
          dispatch({
            type: REFRESH_TOKEN_FAIL,
          });
          setIsDone(true);
        },
      });
    else setIsDone(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return  isDone ? (<Router />) : "Chargement ...";
}

export default App;
