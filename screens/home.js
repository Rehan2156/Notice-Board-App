import React,{useState} from 'react';
import { Text, StyleSheet, View, Alert,FlatList,Button,TouchableOpacity,SafeAreaView,ScrollView  } from 'react-native'
import Tile from '../components/tile';
import {
    Header,
    Colors,
   
  } from 'react-native/Libraries/NewAppScreen';


const Home = ({navigation}) => {

    const [list,setList] = useState([
        {head:"Defaulter list",text:"All defaulter students are supposed to report in room no 403nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnnn yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy yyyyyyyyyyyyyyyyyyyyyyyyyyyy",key:'1'},
        {head:"Result announced",text:"SE results announced. Topper is Laukik Chavan. Everyone is requested to bring photocopy of results. jjjj jj j j j jjjjsgdhbsjbhgsbjbvjbvjvdjvndjnvjdnvjdnvjdvndjv",key:'2'},
        {head:'Holiday tomorrow1',text:'yeyy',key:'3'},
        {head:'Holiday tomorrow2',text:'yeyy',key:'4'},
        {head:'Holiday tomorrow3',text:'yeyy',key:'5'},
        {head:'Holiday tomorrow4',text:'yeyy',key:'6'},
        {head:'Holiday tomorrow5',text:'yeyy',key:'7'},
        {head:'Holiday tomorrow6',text:'yeyy',key:'8'},
        {head:'Holiday tomorrow7',text:'yeyy',key:'9'},
        {head:'Holiday tomorrow8',text:'yeyy',key:'10'},
        {head:'Holiday tomorrow9',text:'yeyy',key:'11'},
        {head:'Holiday tomorrow10',text:'yeyy',key:'12'},
        {head:'Holiday tomorrow11',text:'yeyy',key:'13'},
    ])

    

    return ( 
    
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
        <FlatList data={list} renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('Notice',item)}>
        <Tile title={item.head}/>
        </TouchableOpacity>
      )}/>
      </ScrollView>
    </SafeAreaView> );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
      },
    })

export default Home;