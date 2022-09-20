import * as actionTypes from "../functions/actionTypes";

const initState = {
    notifications: [],
    totalNotifications: 0,
    pageNotifications: 1,
    countNewNotifications: 0
};

const updateObject = (oldObject, newObject) => {
    return {
        ...oldObject,
        ...newObject,
    };
};

const NotificationReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_NOTIFICATIONS:
            return updateObject(state, { ...action});
        default:
            return state;
    }
};

export default NotificationReducer;
