import moment from "moment";

export function validateEmail(email) {
  //eslint-disable-next-line
  const re =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  return re.test(email);
}

export function validateUrl(url) {
  //eslint-disable-next-line
  const re = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return re.test(url);
}

export function validateTime(t) {
  const re = /^([0-1]?[0-9]|2[0-4]):([0-5]?[0-9]):([0-5]?[0-9])\S?$/;
  return re.test(t);
}

export function removeTags(val) {
  return val.replace(/<(?:.|\n)*?>/gm, "");
}

export function isObject(value) {
  return value != null && typeof value == "object" && !Array.isArray(value);
}

export function getTime(hour, minute, second) {
  const h = String(hour).length == 1 ? "0" + hour : hour;
  const m = String(minute).length == 1 ? "0" + minute : minute;
  const s = String(second).length == 1 ? "0" + second : second;
  return h + ":" + m + ":" + s;
}

export function durationTime(createdAt, allottedTime){

  console.log("createdAt",createdAt);
  createdAt = moment(createdAt).add(allottedTime, "minutes").toDate();
  console.log(createdAt);
  const minutes = moment(createdAt).diff(moment(), 'minutes');
  if(minutes> 0){
    const hour = parseInt(minutes / 60);
    const minute = minutes % 60;
    return getTime(hour, minute, 0);
  }
  return "00:00:00";
}
