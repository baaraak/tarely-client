import callApi from './api';

export default async function () {
  const user = await callApi('/user');
  // TODO: add check if not user, redirect
  return user;
};
