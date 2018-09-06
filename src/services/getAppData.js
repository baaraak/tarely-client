import callApi from './api';

export default async () => {
  const user = await callApi(`/users/me`, 'GET');
  const categories = await callApi('/categories');
  return { user, categories };
}
