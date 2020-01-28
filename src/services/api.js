import axios from 'axios'
import React from 'react';
import { AsyncStorage } from 'react-native';
var ip;
async function teste() {
     ip = await AsyncStorage.getItem('ip');
    console.log("aaaaaaaa", ip);

}


const api = axios.create({

    baseURL: `http://192.168.3.100:3333`,
});




export default api;