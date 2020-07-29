import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity,ScrollView,Image  } from 'react-native'



const About = () => {

    

    return ( 
        <View style={styles.card}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            {/* <Text style={styles.head}></Text> */}
            <Text style={[styles.text],{fontFamily:'Nunito-Bold',fontSize:20}}>Note : You are using the Beta Version of the app. Notices send to you are not official and only for the purpose of testing.</Text>
            <Text style={{fontFamily:'Nunito-Bold',fontSize:20,paddingTop:20}}>Purpose:</Text>
            <Text style={[styles.text]}>Faculty members can send notices to particular classes, department or everyone. Faculty can view their previously uploaded notices in My Notices Section. </Text>
            <Text style={styles.text}>Student will receive a notification on their smartphones once faculty uploads a notice.</Text>
            <Text style={styles.text}>The time and date of the notice and the name of the faculty member are visible. Students can view the notices and also download the attached file in the notice.</Text>
            <View style={styles.tech}>
            <Text style={{fontFamily:'Nunito-Bold',fontSize:20,paddingBottom:5}}>Technology Stack:</Text>
            <View style={styles.rowAlign}>
            <Image style ={styles.img} source={require('../assets/img/react-icon.png')} />
            <Text style={styles.techPoint}>React Native</Text>
            </View>
            <View style={styles.rowAlign}>
            <Image style ={styles.img} source={require('../assets/img/firebase-logo.png')} />
            <Text style={styles.techPoint}>Firebase</Text>
            </View>
            <View style={styles.rowAlign}>
            <Image style ={styles.img} source={require('../assets/img/s3-logo.png')} />
            <Text style={styles.techPoint}>Amazon S3</Text>
            </View>
            </View>
            <View style={styles.tech}>
            <Text style={{fontFamily:'Nunito-Bold',fontSize:20,paddingBottom:5}}>Developed by:</Text>
            <View style={styles.rowAlign}>
            <Text style={[styles.techPoint,{paddingTop:20,marginHorizontal:10}]}>Rehan Shaikh</Text>
            <Text style={[styles.techPoint,{paddingTop:20}]}>Laukik Chavan</Text>
            </View>
            <Text style={{fontFamily:'Nunito-Regular',textAlign:'center',paddingTop:20}}>~ TE COMP 2, MESCOE</Text>
            </View>
            </ScrollView>
        </View> 
    );
  }


const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding:15,
        marginLeft:30,
        marginRight:30,
        marginTop:20,
        marginBottom:20
      },
      head:{
      textAlign:'left',
      fontFamily:'Nunito-Bold',
      marginHorizontal: 18,
      fontSize:25,
      borderBottomWidth:0.5,
      paddingBottom:30
  
      },
      text:{
          fontFamily:'Nunito-Regular',
          marginHorizontal: 18,
          paddingTop:30,
          fontSize:20
      },
      tech:{
        marginHorizontal: 18,
        paddingTop:30,
      },
      techPoint:{
        fontFamily:'Acme-Regular',
        marginHorizontal: 18,
        fontSize:20,
        paddingBottom:8,
        paddingTop:30      
    },
    img:{
        width:100,
        height:100
    },
    rowAlign:{
        flex:1,
        flexDirection:'row',
    },
    })

export default About;