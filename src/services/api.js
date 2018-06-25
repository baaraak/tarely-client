// import store from '../redux/store';
import { API_URI } from './constans';
// import { showGlobalMessageError } from '../redux/actions/app.actions';

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param method The request method default 'GET'
 * @param data The data object of the call. Can be null.
 */
export default function callApi(url, method = 'GET', data) {
  const token = localStorage.getItem('tarelyJWTToken');
  const headers = {
    Accept: 'application/json',
    'content-type': 'application/json',
    authorization: token,
  };
  return fetch(API_URI + url, { method, headers, body: JSON.stringify(data) })
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {
      console.log('in err')
      console.log(error)
      const response = error.response;
      if (response === undefined) {

      } else {
        error.status = response.status;
        error.statusText = response.statusText;
        response.text().then((text) => {
          try {
            const json = JSON.parse(text);
            error.message = json.message;
          } catch (ex) {
            error.message = text;
          }
        });
      }
    });
}
