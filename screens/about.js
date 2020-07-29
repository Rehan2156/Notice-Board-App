import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, View, ScrollView, Image, Dimensions  } from 'react-native'

const width = Dimensions.get('screen').width
const heigth = Dimensions.get('screen').height

const About = () => {

    return ( 
        <View style={styles.card}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            {/* <Text style={styles.head}></Text> */}
            <Text style={[styles.text],{fontFamily:'Nunito-Bold',fontSize: heigth * 0.02}}>Note : You are using the Beta Version of the app. Notices send to you are not official and only for the purpose of testing.</Text>
            <Text style={{fontFamily:'Nunito-Bold',fontSize: heigth * 0.024 ,paddingTop: heigth * 0.02}}>Purpose:</Text>
            <Text style={[styles.text]}>Faculty members can send notices to particular classes, department or everyone. Faculty can view their previously uploaded notices in My Notices Section. </Text>
            <Text style={styles.text}>Student will receive a notification on their smartphones once faculty uploads a notice.</Text>
            <Text style={styles.text}>The time and date of the notice and the name of the faculty member are visible. Students can view the notices and also download the attached file in the notice.</Text>
            <View style={styles.tech}>
            <Text style={{fontFamily:'Nunito-Bold',fontSize: heigth * 0.024,paddingBottom: heigth * 0.02}}>Technology Stack:</Text>
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
            <Text style={{fontFamily:'Nunito-Bold',fontSize:heigth * 0.024,paddingBottom: heigth * 0.02}}>Developed by:</Text>
            <View style={styles.rowAlign}>
            <Text style={[styles.techPoint,{paddingTop: heigth * 0.025, marginHorizontal: heigth * 0.001}]}>Rehan Shaikh</Text>
            <Text style={[styles.techPoint,{paddingTop: heigth * 0.025}]}>Laukik Chavan</Text>
            </View>
            <Text style={{fontFamily:'Nunito-Regular',textAlign:'center',paddingVertical: heigth * 0.025 }}>~ TE COMP 2, MESCOE</Text>
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
        marginHorizontal: heigth * 0.005,
        marginVertical: heigth * 0.02,
        padding: heigth * 0.02,
        marginLeft: heigth * 0.03,
        marginRight: heigth * 0.03,
        marginTop: heigth * 0.027,
        marginBottom: heigth * 0.027
      },
      text:{
          fontFamily:'Nunito-Regular',
          marginHorizontal: heigth * 0.01,
          paddingTop: heigth * 0.018,
          fontSize: heigth * 0.02
      },
      tech:{
        marginHorizontal: heigth * 0.001,
        paddingTop: heigth * 0.018,
      },
      techPoint:{
        fontFamily:'Acme-Regular',
        marginHorizontal: heigth * 0.03,
        fontSize: heigth * 0.022,
        paddingBottom: heigth * 0.002,
        paddingTop: heigth * 0.04      
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