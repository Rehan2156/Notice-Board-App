import React,{useState} from 'react';
import { Text, StyleSheet, View, Alert,FlatList,Button,TouchableOpacity  } from 'react-native'
import Tile from '../components/tile';


const Home = ({navigation}) => {

    const [list,setList] = useState([
        {head:"defaulter list",text:"All defaulter students are supposed to report in room no 403",key:'1'},
        {head:"result announced",text:"SE results announced",key:'2'}
    ])

    

    return ( <View>
        <Button
            // onPress={()=>navigation.navigate('Notice')}
            title="Add post"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
        <FlatList data={list} renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('Notice',item)}>
        <Tile title={item.head}/>
        </TouchableOpacity>
      )}/>
    </View> );
}
 
export default Home;