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

export function durationTime(createdAt, allottedTime) {
    createdAt = moment(createdAt).add(allottedTime, "minutes").toDate();
    const seconds = moment(createdAt).diff(moment(), "seconds");
    if (seconds > 0) {
        const hour = parseInt(seconds / 3600);
        const minute = parseInt(parseInt(seconds % 3600) / 60);
        const second = parseInt(seconds % 3600) % 60;
        return getTime(hour, minute, second);
    }
    return "00:00:00";
}

export function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

export function countPlisOpened(arr) {
    let cpArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].users.length > 0) {
            cpArr.push({ id: arr[i].id, count: arr[i].users.length });
        }
    }
    return cpArr;
}

export function sortByKey(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
}

export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, "g"), replace);
}

export function getArrayString(table) {
    if (Array.isArray(table)) {
        return table;
    }
    return JSON.parse(table);
}

export function ucfirst(str) {
    if (String(str).length == 0) return "";
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export function getArgs() {
    const args = process.argv
    .slice(2)
    .map(arg => arg.split('='))
    .reduce((args, [value, key]) => {
        args[value] = key;
        return args;
    }, {});
    return args;
}
