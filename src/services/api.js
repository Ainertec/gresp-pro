import axios from 'axios'
import { AsyncStorage } from 'react-native';
var test = ''
async function teste ()  {
  var base =  await AsyncStorage.getItem("ip", (ip) => {
    console.log("ip:",base);
    });
    console.log("base: ",base);
    test = base;
}
teste()
var ip = '192.168.3.100';
var api;
if(api === undefined)
{
     api = axios.create({

    baseURL: `http://${ip}:3333`,
});

}
const ret = api;

export default  ret;


