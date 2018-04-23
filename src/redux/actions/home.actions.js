// Actions Types
export const GET_USER_PRODUCTS = "GET_USER_PRODUCTS";
export const PRODUCT_LOADED = "PRODUCT_LOADED";

export function getUserProducts() {
    return {
        type: GET_USER_PRODUCTS,
    };
}

export function productsLoaded(products) {
    return {
        type: PRODUCT_LOADED,
        products
    };
}
