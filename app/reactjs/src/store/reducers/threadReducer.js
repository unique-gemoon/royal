import * as actionTypes from "../functions/actionTypes";

const initState = {
    user: false,
    threads: [],
    totalThreads: 0,
    pageThreads: 1,
    countNewMessages: 0,
};

const updateObject = (oldObject, newObject) => {
    let data = {
        ...oldObject,
        ...newObject,
    };
    for (let i = 0; i < data.threads.length; i++) {
        let cpThread = data.threads[i];
        data.threads[i] = updateStatusThread(data.user, cpThread);
    }
    return data;
};

const updateStatusThread = (user, row) => {
    let message = row.thread.messages.length > 0 ? row.thread.messages[0] : {};
    let status = "";
    if (message) {
        if (user && message.userId == user.id) {
            if (message.seen) {
                status = "read";
            } else {
                status = "send";
            }
        } else {
            if (!message.seen) {
                status = "receive";
            }
        }
    }
    return {...row, thread: {...row.thread, status}};
};

const ThreadReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_THREADS:
            return updateObject(state, { ...action });
        default:
            return state;
    }
};

export default ThreadReducer;
