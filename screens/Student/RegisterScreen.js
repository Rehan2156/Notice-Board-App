import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,ActivityIndicator, Dimensions, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

export default class RegisterScreen extends Component {
    state = { 
        email: '', 
        password: '', 
        prn: '',
        classAndYear: '',
        errorMessage: null ,
        loading:false,
        class: '',
        year: '',
        div: '',
        dataClass: [{label: 'Computer', value: 'C'}, {label: 'EnTC', value: 'E'}, {label: 'Mechanical', value: 'M'}],
        dataYear: [{label: 'FE', value: 'FE'},{label: 'SE', value: 'SE'},{label: 'TE', value: 'TE'},{label: 'BE', value: 'BE'}],
        dataDiv: [{label: '1', value: '1'},{label: '2', value: '2'},{label: 'SS', value: 'SS'}],
        isSigninInProgress: false,
        wantTouseEmail: false,
        editable: true,
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
              var prn = JSON.parse(jsonValue).prn
              var Class = JSON.parse(jsonValue).class 
              var year = JSON.parse(jsonValue).year
              var div = JSON.parse(jsonValue).div
              var user = JSON.parse(jsonValue).user

                this.setState({
                    prn: prn,
                    class: Class ? Class : '',
                    year: year ? year : '',
                    div: div ? div : '',
                    user: user,
                    editable: false,
                })
          }
        } catch(e) {
            console.log('error: ', e)
        }
      }

    render() {
        if(!this.state.loading){
        return (
            <ScrollView>
            <View style={styles.container}>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}

                <View style={styles.inputContainer}>
                    <Icon name={'id-card'} size={23} color="#808080" style={styles.inputIcon}/>
                        <TextInput
                            placeholder="PRN Number"
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={prn => this.setState({ prn })}
                            value={this.state.prn}
                            editable = { this.state.editable}
                        />
                </View>
                
                <View style={styles.dropdown}>
                    <DropDownPicker 
                        placeholder = "Branch"
                        items={this.state.dataClass}
                        defaultIndex={0}
                        defaultValue = { this.state.class }
                        containerStyle={{height: 40}}
                        onChangeItem={item => {
                            console.log(item.label, item.value)
                            this.setState({
                                class: item.value
                            })
                        }}      
                        style={styles.picker}          
                        disabled = { !this.state.editable  }    
                    />
                    <DropDownPicker 
                        placeholder = "Year"
                        items={this.state.dataYear}
                        defaultValue = { this.state.year }
                        defaultIndex={1}
                        containerStyle={{height: 40}}
                        onChangeItem={item => {
                            console.log(item.label, item.value)
                            this.setState({
                                year: item.value
                            })
                        }}     
                        style={styles.picker}           
                        disabled = { !this.state.editable }       
                    />
                    <DropDownPicker 
                        placeholder = "Division"
                        items={this.state.dataDiv}
                        defaultValue = { this.state.div }
                        defaultIndex={2}
                        containerStyle={{height: 40}}
                        onChangeItem={item => {
                            console.log(item.label, item.value)
                            this.setState({
                                div: item.value
                            })
                        }}  
                        style={styles.picker}              
                        disabled = { !this.state.editable }    
                    />
                </View>
            <TouchableOpacity 
                style={ styles.googleBtn }
                onPress={ async () => {
                    this.setState({ loading: true, isSigninInProgress: true })
                    try {
                        await GoogleSignin.hasPlayServices();
                        const info = await GoogleSignin.signIn();
                        const googleCredential = auth.GoogleAuthProvider.credential(info.idToken);
                        await auth().signInWithCredential(googleCredential).then(() => {
                            console.log('Sign in with google !')
                            console.log(auth().currentUser.uid)
                            console.log(this.state.prn)
                            console.log(this.state.year)
                            console.log(this.state.div)
                            console.log(this.state.class)
                            console.log(info.user.email)
                            console.log(info.user.name)

                            var myValue = {
                                prn: this.state.prn,
                                year: this.state.year, 
                                class: this.state.class,
                                div: this.state.div,
                                email: info.user.email,
                                user: 'Student'                            
                            }

                            database().ref('Users/Student/' + auth().currentUser.uid).set({
                                prn: this.state.prn,
                                year_div: this.state.year + '' + this.state.class + '' + this.state.div,
                                email: info.user.email,
                                user: 'Student'
                            })

                            this.storeData(myValue)

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
                  this.setState({ loading: true, isSigninInProgress: true })           
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
    }else{
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
    //   flex: 1,
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
        marginBottom:'20%',
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

