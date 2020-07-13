import MainRoute from './routes/MainRoute';
import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';

export default class App extends Component {

  constructor(properties) {
    super(properties);
    OneSignal.setLogLevel(6, 0);
    
    OneSignal.init("82d014e8-838d-4e74-ac0a-ab31f4f8a2ae", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2); 
  
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }
  
  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }
  
  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return ( 
      <MainRoute />
     )
  }
}