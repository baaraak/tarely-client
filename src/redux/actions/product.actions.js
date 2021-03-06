// Actions Types
export const UPLOAD_PRODUCT = 'UPLOAD_PRODUCT';
export const UPLOAD_PRODUCT_FAIL = 'UPLOAD_PRODUCT_FAIL';
export const UPLOAD_PRODUCT_SUCCESS = 'UPLOAD_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAIL = 'EDIT_PRODUCT_FAIL';
export const GET_PRODUCT_SWIPING_LIST = 'GET_PRODUCT_SWIPING_LIST';
export const GET_PRODUCT_SWIPING_LIST_SUCCESS =
  'GET_PRODUCT_SWIPING_LIST_SUCCESS';
export const HANDLE_SWIPE = 'HANDLE_SWIPE';
export const GET_PRODUCT_MATCHES = 'GET_PRODUCT_MATCHES';
export const GET_PRODUCT_MATCHES_SUCCCESS = 'GET_PRODUCT_MATCHES_SUCCCESS';
export const GET_MATCH_MESSAGES = 'GET_MATCH_MESSAGES';
export const GET_MATCH_MESSAGES_SUCCESS = 'GET_MATCH_MESSAGES_SUCCESS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const GET_PRODUCT_BROWSE = 'GET_PRODUCT_BROWSE';
export const GET_PRODUCT_BROWSE_SUCCESS = 'GET_PRODUCT_BROWSE_SUCCESS';
export const SWIPE_RESPONSE_MATCH = 'SWIPE_RESPONSE_MATCH';
export const CLOSE_MATCH_MODAL = 'CLOSE_MATCH_MODAL';
export const SUBMIT_BID = 'SUBMIT_BID';
export const SUBMIT_BID_RESULT = 'SUBMIT_BID_RESULT';
export const ON_UNMATCH = 'ON_UNMATCH';
export const ON_UNMATCH_SUCCESS = 'ON_UNMATCH_SUCCESS';
export const GET_BID_MESSAGES = 'GET_BID_MESSAGES';
export const GET_BID_MESSAGES_RESPONSE = 'GET_BID_MESSAGES_RESPONSE';
export const SEND_BID_MESSAGE = 'SEND_BID_MESSAGE';
export const ACCEPT_BID = 'ACCEPT_BID';
export const REJECT_BID = 'REJECT_BID';
export const ACCEPT_BID_SUCCESS = 'ACCEPT_BID_SUCCESS';
export const REJECT_BID_SUCCESS = 'REJECT_BID_SUCCESS';

export function uploadProduct(product) {
  return {
    type: UPLOAD_PRODUCT,
    product,
  };
}

export function uploadProductSuccess(product) {
  return {
    type: UPLOAD_PRODUCT_SUCCESS,
    product,
  };
}

export function uploadProductFail(message) {
  return {
    type: UPLOAD_PRODUCT_FAIL,
    message,
  };
}

export function updateProduct(product) {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
}

export function editProductSuccess() {
  return {
    type: EDIT_PRODUCT_SUCCESS,
  };
}

export function editProductFail(message) {
  return {
    type: EDIT_PRODUCT_FAIL,
    message,
  };
}

export function getProductSwipingList(id) {
  return {
    type: GET_PRODUCT_SWIPING_LIST,
    id,
  };
}

export function getProductSwipingListSuccess(products) {
  return {
    type: GET_PRODUCT_SWIPING_LIST_SUCCESS,
    products,
  };
}

export function handleSwipe(data) {
  return {
    type: HANDLE_SWIPE,
    data,
  };
}

export function getProductMatches(id) {
  return {
    type: GET_PRODUCT_MATCHES,
    id,
  };
}

export function getProductMatchesListSuccess(products) {
  return {
    type: GET_PRODUCT_MATCHES_SUCCCESS,
    products,
  };
}

export function getMatchMessages(roomId) {
  return {
    type: GET_MATCH_MESSAGES,
    roomId,
  };
}

export function getMatchMessagesSuccess(messages) {
  return {
    type: GET_MATCH_MESSAGES_SUCCESS,
    messages,
  };
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    message,
  };
}

export function sendMessageSuccess() {
  return {
    type: SEND_MESSAGE_SUCCESS,
  };
}

export function getProductBrowse(productId, query) {
  return {
    type: GET_PRODUCT_BROWSE,
    query,
    productId,
  };
}

export function getProductBrowseSucccess(products) {
  return {
    type: GET_PRODUCT_BROWSE_SUCCESS,
    products,
  };
}

export function handleSwipeResponseMatch(match) {
  return {
    type: SWIPE_RESPONSE_MATCH,
    match,
  };
}

export function closeMatchModal() {
  return {
    type: CLOSE_MATCH_MODAL,
  };
}


export function submitBid(bid) {
  return {
    type: SUBMIT_BID,
    bid
  };
}

export function submitBidResult(result) {
  return {
    type: SUBMIT_BID_RESULT,
    result
  };
}

export function onUnmatch(matchId) {
  return {
    type: ON_UNMATCH,
    matchId
  };
}

export function submitUnmatchSuccess(matchId) {
  return {
    type: ON_UNMATCH_SUCCESS,
    matchId
  };
}

export function getBidMessages(bidId) {
  return {
    type: GET_BID_MESSAGES,
    bidId
  };
}

export function getBidMessagesResponse(messages) {
  return {
    type: GET_BID_MESSAGES_RESPONSE,
    messages
  };
}

export function sendBidMessage(message) {
  return {
    type: SEND_BID_MESSAGE,
    message
  };
}

export function acceptBid(bidId) {
  return {
    type: ACCEPT_BID,
    bidId
  };
}

export function rejectBid(bidId) {
  return {
    type: REJECT_BID,
    bidId
  };
}

export function rejectBidSuccess(bidId) {
  return {
    type: REJECT_BID_SUCCESS,
    bidId
  };
}

export function acceptBidSuccess(bidId) {
  return {
    type: ACCEPT_BID_SUCCESS,
    bidId
  };
}