import React, { Component } from 'react'
import { Text, StyleSheet ,Image ,Dimensions ,TouchableOpacity ,ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import SlpashScreen from '../components/SlpashScreen';

const width = Dimensions.get('screen').width
const heigth = Dimensions.get('screen').height

export default class FirstPage extends Component {
  state = {
    user: '',
    loading : true,
    backgrounImage1: null,
    backgrounImage2: null,
    logo: null,
  }

  componentDidMount() {
    this.setState({
      backgrounImage1: require('../assets/img/bgImage1.png'),
      backgrounImage2: require('../assets/img/bgImage2.png'),
      logo: require('../assets/img/mes_logo1.png')
    })
    setTimeout(() => {
      console.log('is Logged in') 
      try {
        AsyncStorage.getItem('User_Cred').then( jsonValue => {
          jsonValue != null ? JSON.parse(jsonValue) : null;
          console.log('User_cred: ', jsonValue)
          if(jsonValue != null) {
              var user =  JSON.parse(jsonValue).user 
              this.props.navigation.navigate(user)
          }
        })
      } catch(e) {
          console.log('error: ', e)
      }
      this.setState({ loading: false })
    }, 2500)
  }

  render() {

    if(this.state.loading) {
      return <SlpashScreen head="Starting" />
    }

      return (
          <ImageBackground style={styles.body} source={this.state.backgrounImage1}>
          <Image style ={styles.img} source={this.state.logo} />
          <Text style={styles.head}>Modern Education Society's College of Engineering</Text>
          <Text style={styles.headApp}>NOTICE BOARD APP</Text>
          <ImageBackground style={styles.container} imageStyle={{ borderTopRightRadius:50,borderTopLeftRadius:50,}} source={this.state.backgrounImage2}>
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
        fontSize: heigth * 0.026,
        fontFamily:'Lato-Bold',
        paddingBottom: heigth * 0.002,
        paddingTop: heigth * 0.015,
        color:'#1C2837'
    },
    headApp:{
        textAlign:'center',
        fontSize: heigth * 0.035,
        fontFamily:'Amiri-Bold',
        color:'#465362',
        paddingBottom: heigth * 0.013,
        paddingLeft: width * 0.08,
        paddingRight: width * 0.08
    },
    container: {
      flex: 1,
      justifyContent:'center',
      paddingBottom: heigth * 0.08,
      backgroundColor:"#b1a296",
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation:12
    },
    img:{
      marginTop: heigth * 0.007,
      width: width * 0.4,
      height: heigth * 0.28,
      alignSelf:'center',
    },
    myBtn: {
      width: width * 0.92,
      height: heigth * 0.065,
      borderRadius:25,
      backgroundColor:'#06BEE1',
      justifyContent:'center',
      marginHorizontal: width * 0.05,
      marginTop: heigth * 0.04,
    },
    btnText: {
      fontSize: heigth * 0.028,
      textAlign:'center',
      color: '#fff',
      fontFamily:'Nunito-Bold'
    }, 
})
