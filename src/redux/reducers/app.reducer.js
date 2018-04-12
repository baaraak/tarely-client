import {
  SHOW_GLOBAL_MESSAGE_ERROR,
} from "../actions/app.actions";

const initialState = {
  globalError: null,
};

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_GLOBAL_MESSAGE_ERROR:
      return {
        ...state,
        globalError: action.message
      };
    default:
      return state;
  }
}
