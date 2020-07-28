import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Dimensions, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome'
import { GoogleSignin, statusCodes, } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import SlpashScreen from '../../components/SlpashScreen';

const width = Dimensions.get('screen').width
const heigth = Dimensions.get('screen').height

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
        return(<SlpashScreen head="Registering" /> )
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
                  if( this.state.employeeId != '' ) {
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
                  } else {
                    Alert.alert('Employee ID is Compulsory please fill it')
                  }
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
      borderRadius: 10,
      elevation: 3,
      backgroundColor: '#fff',
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: width * 0.05,
      marginVertical: heigth * 0.15,
      padding: heigth * 0.013,
    },    
    inputContainer: {
      justifyContent: 'center',
      position: 'relative',
      borderColor: 'black',
      borderWidth: 1.2,
      marginVertical: heigth * 0.04,
      borderRadius: 5,
    },
    textInput: {
      width: '90%',
      height: heigth * 0.065,
      fontSize: heigth * 0.025,
      fontFamily: 'Nunito-Bold',
      padding: heigth * 0.01,
      paddingLeft: heigth * 0.07,
      paddingRight: heigth * 0.02,
      textAlignVertical: 'center'
    },
    inputIcon:{
      position: 'absolute',
      paddingLeft: heigth * 0.009,
    },
    googleBtn: {
      width: '100%',
      marginVertical: heigth * 0.04,
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
        padding: heigth * 0.013,
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
        fontSize: heigth * 0.023,
        color: '#111',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginLeft: heigth * 0.03,
    },
  })

