import {
    SHOW_GLOBAL_MESSAGE_ERROR,
    SET_USER_PROFILE,
    HIDE_GLOBAL_MESSAGE_ERROR
} from "../actions/app.actions";

const initialState = {
    globalError: null,
    user: null
};

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case SHOW_GLOBAL_MESSAGE_ERROR:
            return {
                ...state,
                globalError: action.message
            };
        case HIDE_GLOBAL_MESSAGE_ERROR:
            return {
                ...state,
                globalError: null
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                user: action.profile
            };
        default:
            return state;
    }
}
