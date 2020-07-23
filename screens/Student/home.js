import React,{useState,useEffect} from 'react';
import { Text, StyleSheet,ActivityIndicator, View, Alert,FlatList,Button,TouchableOpacity,SafeAreaView,ScrollView  } from 'react-native'
import Tile from '../../components/tile';
import auth from '@react-native-firebase/auth';
import {
    Header,
    Colors,
   
  } from 'react-native/Libraries/NewAppScreen';
  import database from '@react-native-firebase/database';
  import OneSignal from 'react-native-onesignal';
  import AsyncStorage from '@react-native-community/async-storage';
  
const StudentHome = ({navigation,theme}) => {
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('User_Cred')
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue)
      if(jsonValue != null) {
          var prn = JSON.parse(jsonValue).prn
          var Class = JSON.parse(jsonValue).class 
          var year = JSON.parse(jsonValue).year
          var div = JSON.parse(jsonValue).div
          var user = JSON.parse(jsonValue).user

            this.setState({
                prn: prn,
                class: Class ? Class : '',
                year: year ? year : '',
                div: div ? div : '',
                user: user,
                editable: false,
            })
      }
    } catch(e) {
        console.log('error: ', e)
    }
  }


const [list,setList] = useState([])
const [classroom,setClassroom]=useState('')
const [user,setUser]=useState('')
const [timehaspassed,setTimehaspassed]=useState(false)
const [dep,setDep] = useState()
const [ye, setYe] = useState()

  useState(async () => {
    try {
      await database().setPersistenceCacheSizeBytes(2000000);
      const jsonValue = await AsyncStorage.getItem('User_Cred')
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue)
      if(jsonValue != null) {
          var prn = JSON.parse(jsonValue).prn
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
          setUser(user)
          setClassroom(classroom)
          
          if(Class == "C") {
            Class += "o"
          } else if(Class == "E") {
            Class += "n"
          } else if(Class == "M") {
            Class += "e"
          } else {
            console.log('Someting is worng')
          }

          setDep(Class)
          setYe(year)
          OneSignal.sendTags(tags)
      }
    } catch(e) {
        console.log('error: ', e)
    }
  })

  useEffect(() => {
    setTimeout(() => {
      var myArray = []
      var ref = database().ref("notice/");
      ref.once("value", (snapshot) => {
        console.log('hello')
        snapshot.forEach( (childSnapshot) => {
          var myJSON=childSnapshot.toJSON()
          if(myJSON.toSegments != null || myJSON.toSegments != undefined) {
            var seg = (myJSON.toSegments)
            if(seg.includes(user) || seg.includes(dep) || seg.includes(ye) || seg.includes(classroom) ){
              var key = myJSON.key
              var head = myJSON.head
              var notice = myJSON.text
              var downURL = myJSON.downloadURL
              var date = myJSON.date
              var time = myJSON.time
              myArray = [...myArray, {head: head, text:notice, downloadURL:downURL,date:date,time:time,key: key }]}
          }
        })
        setList(myArray.reverse());
        }).then( async () => {
          await database().goOffline()
        }) 
    }, 100000);
    })
    
    if(list.length==0){
      setTimeout(() => {setTimehaspassed(true)}, 10000)
      return(
        <View style={styles.container}>
        {!timehaspassed?
      <ActivityIndicator size="large" color="#84D7F7"/>:
      <View>
      <ActivityIndicator size="large" color="#84D7F7"/>
      <Text style={{fontFamily:'Nunito-Regular',fontSize:20}}>Check your Internet Connection</Text>
      </View>
      }
      </View>
      )
    }

    return ( 
    <View>
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}> */}
          {/* <Text>Class : {classroom}</Text> */}
        <FlatList data={list} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('Notice',item)}>
        <Tile title={item.head} date={item.date} time={item.time}/>
        </TouchableOpacity>
      )}/>
      {/* </ScrollView> */}
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

export default StudentHome;