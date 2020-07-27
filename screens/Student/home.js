import React,{useState,useEffect} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity  } from 'react-native'
import Tile from '../../components/tile';
import database from '@react-native-firebase/database';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import SlpashScreen from '../../components/SlpashScreen';

const StudentHome = ({navigation,theme}) => {
const [list,setList] = useState([])
const [timehaspassed,setTimehaspassed]=useState(false)
const [isDone, setIsDone] = useState(0)

  useEffect(() => {
    try {
      AsyncStorage.getItem('list_data').then( myList => {
        if(myList == null) { 
          AsyncStorage.getItem('User_Cred').then( jsonValue  => {
            console.log(jsonValue)
            if(jsonValue != null) {
              var Class = JSON.parse(jsonValue).class 
              var year = JSON.parse(jsonValue).year
              var div = JSON.parse(jsonValue).div
              var user = JSON.parse(jsonValue).user
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
              OneSignal.sendTags(tags)
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
                      var item = {head: head, text:notice, downloadURL:downURL,date:date,time:time, key:key, toSegments: toSegments, uploaderID:uploaderID}
                      var itemStr = JSON.stringify(item) + '<;>'
                      myArray = [...myArray, itemStr]
                  }
                })
                AsyncStorage.setItem('list_data', myArray.toString())
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
      
  if(list.length==0) {
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
      container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      },  
    })

export default StudentHome;