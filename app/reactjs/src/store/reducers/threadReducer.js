import * as actionTypes from "../functions/actionTypes";

const initState = {
    threads: [],
    totalThreads: 0,
    pageThreads: 1,
    countNewMessages:0
};

const updateObject = (oldObject, newObject) => {
    return {
        ...oldObject,
        ...newObject,
    };
};

const ThreadReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_THREADS:
            return updateObject(state, { ...action});
        default:
            return state;
    }
};

export default ThreadReducer;
