import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create();
AsyncStorage.getItem('@RN:ip').then((result) => {
  api.defaults.baseURL = `http://${result}:3333`;
});

export default api;
