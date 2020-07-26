import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity  } from 'react-native'
import Tile from '../../components/tile';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage'

const MyNotice = ({navigation}) => {

    const [list,setList] = useState([])
    const [upl,setUpl]=useState('')

    useEffect(() => {
      try {
        AsyncStorage.getItem('User_Cred').then( data => {
          setUpl(JSON.parse(data).uid)
          AsyncStorage.getItem('list_data').then(jsonValue => {
            if(jsonValue != null) {
              var myArray = jsonValue.split("<;>,")
              var myJSON = []
              myArray.forEach(e => {
                  e = e.replace('<;>', '')
                  var r = JSON.parse(e)
                  var uploader = JSON.parse(e).uploaderID
                  if(uploader == upl) {
                    myJSON = [...myJSON, r]
                  }
              })
              setList(myJSON.reverse());
            }
          })
        })
      } catch(e) {
          console.log('error: ', e)
      }
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
        <FlatList data={list} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('Notice',item)}>
        <Tile title={item.head} date={item.date} time={item.time}/>
        </TouchableOpacity>
      )}/>
     </View> 
    
    );
  }
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