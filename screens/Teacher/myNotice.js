import React,{useState,useEffect} from 'react';
import { Text, StyleSheet,ActivityIndicator, View, Alert,FlatList,Button,TouchableOpacity,SafeAreaView,ScrollView  } from 'react-native'
import Tile from '../../components/tile';
import auth from '@react-native-firebase/auth';
import {
    Header,
    Colors,
   
  } from 'react-native/Libraries/NewAppScreen';
  import database from '@react-native-firebase/database';
  
const MyNotice = ({navigation}) => {
  

    const [list,setList] = useState([
        // {head:"Defaulter list",text:"All defaulter students are supposed to report in room no 403nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnnn yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy yyyyyyyyyyyyyyyyyyyyyyyyyyyy",key:'1'},
        // {head:"Result announced",text:"SE results announced. Topper is Laukik Chavan. Everyone is requested to bring photocopy of results. jjjj jj j j j jjjjsgdhbsjbhgsbjbvjbvjvdjvndjnvjdnvjdnvjdvndjv",key:'2'},
        // {head:'Holiday tomorrow1',text:'yeyy',key:'3'},
        
    ])
    const [load,setLoad]=useState(0)
    const [upl,setUpl]=useState('')
    const [user,setUser]=useState('')

    useEffect(() => {
        var myArray = []
      setUpl(auth().currentUser.uid)

    // try {
      var ref = database().ref("/notice");
      // setLoad(1)
      ref.once("value", (snapshot) => {
        snapshot.forEach( (childSnapshot) => {
            var myJSON=childSnapshot.toJSON()
            var uploader = myJSON.uploaderID
            if(uploader==upl){
          var key = myJSON.key
          var head = myJSON.head
          var notice = myJSON.text
          var downURL = myJSON.downloadURL
          var date = myJSON.date
          var time = myJSON.time
          myArray = [...myArray, {head: head, text:notice, downloadURL:downURL,date:date,time:time,key: key }]
            }
        
        })
        setList(myArray.reverse());
      }).then(()=>{
        // setLoad(0)
      }
    );
    // } catch(e) {
    //   console.log('Error: aya bro :', e)
    // }
    })
    
    if(list.length==0)
    {
        return(
            <View><Text style={styles.empty}>You have not sent any notices yet</Text></View>
        )
    }
    else{
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
        // }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
      },
      empty:{
          textAlign:'center',
          fontFamily:'Nunito-Bold',
          fontSize:20,
      }
    })

export default MyNotice;