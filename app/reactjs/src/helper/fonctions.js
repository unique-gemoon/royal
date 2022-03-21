export function removeTags(val) {
    // return val.replace("/(&nbsp;|<([^>]+)>)/ig,", "")
     return val.replace(/<(?:.|\n)*?>/gm, '')
}

export const getMsgError = (error, msg = "Quelque chose s'est mal passé.") => {
    console.log('getMsgError : ',error);
    if (error?.response?.data) {
      if (error.response.data?.message) {
        msg = error.response.data.message;
      } else if (error.response.data["hydra:description"] !== undefined) {
        msg = error.response.data["hydra:description"];
      }
    }
    return msg;
  };