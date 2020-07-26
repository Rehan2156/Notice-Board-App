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
  const [isDone, setIsDone] = useState(0)

  useEffect(() => {
    if(isDone == 0) {
      try {
        AsyncStorage.getItem('User_Cred').then( jsonValue => {
          jsonValue != null ? JSON.parse(jsonValue) : null;
          console.log(jsonValue)
          if(jsonValue != null) {
            var user = JSON.parse(jsonValue).user
            const tags = {
            user: user,
          }
          console.log('tags:', tags)
          OneSignal.sendTags(tags)
          setIsDone(1)
            AsyncStorage.getItem('list_data').then( myList => {
              if(myList == null) { 
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
                      var item = {head: head, text:notice, downloadURL:downURL,date:date,time:time, key:key, toSegments: toSegments, uploaderID:uploaderID}
                      var itemStr = JSON.stringify(item) + '<;>'
                      myArray = [...myArray, itemStr]
                    }
                  })
                  AsyncStorage.setItem('list_data', myArray.toString()).then(() => {
                    setIsDone(1)
                  })
                })
              }
            })
          }
        })
      } catch(e) {
          console.log('error: ', e)
      }
    }
  })
  
    useEffect(() => {
      try {
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

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      },  
    })

export default TeacherHome;