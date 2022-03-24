import jwtDecode from "jwt-decode";

import * as actionTypes from "../functions/actionTypes";

const initState = {
  token: null,
  roles: [],
  toLogin: false,
  user: false,
};

const updateObject = (oldObject, newObject) => {
  return {
    ...oldObject,
    ...newObject,
  };
};

const AuthReducer = (state = initState, action) => {
  let decodeToken = null;

  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REFRESH_TOKEN:
      if (action.token) {
        localStorage.setItem("token", action.token);
      }
      if (action.refreshToken) {
        localStorage.setItem("refreshToken", action.refreshToken);
      }

      decodeToken = jwtDecode(action.token);

      return updateObject(state, {
        token: action.token,
        roles: [...decodeToken.roles],
        user: {
          id: decodeToken.sub,
          email: decodeToken.email,
          username: decodeToken.username,
        },
      });

    case actionTypes.SET_USER:
      return updateObject(state, {
        user: action.user !== undefined ? action.user : state.user,
      });

    case actionTypes.TO_LOGIN:
      return updateObject(state, {
        toLogin: action.toLogin !== undefined ? action.toLogin : false,
      });

    case actionTypes.SET_TOKEN:
      localStorage.setItem("refreshToken", action.refreshToken);
      localStorage.setItem("token", action.token);
      return updateObject(state, {
        token: action.token,
      });

    case actionTypes.REFRESH_TOKEN_FAIL:
    case actionTypes.LOGOUT:
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      return updateObject(state, initState);
    default:
      return state;
  }
};

export default AuthReducer;
