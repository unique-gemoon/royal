import moment from "moment";
import noImage from "../assets/images/noImage.png";
import { pathImage } from "../config/vars";

export function removeTags(val) {
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
    return media.file ? URL.createObjectURL(media.file) : media.path ? pathImage + media.path : pathImage + media;
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

export function getPercentInt(val, total) {
    return parseInt((Number(val) * 100) / total);
}

export function getDurationHM(from, to) {
    if (!from || !to) {
        return "";
    }
    const d = from.diff(to, "days");
    const h = from.diff(to, "hours") % 24;
    const m = from.diff(to, "minutes") % 60;
    if (d == 0 && h == 0 && m == 0) {
        return "1m";
    } else if (d == 1) {
        return "Hier";
    } else if (d > 1) {
        return moment(to).format("DD.MM.YYYY");
    } else {
        const hour = String(h).length == 1 ? "0" + h : h;
        const minute = String(m).length == 1 ? "0" + m : m;
        return `${h > 0 ? hour + "h" : ""}${m > 0 ? minute + "m" : ""}`;
    }
}
export function getDurationHMText(from, to) {
    if (!from || !to) {
        return "";
    }
    const d = from.diff(to, "days");
    const h = from.diff(to, "hours") % 24;
    const m = from.diff(to, "minutes") % 60;
    if (d == 0 && h == 0 && m == 0) {
        return "1m";
    } else if (d == 1) {
        return "Hier";
    } else if (d > 1) {
        return moment(to).format("DD.MM.YYYY");
    } else {
        const hour = String(h).length == 1 ? "0" + h : h;
        const minute = String(m).length == 1 ? "0" + m : m;
        return `Il y a ${h > 0 ? hour + "h" : ""}${m > 0 ? minute + "m" : ""}`;
    }
}

export function getDurationMessage(from, to) {
    if (!from || !to) {
        return "";
    }
    const d = from.diff(to, "days");
    const h = from.diff(to, "hours") % 24;
    const m = from.diff(to, "minutes") % 60;
    if (d == 0 && h == 0 && m == 0) {
        return "1m";
    } else if (d == 1) {
        return "Hier " + moment(to).format("h:mm");
    } else if (d > 1) {
        return moment(to).format("DD MMM YYYY h:mm");
    } else {
        const hour = String(h).length == 1 ? "0" + h : h;
        const minute = String(m).length == 1 ? "0" + m : m;
        return `${h > 0 ? hour + "h" : ""}${m > 0 ? minute + "m" : ""}`;
    }
}

export function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
}

export function getUniqueList(arr) {
    return arr.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id && item.type === current.type);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
}

export function scrollToElement(id) {
    if (id && document.getElementById(id)) {
        document.getElementById(id).scrollIntoView();
    }
}

export function copyToClipboard(text) {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
}

export function scrollBottomById(id) {
    if (id && document.getElementById(id)) {
        const container = document.getElementById(id);
        if (container) container.scrollTop = container.scrollHeight;
    }
}

export function decrementDurationTime(duration, seconds = 1) {
    if (duration) {
        let hour, minute, second;
        [hour, minute, second] = String(duration).split(":");

        const d = getInt(hour) * 3600 + getInt(minute) * 60 + getInt(second) -  getInt(seconds);

        if (d < 0) {
            return false;
        }

        hour = Math.floor(d / 3600);
        minute = Math.floor((d % 3600) / 60);
        second = Math.floor((d % 3600) % 60);

        const h = String(hour).length == 1 ? "0" + hour : hour;
        const m = String(minute).length == 1 ? "0" + minute : minute;
        const s = String(second).length == 1 ? "0" + second : second;
        return h + ":" + m + ":" + s;
    }
    return false;
}

export function scrollTop(className = "has-scroll") {
    if (document.querySelector(`.${className}`))
        document.querySelector(`.${className}`).scrollTo({
            top: 0,
            behavior: "smooth",
        });
}

export function getDataOuverture(ouverture, mediaOuverture) {
    let el = document.createElement("html");
    if (ouverture.indexOf("blockquote")) {
        ouverture = ouverture.replace("<blockquote>", '<p class="blockquote">').replace("</blockquote>", "</p>");
    }

    el.innerHTML = ouverture;
    const listP = el.getElementsByTagName("p");
    let newOuverture = [];
    let currentElement = "";

    for (let i = 0; i < listP.length; i++) {
        const p = listP[i];

        if (p.classList.contains("block-image")) {
            const listImg = p.getElementsByTagName("img");
            if (listImg.length) {
                const url = listImg[0].src;
                const image = getMediaOuvertureByUrl(mediaOuverture, url, "image");

                if (currentElement == "image") {
                    newOuverture[newOuverture.length - 1].data = [...newOuverture[newOuverture.length - 1].data, image];
                } else {
                    newOuverture.push({ type: "image", data: [image] });
                }
            }

            currentElement = "image";
        } else if (p.classList.contains("block-video")) {
            const listVideo = p.getElementsByTagName("video");
            if (listVideo.length) {
                const url = listVideo[0].src;
                const video = getMediaOuvertureByUrl(mediaOuverture, url, "video");
                newOuverture.push({ type: "video", data: [video] });
            }
            currentElement = "video";
        } else if (p.classList.contains("block-audio")) {
            const listMusic = p.getElementsByTagName("audio");
            if (listMusic.length) {
                const url = listMusic[0].src;
                const music = getMediaOuvertureByUrl(mediaOuverture, url, "music");
                newOuverture.push({ type: "music", data: [music] });
            }
            currentElement = "audio";
        } else if (p.classList.contains("blockquote")) {
            currentElement = "blockquote";
            newOuverture.push({ type: "blockquote", content: p.innerHTML });
        } else if (p.innerHTML == "<br>" && currentElement == "image") {
        } else {
            currentElement = "text";
            newOuverture.push({ type: "text", content: p.innerHTML });
        }
    }
    return newOuverture;
}

export function getMediaOuvertureByUrl(mediaOuverture, url, type) {
    let media = { type };
    if (mediaOuverture?.[type].length) {
        for (let i = 0; i < mediaOuverture[type].length; i++) {
            const cpMedia = mediaOuverture[type][i];
            if (url.indexOf(cpMedia.path) != -1) {
                media = cpMedia;
                break;
            }
        }
    }
    return media;
}