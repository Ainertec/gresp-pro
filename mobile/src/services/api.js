import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create();
AsyncStorage.getItem('@RN:ip').then((result) => {
  api.defaults.baseURL = `http://10.0.0.104:3333`;
});

export default api;
