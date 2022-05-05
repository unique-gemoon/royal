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
  return value != null && typeof value == 'object' && !Array.isArray(value);
}