import 'react-native-gesture-handler';
import MainRoute from './routes/MainRoute';
import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'
import AsyncStorage from '@react-native-community/async-storage'
import database from '@react-native-firebase/database'

export default class App extends Component {

  constructor(properties) {
    super(properties);
    OneSignal.setLogLevel(6, 0);
    
    OneSignal.init("82d014e8-838d-4e74-ac0a-ab31f4f8a2ae", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2); 
  
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    this.checkingNewData()

  }
  
  async onReceived(notification) {
    console.log("Notification received: ", notification);
    console.log('In data Is Updating')
    try {
      var jsonValue = await AsyncStorage.getItem('User_Cred')
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue)
      if(jsonValue != null) {
        var user = JSON.parse(jsonValue).user
        var uid = JSON.parse(jsonValue).uid
        if(user == 'Student') {
            console.log('Student')
            var Class = JSON.parse(jsonValue).class 
            var year = JSON.parse(jsonValue).year
            var div = JSON.parse(jsonValue).div
            const tags = {
              user: user,
              department: Class,
              class: year,
              tag: year + '' + Class + '' + div,
            }
            console.log('tags:', tags)
            var classroom = year + '' + Class + '' + div
            if(Class == "C") {
              Class += "o"
            } else if(Class == "E") {
              Class += "n"
            } else if(Class == "M") {
              Class += "e"
            } else {
              console.log('Someting is worng')
            }
          jsonValue = await AsyncStorage.getItem('list_data')
          var myArray = []
            var ref = database().ref("notice/")
            ref.once("value", async (snapshot) => {
              snapshot.forEach( (childSnapshot) => {
                var myJSON=childSnapshot.toJSON()
                var seg = myJSON.toSegments
                if((myJSON.toSegments != null || myJSON.toSegments != undefined) && (seg.includes(user) || seg.includes(Class) || seg.includes(year) || seg.includes(classroom))) {
                  console.log(myJSON.toSegments)
                   
                  var key = myJSON.key
                  var head = myJSON.head
                  var notice = myJSON.text
                  var downURL = myJSON.downloadURL
                  var date = myJSON.date
                  var time = myJSON.time
                  var toSegments = myJSON.toSegments
                  var uploaderID = myJSON.uploaderID
                  var uploaderName = myJSON.uploaderName
                  
                  var item = {head: head, text:notice, downloadURL:downURL,date:date,time:time, key:key, toSegments: toSegments, uploaderID:uploaderID,uploaderName:uploaderName}
             
                    var itemStr = JSON.stringify(item) + '<;>'    
                    myArray = [...myArray, itemStr]
                }
              })
              console.log(myArray)
              await AsyncStorage.setItem('list_data', myArray.toString())
            }).then(() => {
              database()
                .ref('Users/Student/' + uid).update({
                  newNotice: 0,
                }).then(() => {
                  console.log('done')
                })
            })
        } else {
          console.log('Teacher')
          var myArray = []
            var ref = database().ref("notice/")
            ref.once("value", async (snapshot) => {
              snapshot.forEach( (childSnapshot) => {
                var myJSON=childSnapshot.toJSON()
                if(myJSON.toSegments != null || myJSON.toSegments != undefined) {
                  console.log(myJSON.toSegments)
                    var key = myJSON.key
                    var head = myJSON.head
                    var notice = myJSON.text
                    var downURL = myJSON.downloadURL
                    var date = myJSON.date
                    var time = myJSON.time
                    var toSegments = myJSON.toSegments
                    var uploaderName = myJSON.uploaderName
                    var item = {head: head, text:notice, downloadURL:downURL,date:date,time:time, key:key, toSegments: toSegments, uploaderID:uploaderID,uploaderName:uploaderName}
                    var itemStr = JSON.stringify(item) + '<;>'
                    myArray = [...myArray, itemStr]
                }
              })
              await AsyncStorage.setItem('list_data', myArray.toString())
            }).then(() => {
                database()
                  .ref('Users/Teachers/' + uid).update({
                    newNotice: 0,
                  }).then(() => {
                    console.log('done')
                  })
            })
        }
      }
    } catch(e) {
        console.log('error: ', e)
    }
  }

  async onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }
  
  onIds(device) {
    console.log('Device info: ', device);
  }

  async checkingNewData() {
    console.log('In data Is Updating')
    try {
      var jsonValue = await AsyncStorage.getItem('User_Cred')
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue)
      if(jsonValue != null) {
        var user = JSON.parse(jsonValue).user
        var uid = JSON.parse(jsonValue).uid
        if(user == 'Student') {
            var newNotice
            database().ref('Users/Student/' + uid + '/newNotice').once('value', data => {
              console.log('newNotice: ', data)
              newNotice = data.val()
            }).then(async () => {
              if(newNotice == 1) {
                console.log('Student')
                var Class = JSON.parse(jsonValue).class 
                var year = JSON.parse(jsonValue).year
                var div = JSON.parse(jsonValue).div
                const tags = {
                  user: user,
                  department: Class,
                  class: year,
                  tag: year + '' + Class + '' + div,
                }
                console.log('tags:', tags)
                var classroom = year + '' + Class + '' + div
                if(Class == "C") {
                  Class += "o"
                } else if(Class == "E") {
                  Class += "n"
                } else if(Class == "M") {
                  Class += "e"
                } else {
                  console.log('Someting is worng')
                }
              jsonValue = await AsyncStorage.getItem('list_data')
              var myArray = []
                var ref = database().ref("notice/")
                ref.once("value", async (snapshot) => {
                  snapshot.forEach( (childSnapshot) => {
                    var myJSON=childSnapshot.toJSON()
                    var seg = myJSON.toSegments
                    if((myJSON.toSegments != null || myJSON.toSegments != undefined) && (seg.includes(user) || seg.includes(Class) || seg.includes(year) || seg.includes(classroom))) {
                      console.log(myJSON.toSegments)
                      
                      var key = myJSON.key
                      var head = myJSON.head
                      var notice = myJSON.text
                      var downURL = myJSON.downloadURL
                      var date = myJSON.date
                      var time = myJSON.time
                      var toSegments = myJSON.toSegments
                      var uploaderID = myJSON.uploaderID
                      var uploaderName = myJSON.uploaderName
                      
                      var item = {head: head, text:notice, downloadURL:downURL,date:date,time:time, key:key, toSegments: toSegments, uploaderID:uploaderID,uploaderName:uploaderName}
                
                        var itemStr = JSON.stringify(item) + '<;>'    
                        myArray = [...myArray, itemStr]
                    }
                  })
                  console.log(myArray)
                  await AsyncStorage.setItem('list_data', myArray.toString())
                }).then(() => {
                  database()
                    .ref('Users/Student/' + uid).update({
                      newNotice: 0,
                    }).then(() => {
                      console.log('done')
                    })
                })
              }
            })
        } else {
          console.log('Teacher')
          var newNotice = null
          database().ref('Users/Teachers/' + uid + '/newNotice/').once('value', data => {
            newNotice = data.val()
            console.log('data: ', data)
          }).then(() => {
            console.log(`${newNotice} == 1 => ${newNotice == 1}`)
            if(newNotice == 1) {
              var myArray = []
              var ref = database().ref("notice/")
              ref.once("value", async (snapshot) => {
                snapshot.forEach( (childSnapshot) => {
                  var myJSON=childSnapshot.toJSON()
                  if(myJSON.toSegments != null || myJSON.toSegments != undefined) {
                    console.log(myJSON.toSegments)
                      var key = myJSON.key
                      var head = myJSON.head
                      var notice = myJSON.text
                      var downURL = myJSON.downloadURL
                      var date = myJSON.date
                      var time = myJSON.time
                      var toSegments = myJSON.toSegments
                      var uploaderName = myJSON.uploaderName
                      var item = {head: head, text:notice, downloadURL:downURL,date:date,time:time, key:key, toSegments: toSegments, uploaderID:uploaderID,uploaderName:uploaderName}
                      var itemStr = JSON.stringify(item) + '<;>'
                      myArray = [...myArray, itemStr]
                  }
                })
                AsyncStorage.setItem('list_data', myArray.toString()).then(() => {
                  database()
                    .ref('Users/Teachers/' + uid).update({
                      newNotice: 0,
                    }).then(() => {
                      console.log('done')
                    })
                })
              })
            }
          })
        }
      }
    } catch(e) {
        console.log('error: ', e)
    }
  }

  render() {
    return ( 
      <MainRoute />
     )
  }
}