import { pathSocketIo } from "../config/vars";
import io from "socket.io-client";
import { uniqid } from "../helper/fonctions";

let key = localStorage.getItem("socketKey");
if(!key){
    key =  uniqid();
    localStorage.setItem("socketKey",key);
}

export const socket = io(pathSocketIo, {
  query: {
    key
  },
});
