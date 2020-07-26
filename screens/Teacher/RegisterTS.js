import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, ActivityIndicator, Modal } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome'
import { GoogleSignin, statusCodes, } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

export default class RegisterTS extends Component {
    state = { 
        email: '', 
        name: '',
        employeeId: '',
        errorMessage: null,
        loading:false ,
        isSigninInProgress: false,
        editable: true
    }

    componentDidMount() {
      GoogleSignin.configure({
          webClientId: "1095803181729-plorjsc7202l5koepequdtv0apag1snb.apps.googleusercontent.com", // client ID of type WEB for your server(needed to verify user ID and offline access)
          offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
          forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      });

      console.log('data stored')
      this.getData()
    }

    storeData = async ( value ) => {
      try {
          console.log('Store data')
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('User_Cred', jsonValue)
        } catch (e) {
          console.log('error: ', e)
        }
    }

  getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('User_Cred')
        jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(jsonValue)
        if(jsonValue != null) {
            var employeeId = JSON.parse(jsonValue).employeeId
            var email = JSON.parse(jsonValue).email
            var user = JSON.parse(jsonValue).user
            var name = JSON.parse(jsonValue).name        

            this.setState({
                employeeId: employeeId,
                editable: false
            })

            console.log(employeeId)
        }
      } catch(e) {
          console.log('error: ', e)
      }
    }

    render() {

      if(this.state.loading) {
        return(
            <Modal
            animationType="slide"
            transparent={false}
            visible={true}
            onRequestClose={() => {
                //   Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.containerR}>
                <Text style={{fontFamily:'Nunito-Regular',fontSize:15}}>Registering</Text>
                <Text style={{fontFamily:'Nunito-Regular',fontSize:15}}>Please Wait</Text>
                <ActivityIndicator size='large' />
                </View>
                </Modal>
        )
    }
    
        return (
            <ScrollView>
            <View style={styles.container}>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <View style={styles.inputContainer}>
                  <Icon name={'id-card'} size={25} color="#808080" style={styles.inputIcon}/>
                    <TextInput
                        placeholder="Employee Id"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={employeeId => this.setState({ employeeId })}
                        value={this.state.employeeId}
                        editable = { this.state.editable }
                    />
                </View>

          <TouchableOpacity 
                style={ styles.googleBtn }
                onPress={async () => {
                    this.setState({ loading: true, isSigninInProgress: true })
                    try {
                    await GoogleSignin.hasPlayServices();
                    const info = await GoogleSignin.signIn();
                    const googleCredential = auth.GoogleAuthProvider.credential(info.idToken);
                    await auth().signInWithCredential(googleCredential).then(() => {
                        console.log('Sign in with google !')
                        if( this.state.editable != false ) {
                          console.log(auth().currentUser.uid)
                          console.log(this.state.employeeId)
                          console.log(info.user.email)
                          console.log(info.user.name)

                          var myValue = {
                            employeeId: this.state.employeeId,
                            email: info.user.email,
                            user: 'Teacher',
                            name: info.user.name,
                            uid: auth().currentUser.uid,            
                          }

                          database().ref('Users/Teachers/'+ auth().currentUser.uid).set({
                              employeeId: this.state.employeeId,
                              email: info.user.email,
                              user: 'Teacher',
                              name: info.user.name
                          })

                          this.storeData(myValue)
                        }
                    })
                  } catch (error) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                      console.log('Cancel: ' + error )
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                      console.log('InProgress: ' + error)
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                      console.log('Play Services:' + error )
                    } else {
                      console.log('Other:' + error)
                    }
                  }           
                  this.setState({ loading: false, isSigninInProgress: false })
                }}
            >
                <View style={ styles.googlePack }>
                <Icon  name={'google'} size={30} color={'#fff'} style={ styles.googleIcon } />
                <Text style={ styles.googleText } > Sign in with Google </Text>
                </View>
            </TouchableOpacity>
      </View>
      </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
      containerR: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
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
      loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      googleBtn: {
        width: '100%',
        margin: 25,
        alignSelf: 'center',
        textAlignVertical: 'center',
        borderColor: '#4285F4',
        borderWidth: 2,
        borderRadius: 10,
      },
      googlePack: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
      },
      googleIcon: {
          padding: 10,
          display: 'flex',
          alignSelf: 'flex-start',
          textAlignVertical: 'center',
          backgroundColor: '#4285F4',
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          borderWidth: 1,
          borderColor: '#4285F4',
      },
      googleText:{
          fontSize: 16,
          color: '#111',
          fontWeight: 'bold',
          textAlignVertical: 'center',
          marginLeft: 30,
      },
  })

