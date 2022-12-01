import * as actionTypes from "../functions/actionTypes";

const initState = {
    activeItem: null,
    activeItemPlayer: null,
    countOpened:0,
    showModal:false,
    showNV2:false,
    showCitation:false,
    showComment:false,
};

const updateObject = (oldObject, newObject) => {
    return {
        ...oldObject,
        ...newObject,
    };
};

const PliReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_PLI:
            return updateObject(state, { ...action });
        default:
            return state;
    }
};

export default PliReducer;
