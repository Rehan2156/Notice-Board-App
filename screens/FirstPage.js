import React, { Component } from 'react'
import { Text, StyleSheet, View, Button,Image,Dimensions,TouchableOpacity,ImageBackground } from 'react-native'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

const {width:WIDTH}=Dimensions.get('window')

export default class FirstPage extends Component {

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if(user) {
        console.log('is Logged in')
        var uid = auth().currentUser.uid      
        this.checkingWhereToGo(uid)
      }
    })
  }

  checkingWhereToGo = async (uid) => {
    if (await (await database().ref('Users/Student/' + uid + '/').once('value')).exists()) {
      console.log('Student')
      this.props.navigation.navigate('Student')
    } else {
      console.log('Teacher')
      this.props.navigation.navigate('Teacher')
    }
  }

    render() {
        return (
            <ImageBackground style={styles.body} source={{uri:'https://cdn02.plentymarkets.com/epz0zx1qug71/item/images/131242/full/rasch--Tapete--Aqua--Relief--Satintapete--210309--.jpg'}}>
            <Image style ={styles.img} source={require('../assets/fonts/img/mes_logo.png')} />
            <Text style={styles.head}>Modern Education Society's College of Engineering</Text>
            <Text style={styles.headApp}>NOTICE BOARD APP</Text>
            <ImageBackground style={styles.container} imageStyle={{ borderTopRightRadius:50,borderTopLeftRadius:50,}} source={{uri:'https://image.made-in-china.com/202f0j00tdlQmYLFCIuS/Plain-Designs-Wallpaper-for-Wall-Coating.jpg'}}>
                {/* <Button 
                    title = 'Student'
                    onPress = {() => {
                        this.props.navigation.navigate('Student')
                    }}
                /> */}
                <TouchableOpacity 
                  style={styles.myBtn} 
                  onPress = { () => {
                    this.props.navigation.navigate('Student')
                  }}
                >
                  {/* <Icon name={'logo-google'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.gIcon}/> */}
                  <Text style={styles.btnText} > I am a Student </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.myBtn} 
                  onPress = { () => {
                    this.props.navigation.navigate('Teacher')
                  }}
                >
                  {/* <Icon name={'logo-google'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.gIcon}/> */}
                  <Text style={styles.btnText} > I am a Faculty Member </Text>
                </TouchableOpacity>
                
            </ImageBackground>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    body:{
        // backgroundColor:'#A3DDF1',
        height:'100%'
        
    },
    head:{
        textAlign:'center',
        fontSize:25,
        fontFamily:'Lato-Bold',
        paddingBottom:40,
        color:'#1C2837'
    },
    headApp:{
        textAlign:'center',
        fontSize:35,
        fontFamily:'Amiri-Bold',
        paddingBottom:30,
        color:'#465362',
        paddingLeft:10,
        paddingRight:10
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignContent: 'center',
        // alignItems: 'center',
        // backgroundColor:'#EAEBEC'
        justifyContent:'flex-end',
        paddingBottom:50,
        backgroundColor:"#b1a296",
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // marginHorizontal: 4,
    // marginVertical: 6,
    elevation:12
    },
    img:{
        // alignContent:'center',
        // justifyContent:'center',
        // alignItems:'center',
        alignSelf:'center',
    },
    myBtn: {
        width:WIDTH - 55,
        height:45,
        borderRadius:25,
        backgroundColor:'#06BEE1',
        justifyContent:'center',
        marginTop:20,
        marginHorizontal:25,
      },
      btnText: {
        fontSize: 20,
        textAlign:'center',
        color: '#fff',
        // fontWeight:'bold',
        fontFamily:'Nunito-Bold'
    
      }, 
})
