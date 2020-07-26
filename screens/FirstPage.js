import React, { Component } from 'react'
import { Text, StyleSheet ,Image ,Dimensions ,TouchableOpacity ,ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width
const heigth = Dimensions.get('window').height

export default class FirstPage extends Component {
  state = {
    user: ''
  }

  componentDidMount() {
    console.log('is Logged in') 
    this.checkingWhereToGo()
  }

  checkingWhereToGo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('User_Cred')
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('User_cred: ', jsonValue)
      if(jsonValue != null) {
          var user =  JSON.parse(jsonValue).user 
          this.props.navigation.navigate(user)
      }
    } catch(e) {
        console.log('error: ', e)
    }
  }

    render() {
        return (
            <ImageBackground style={styles.body} source={require('../assets/img/bgImage1.png')}>
            <Image style ={styles.img} source={require('../assets/img/mes_logo1.png')} />
            <Text style={styles.head}>Modern Education Society's College of Engineering</Text>
            <Text style={styles.headApp}>NOTICE BOARD APP</Text>
            <ImageBackground style={styles.container} imageStyle={{ borderTopRightRadius:50,borderTopLeftRadius:50,}} source={require('../assets/img/bgImage2.png')}>
                <TouchableOpacity 
                  style={styles.myBtn} 
                  onPress = { () => {
                    this.props.navigation.navigate('Student')
                  }}
                >
                  <Text style={styles.btnText} > I am a Student </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.myBtn} 
                  onPress = { () => {
                    this.props.navigation.navigate('Teacher')
                  }}
                >
                  <Text style={styles.btnText} > I am a Faculty Member </Text>
                </TouchableOpacity>
            </ImageBackground>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    body:{
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
      justifyContent:'center',
      paddingBottom:50,
      backgroundColor:"#b1a296",
      borderTopRightRadius:50,
      borderTopLeftRadius:50,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation:12
    },
    img:{
      width: width * 0.4,
      height: heigth * 0.28,
      alignSelf:'center',
    },
    myBtn: {
      width:width - 55,
      height:50,
      borderRadius:25,
      backgroundColor:'#06BEE1',
      justifyContent:'center',
      marginTop:20,
      marginHorizontal:25,
      marginTop: 35,
    },
    btnText: {
      fontSize: 23,
      textAlign:'center',
      color: '#fff',
      fontFamily:'Nunito-Bold'
    }, 
})
