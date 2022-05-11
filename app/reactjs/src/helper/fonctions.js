import noImage from "../assets/images/noImage.png";
import { pathImage } from "../config/vars";

export function removeTags(val) {
  // return val.replace("/(&nbsp;|<([^>]+)>)/ig,", "")
  return val.replace(/<(?:.|\n)*?>/gm, "");
}

export const getMsgError = (error, msg = "Quelque chose s'est mal passé.") => {
  console.log("getMsgError : ", error.response);
  if (error?.response?.data) {
    if (error.response.data?.message) {
      msg = error.response.data.message;
    } else if (error.response.data["hydra:description"] !== undefined) {
      msg = error.response.data["hydra:description"];
    }
  }
  return msg;
};

export function getPathMedia(media,type="file") {
  if (!media) return type == "image" ? noImage : null;
  return media.file
    ? URL.createObjectURL(media.file)
    : media.path
    ? pathImage + media.path
    : pathImage + media;
}

export function getTime(hour, minute, second) {
  const h = String(hour).length == 1 ? "0" + hour : hour;
  const m = String(minute).length == 1 ? "0" + minute : minute;
  const s = String(second).length == 1 ? "0" + second : second;
  return h + ":" + m + ":" + s;
}

