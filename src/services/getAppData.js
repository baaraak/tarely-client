import callApi from './api';

export default async function () {
  return await callApi('/user', 'POST');
};
