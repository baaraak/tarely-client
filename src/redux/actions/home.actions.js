// Actions Types
export const GET_USER_PRODUCTS = 'GET_USER_PRODUCTS';
export const PRODUCT_LOADED = 'PRODUCT_LOADED';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function deleteProduct(productId) {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
}
