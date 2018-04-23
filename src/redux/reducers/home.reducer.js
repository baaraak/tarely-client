import {
    PRODUCT_LOADED
} from "../actions/home.actions";

const initialState = {
    products: null,
};

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case PRODUCT_LOADED:
            return {
                ...state,
                products: action.products
            };
        default:
            return state;
    }
}
