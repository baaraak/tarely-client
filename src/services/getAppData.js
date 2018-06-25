import callApi from './api';

export default async function (location) {
  const lat = location.latitude;
  const lng = location.longitude;
  const user = await callApi(`/users/me?lat=${lat}&lng=${lng}`, 'GET');
  const categories = await callApi('/categories');
  return { user, categories };
}
