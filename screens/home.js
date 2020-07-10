import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, View, Alert,FlatList,Button,TouchableOpacity,SafeAreaView,ScrollView  } from 'react-native'
import Tile from '../components/tile';
import {
    Header,
    Colors,
   
  } from 'react-native/Libraries/NewAppScreen';
  import database from '@react-native-firebase/database';


const Home = ({navigation}) => {

    const [list,setList] = useState([
        {head:"Defaulter list",text:"All defaulter students are supposed to report in room no 403nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnnn yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy yyyyyyyyyyyyyyyyyyyyyyyyyyyy",key:'1'},
        {head:"Result announced",text:"SE results announced. Topper is Laukik Chavan. Everyone is requested to bring photocopy of results. jjjj jj j j j jjjjsgdhbsjbhgsbjbvjbvjvdjvndjnvjdnvjdnvjdvndjv",key:'2'},
        {head:'Holiday tomorrow1',text:'yeyy',key:'3'},
        
    ])

    useEffect(() => {
        var myArray = []
    try {
      var ref = database().ref("/notice");
      ref.once("value", (snapshot) => {
        snapshot.forEach( (childSnapshot) => {
            var myJSON=childSnapshot.toJSON()
          var key = myJSON.key
          var head = myJSON.head
          var notice = myJSON.text
          myArray = [...myArray, {head: head, text:notice, key: key }]
        
        })
    
        //   this.setState({
        //     shops: [...this.state.shops, ...myArray],
        //   })

        //   this.setState({
        //     tempArray: this.state.shops,
        //     lisIsready: true,
        //   })
        setList(myArray.reverse());
      })
    } catch(e) {
      console.log('Error: aya bro :', e)
    }
        
    })

    return ( 
    
    <View>
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}> */}
        <FlatList data={list} renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('Notice',item)}>
        <Tile title={item.head}/>
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
    })

export default Home;