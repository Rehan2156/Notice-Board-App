import React, { Component } from 'react'
import { Text, StyleSheet, View, Button,Dimensions,TouchableHighlight,ScrollView,ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin'

GoogleSignin.configure({
  webClientId: '1095803181729-plorjsc7202l5koepequdtv0apag1snb.apps.googleusercontent.com',
});

const width = Dimensions.get("window").width - 100
const height = Dimensions.get("window").height * 0.07

const {width:WIDTH}=Dimensions.get('window')
export default class LoginScreen extends Component {
    state = { 
        email: '', 
        password: '', 
        errorMessage: null,
        hidePass:true,
        loading:false,
        isSigninInProgress: false,
        wantTouseEmail: false,
    }

    handleLogin = () => {
      this.setState({loading:true})
        console.log('handleLogin')
        auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            console.log('loged in')
            this.setState({loading:false})
          })
          .catch(error => this.setState({ errorMessage: error.message }))
    }

    onGoogleButtonPress = async () => {
      this.setState({ loading: true, isSigninInProgress: true })
      const { idToken, user } = await GoogleSignin.signIn();
      this.setState({ email: user.email })
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    }
    
    render() {
      if(!this.state.loading){
        return (
          // <View style={{height:'100%'}}>
            <ScrollView>
            <View style={styles.container}>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
            {!this.state.wantTouseEmail ? 
        
              <TouchableHighlight style={styles.myBtn} onPress={() => { this.setState({ wantTouseEmail: true }) }}>
                <Text style={styles.btnText}> Login With Email </Text>
              </TouchableHighlight>
              :
              <View>
                <View style={styles.inputContainer}>
                  <Icon name={'envelope'} size={22} color="#808080" style={styles.inputIcon}/>
                  <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                  />
                </View>  
                <View style={styles.inputContainer}>
                  <Icon name={'lock'} size={25} color="#808080" style={styles.inputIcon}/>
                  <TextInput
                    secureTextEntry={this.state.hidePass}
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                  />
                  <Icon name={this.state.hidePass?'eye-slash':'eye'} size={25} color="#808080" style={styles.eyeIcon} onPress={()=>this.setState({hidePass:!this.state.hidePass})}/>
                </View>
            
                <TouchableHighlight style={styles.myBtn} onPress={this.handleLogin}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableHighlight>
              </View>
            }

            <GoogleSigninButton
                    style={{ width: width, height: height, marginTop: 20, }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => this.onGoogleButtonPress().then(() => {
                        console.log('Signed in with Google!')
                        this.setState({loading:false, isSigninInProgress: false})
                    })}
                    disabled={this.state.isSigninInProgress} 
            />

            <TouchableOpacity style={styles.navBtn} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.navText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
            </View>

          </ScrollView>
          // </View>
        )
            }
            else{
              return(
                <View style={styles.loading}>
                  <Text> Loading Please Wait ... </Text>
                    <ActivityIndicator size = 'large'/>
                </View>
              )
            }
    }
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      justifyContent:'center',
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
        marginTop:'20%',
        marginBottom:'30%'
    },
    textInput: {
      justifyContent:'center',
      width: '90%',
    // height:55,
    borderRadius:5,
    fontSize:16,
    // paddingLeft:45,
    // backgroundColor:'rgba(0,0,0,0.35)',
    // color:'rgba(255,255,255,0.7)',
    // marginHorizontal:25,
    fontFamily:'Nunito-Bold',
    borderColor:'black',
    borderWidth:1,
    padding:10,
    margin:20,
    paddingLeft:45,
    paddingRight:45
    },
    myBtn: {
      // width:WIDTH - 55,
      height:45,
      borderRadius:25,
      backgroundColor:'#84D7F7',
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
    navBtn: {
      padding: 14,
      alignItems: 'center',
      marginTop: 20,
    },
    navText: {
      fontSize: 18,
      fontFamily:'Nunito-Bold',
      color: '#84D7F9',
    },
    inputIcon:{
      position:'absolute',
      top:30,
      left:28
    },
    eyeIcon:{
      position:'absolute',
      top:30,
      left:250
    },
    // inputContainer:{
    //   flex:1,
    // flexDirection:'row'
    // }
    loading: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

