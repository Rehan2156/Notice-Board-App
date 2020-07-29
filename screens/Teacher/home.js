import React,{ useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity  } from 'react-native'
import Tile from '../../components/tile';
import { Colors, } from 'react-native/Libraries/NewAppScreen';
import database from '@react-native-firebase/database';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage'
import SlpashScreen from '../../components/SlpashScreen';

const TeacherHome = ({navigation}) => {

  const [list,setList] = useState([])
  const [timehaspassed,setTimehaspassed]=useState(false)
  
  useEffect(() => {
    try {
      AsyncStorage.getItem('list_data').then( myList => {
        if(myList == null) { 
          AsyncStorage.getItem('User_Cred').then( jsonValue => {
            jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(jsonValue)
            if(jsonValue != null) {
              var user = JSON.parse(jsonValue).user
              var uid = JSON.parse(jsonValue).uid
              const tags = {
                user: user,
              }
            console.log('tags:', tags)
            OneSignal.sendTags(tags)
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
                  var uploaderID = myJSON.uploaderID
                  var uploaderName = myJSON.uploaderName
                  var item = {head: head, text:notice, downloadURL:downURL,date:date,time:time, key:key, toSegments: toSegments, uploaderID:uploaderID,uploaderName:uploaderName}
                  var itemStr = JSON.stringify(item) + '<;>'
                  myArray = [...myArray, itemStr]
                }
              })
              AsyncStorage.setItem('list_data', myArray.toString())
            }).then(() => {
              database()
                  .ref('Users/Teachers/' + uid).update({
                    newNotice: 0,
                  }).then(() => {
                    console.log('done')
                  })
            })
            }
          })
        } else {
          AsyncStorage.getItem('list_data').then(jsonValue => {
            if(jsonValue != null) {
              var myArray = jsonValue.split("<;>,")
              var myJSON = []
              myArray.forEach(e => {
                  e = e.replace('<;>', '')
                  var r = JSON.parse(e)
                  myJSON = [...myJSON, r]
              })
              setList(myJSON.reverse());
            }
          })
        }
      })
    } catch(e) {
        console.log('error: ', e)
    }
  })
      
  if(list.length==0){
    setTimeout(() => {setTimehaspassed(true)}, 10000)
    return ( <SlpashScreen  head="Loading Notices"/> )
  }

  return ( 
  <View>
      <FlatList data={list} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
      <TouchableOpacity onPress={()=>navigation.navigate('Notice',item)}>
      <Tile title={item.head} date={item.date} time={item.time}/>
      </TouchableOpacity>
    )}/>
    </View> 
  
  );
}

export default TeacherHome;