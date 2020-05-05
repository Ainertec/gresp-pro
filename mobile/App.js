import React from 'react';
import { Text, View, Button, YellowBox } from 'react-native'
import Routes from './src/routes';
import Dialog from 'react-native-dialog'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'componentWillReceiveProps',
  'Possible Unhandled Promise',
])
export default function App() {
  return <Routes/>
    
}
