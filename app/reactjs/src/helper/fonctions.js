export function removeTags(val) {
    // return val.replace("/(&nbsp;|<([^>]+)>)/ig,", "")
     return val.replace(/<(?:.|\n)*?>/gm, '')
}