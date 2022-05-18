import { pathSocketIo } from "../config/vars";
import io from "socket.io-client";

export const socket = io(pathSocketIo);