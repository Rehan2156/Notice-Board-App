import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity  } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';


const About = () => {

    

    return ( 
      <View>
          <Text>About page</Text>
      </View> 
    );
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

export default About;