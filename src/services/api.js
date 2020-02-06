import axios from 'axios'
import { AsyncStorage } from 'react-native';

export default async function api(){
  let ip = await AsyncStorage.getItem('ip');

  let api = axios.create({
    baseURL:`http://${ip}:3333`,
  });

  return api;

}


