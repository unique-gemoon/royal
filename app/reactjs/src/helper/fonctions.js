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

export function getPathMedia(media, type = "file") {
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

export function sortObjects(objs, key, order = "asc") {
  if (order.toLowerCase() == "asc") {
    return objs.sort(function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  } else {
    return objs.sort(function (a, b) {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    });
  }
}

export function decrementDuration(duration) {
  let hour, minute, second;
  [hour, minute, second] = String(duration).split(":");
  hour = getInt(hour);
  minute = getInt(minute);
  second = getInt(second);
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
  return [hour, minute, second];
}

export function getPercentDuration(item) {
  if (!item.duration || !item.allottedTime) {
    return 0;
  }
  let hour, minute, second;
  [hour, minute, second] = String(item.duration).split(":");
  hour = getInt(hour);
  minute = getInt(minute);
  second = getInt(second);
  const durationSecond = hour * 3600 + minute * 60 + second;
  return (durationSecond * 100) / (getInt(item.allottedTime) * 60);
}

export const uniqid = () => {
  const n = Math.floor(Math.random() * 11);
  const k = Math.floor(Math.random() * 1000000);
  return String.fromCharCode(n) + k;
};

export function getInt(val) {
  return parseInt(val) || 0;
}
