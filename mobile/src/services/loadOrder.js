import api from './api';

export async function load(identification) {
  const response = api.get(`orders/${identification}`).catch((error) => {
    
    return error.request;
  });

  return response;
}
