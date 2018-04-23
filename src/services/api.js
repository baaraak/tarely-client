import store from '../redux/store';
import { API_URI } from './constans';
import {showGlobalMessageError} from '../redux/actions/app.actions';

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param method The request method default 'GET'
 * @param config The config object of the call. Can be null.
 */
export default function callApi(url, method = 'GET', config = {}) {
  const token = localStorage.getItem('tarelyJWTToken');
  if (!token) return store.dispatch(showGlobalMessageError('invalid token'));
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };
  const options = Object.assign(config, {method, headers});
  return fetch(API_URI + url, options)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      const response = error.response;
      if (response === undefined) {
      } else {
        error.status = response.status;
        error.statusText = response.statusText;
        response.text().then(text => {
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
