import api from './api';

export async function load(identification) {
  const response = api.get(`orders/${identification}`).catch((error) => {
    console.log(error);
    return error.request;
  });

  return response;
}
