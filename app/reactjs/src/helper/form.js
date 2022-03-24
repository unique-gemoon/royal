export const clearErrors = (state) => {
  const cpState = { ...state };
  for (const key in cpState) {
    if (cpState[key].error !== undefined) {
      cpState[key].error = false;
    }
    if (cpState[key].errorMessage !== undefined) {
      cpState[key].errorMessage = "";
    }
    if (cpState[key].options !== undefined && cpState[key].options.length) {
      for (let i = 0; i < cpState[key].options.length; i++) {
        cpState[key].options[i].stateChildren = clearErrors(
          cpState[key].options[i].stateChildren
        );
      }
    }
  }
  return cpState;
};

export const clearValues = (state) => {
  const cpState = { ...state };
  for (const key in cpState) {
    if (cpState[key].value !== undefined) {
      cpState[key].value = "";
    }
  }
  return cpState;
};

export const validFormItem = (formItem) => {
  if (!formItem.required && (!formItem.value || formItem.value.length === 0))
    return false;
  if (
    formItem.check !== undefined &&
    !formItem.check &&
    formItem.required &&
    formItem.value
  )
    return false;
  switch (formItem.type) {
    case "text":
      return !validateItemText(formItem);
    case "email":
      if (formItem.value === null || formItem.value.length === 0) return true;
      if (!validateEmail(formItem.value)) {
        return true;
      }
      return false;
    case "password":
    case "passwordText":
      return (
        formItem.value === null ||
        formItem.value.length === 0 ||
        !validatePassword(formItem.value)
      );
    case "number":
      return !validateItemNumber(formItem);
    case "url":
      return (
        formItem.value === null ||
        formItem.value.length === 0 ||
        !validateUrl(formItem.value)
      );
    default:
      return formItem.value === null || formItem.value.length === 0;
  }
};

export const validForm = (form) => {
  const cpForm = { ...clearErrors(form) };
  let valid = true;
  const rawData = {};
  for (const key in cpForm) {
    cpForm[key].error = validFormItem(cpForm[key]);
    if (valid) valid = !cpForm[key].error;
    if (
      cpForm[key].disabled === undefined ||
      !cpForm[key].disabled ||
      cpForm[key].editable
    ) {
      rawData[cpForm[key].name] = cpForm[key].value;
    }
    if (cpForm[key].error) console.log(key);
  }
  return {
    form: cpForm,
    valid: valid,
    rawData: rawData,
  };
};

export function validateEmail(email) {
  const re =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  return re.test(email);
}

export function validatePassword(password) {
  const re = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*([^\w\s]|[_]))\S{8,}$/;
  return re.test(password);
}

export function validateUrl(url) {
  const re = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return re.test(url);
}

export function validateItemText(item) {
  if (
    item.value == undefined ||
    item.value == null ||
    String(item.value).length === 0 ||
    (item.match && !item.match.test(String(item.value)))
  ) {
    return false;
  }
  return true;
}

export function validateItemNumber(item) {
  if (item.size && item.size !== String(item.value).length) return false;
  if (item.min && item.value < item.min) return false;
  if (item.max && item.value > item.max) return false;
  if (!/^[0-9]+$/.test(String(item.value))) {
    return false;
  }
  return true;
}
